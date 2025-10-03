import DefaultButton from "@/components/custom/button";
import OfficeWork from "./components/officeWork";
import TeacherInformation from "./components/teacherInformation";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeacherapiMutation } from "@/services/teacher";
import useCreateToken from "@/hooks/createNewToken";
import { useFetchAllSubjectCodeapiMutation } from "@/services/subject";
const schema = yup.object().shape({
  teacher_salary: yup
    .number()
    .transform((originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .typeError("Salary must be a number")
    .required("Salary is required"),
  subject_code_id: yup.string().required("Select Subject Code is required"),
  job_type: yup
    .string()
    .required("Job Type is required")
    .oneOf(
      ["part time", "full time", "contract"],
      "Job Type must be one of: part time, full time, contract"
    ),
  joining_date: yup.string().required("Joining Date is required"),
  teacher_name: yup.string().required("Teacher Name is required"),
  spouse: yup.string().required("Father / Husband Name is required"),
  marital_status: yup.string().required("Marital Status is required"),
  nic_number: yup.number().required("NIC Number is required"),
  contact_number: yup.number().required("Contact Number is required"),
  choose_gender: yup.string().required("Choose Gender is required"),
  level: yup.string().required("Choose Level is required"),
  choose_blood_group: yup.string().required("Choose Blood Group is required"),
  current_adress: yup.string().required("Current Address is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .nullable() // Explicitly allows null/empty values
    .notRequired(),
  qualification: yup.array().of(
    yup.object().shape({
      university: yup.string().required("university name is required"),
      degree: yup.string().required("Degree is required"),
    })
  ),
});
const AddNewTeacher = () => {
  const { token, refreshToken, school_id, user_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const { createNewToken } = useCreateToken();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      teacher_salary: "",
      job_type: "",
      email: "",
    },
  });
  const [fetchAllSubjectCodeapi] = useFetchAllSubjectCodeapiMutation();
  const [subjectCode, setSubjectCode] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [preview, setPreview] = useState(null);
  const [addTeacherapi] = useAddTeacherapiMutation();
  const fetchAllSubjectsCode = async () => {
    try {
      if (token) {
        const res = await fetchAllSubjectCodeapi({
          school_id: school_id,
          token: token,
        });
        if (res.data.error) {
          await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
        } else {
          setSubjectCode(res.data.result);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmit = async (data) => {
    try {
      const qualificationJson = JSON.stringify(data.qualification);
      const checkEmail = emailIsExistORNot(data.email);
      const formData = new FormData();
      formData.append("school_id", school_id);
      formData.append("creator_id", user_id);
      formData.append("marital_status", data.marital_status);
      formData.append("choose_blood_group", data.choose_blood_group);
      formData.append("choose_gender", data.choose_gender);
      formData.append("teacher_name", data.teacher_name);
      formData.append("spouse", data.spouse);
      formData.append("nic_number", data.nic_number);
      formData.append("contact_number", data.contact_number);
      formData.append("email", checkEmail);
      formData.append("joining_date", data.joining_date);
      formData.append("teacher_salary", data.teacher_salary);
      formData.append("current_adress", data.current_adress);
      formData.append("job_type", data.job_type);
      formData.append("qualification", qualificationJson);
      formData.append("subject_code_id", data.subject_code_id);
      formData.append("level", data.level);
      if (data.file) {
        formData.append("image", data.file);
      }
      const result = await addTeacherapi({ token: token, formdata: formData });
      if (result.data.error) {
        const res = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        const result = await addTeacherapi({
          token: res.data.message,
          formdata: formData,
        });
        alert(result.data.message);
        reset({
          teacher_salary: "",
          job_type: "",
          joining_date: "",
          teacher_name: "",
          spouse: "",
          marital_status: "",
          nic_number: "",
          contact_number: "",
          choose_gender: "",
          choose_blood_group: "",
          current_adress: "",
          email: "",
          qualification: [], // array → reset to empty
          level: "",
          subject_code_id: "",
        });
        setFileName(null);
        setPreview(null);
      } else {
        console.log("add detail");
        reset({
          teacher_salary: "",
          job_type: "",
          joining_date: "",
          teacher_name: "",
          spouse: "",
          marital_status: "",
          nic_number: "",
          contact_number: "",
          choose_gender: "",
          choose_blood_group: "",
          current_adress: "",
          email: "",
          qualification: [], // array → reset to empty
        });
        setFileName(null);
        setPreview(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const emailIsExistORNot = (email) => {
    if (email === "") {
      return (email = "no email");
    }
    return email;
  };
  useEffect(() => {
    fetchAllSubjectsCode();
  }, [token]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OfficeWork
        Controller={Controller}
        control={control}
        errors={errors}
        subjectCode={subjectCode}
      />
      <TeacherInformation
        Controller={Controller}
        control={control}
        setFileName={setFileName}
        fileName={fileName}
        preview={preview}
        setPreview={setPreview}
        errors={errors}
      />
    </form>
  );
};

export default AddNewTeacher;
