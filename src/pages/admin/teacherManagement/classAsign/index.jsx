import Table from "@/components/custom/table/table";
import useCreateToken from "@/hooks/createNewToken";
import { useTeacherINSchooAndFreeapiMutation } from "@/services/teacher";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ClassAsign = () => {
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const navigate = useNavigate();
  const [teacherINSchooAndFreeapi] = useTeacherINSchooAndFreeapiMutation();
  const { createNewToken } = useCreateToken();
  const [teachers, setTeachers] = useState([]);
  const [columns, setColumns] = useState([
    {
      columnName: "school_teacher_id",
      columnNameforUser: "Teacher ID",
      status: "show",
    },
    {
      columnName: "teacher_name",
      columnNameforUser: "Teacher Name",
      status: "show",
    },
    {
      columnName: "contact_number",
      columnNameforUser: "Contact Number",
      status: "show",
    },
    {
      columnName: "at_school",
      columnNameforUser: "Teacher At School",
      status: "show",
    },
    {
      columnName: "has_class_now",
      columnNameforUser: "Has Class Now",
      status: "show",
    },
  ]);
  const getAllTeacherAtSchoolAndFree = async () => {
    try {
      if (token) {
        const res = await teacherINSchooAndFreeapi({
          school_id: school_id,
          token: token,
        });
        if (res.data.error) {
          await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
        } else {
          setTeachers(res.data.result);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllTeacherAtSchoolAndFree();
  }, [token]);
  const assignClass = (data) => {
    navigate(`/assign-information`, {
      state: { teacherData: data },
    });
  };
  const actions = [
    {
      label: "file",
      handler: assignClass,
    },
  ];
  return (
    <Table
      columns={columns}
      setColumns={setColumns}
      columntoggleButtonShow={true}
      data={teachers}
      actions={actions}
    />
  );
};

export default ClassAsign;
