import AlertModel from "@/components/custom/admin/modal/alertModel";

import Table from "@/components/custom/table/table";
import useCreateToken from "@/hooks/createNewToken";
import useDropdownToggle from "@/hooks/dropdown";
import {
  useAssignInsertapiMutation,
  useTeacherAssignToClassapiMutation,
} from "@/services/assign";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const AssignInformation = () => {
  const { token, refreshToken, school_id, user_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const [confirmButtonShow, setConfirmButtonShow] = useState(true);
  const [alertModelTitle, setALertModelTitle] = useState(
    "Are you absolutely sure?"
  );
  const [showOkButton, setShowOkButton] = useState(false);
  const { openDropdown } = useDropdownToggle();
  const [alertModel, setAlertModel] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const location = useLocation();
  const [assignData, setAssignData] = useState(null);
  const { teacherData } = location.state;
  const { level_name, subject_code_name, teacher_id, teacher_name } =
    teacherData;
  const [allFreeClassesAndSubject, setAllFreeClassesAndSubject] = useState([]);
  const [teacherAssignToClassapi] = useTeacherAssignToClassapiMutation();
  const { createNewToken } = useCreateToken();
  const [assignInsertapi] = useAssignInsertapiMutation();
  const fatchAllClassAndSubjectFee = async () => {
    try {
      if (token) {
        const obj = {
          token: token,
          school_id: school_id,
          subject_code_name: subject_code_name,
          level_name: level_name,
        };
        const res = await teacherAssignToClassapi(obj);
        if (res.data.error) {
          const newtoken = await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
        } else {
          setAllFreeClassesAndSubject(res.data.result);
        }
      }
    } catch (err) {
      console.error(err.error.data.message);
    }
  };
  const [columns, setColumns] = useState([
    {
      columnName: "school_class_name",
      columnNameforUser: "Class",
      status: "show",
    },
    {
      columnName: "subject_name",
      columnNameforUser: "Subject",
      status: "show",
    },
    {
      columnName: "level_name",
      columnNameforUser: "Class Level",
      status: "show",
    },
    {
      columnName: "subject_code_name",
      columnNameforUser: "Subject Code",
      status: "show",
    },
  ]);
  useEffect(() => {
    fatchAllClassAndSubjectFee();
  }, [token]);
  const assignClass = (data) => {
    const obj = {
      assignID: data.subject_assign_to_class_id,
      teacherId: teacher_id,
      class: data.school_class_name,
      subjectName: data.subject_name,
    };
    setAlertMessage(
      `You would like to assign Teacher ${teacher_name} to teach ${data.subject_name} for ${data.school_class_name}  `
    );
    openDropdown(null);
    setAlertModel(true);
    setAssignData(obj);
  };
  const asignTeacher = async () => {
    try {
      let obj = {
        token: token,
        school_id: school_id,
        teacher_id: teacher_id,
        user_id: user_id,
        class_subject_id: assignData.assignID,
      };
      const res = await assignInsertapi(obj);
      if (res.data.error) {
        const newtoken = await createNewToken({
          refreshToken: refreshToken,
          token: token,
        });
        obj.token = newtoken.data.message;
        const response = await assignInsertapi(obj).unwrap();
        setConfirmButtonShow(false);
        setShowOkButton(true);
        setALertModelTitle("successful Message");
        setAlertMessage(response.message);
      } else {
        setConfirmButtonShow(false);
        setShowOkButton(true);
        setALertModelTitle("successful Message");
        setAlertMessage(res.data.message);
      }
    } catch (error) {
      console.error(error.data.message);
    }
  };
  const onCancel = () => {
    const filteredData = allFreeClassesAndSubject.filter((item) => {
      return !(
        item.school_class_name.trim().toLowerCase() ===
          assignData.class.trim().toLowerCase() &&
        item.subject_name.trim().toLowerCase() ===
          assignData.subjectName.trim().toLowerCase()
      );
    });
    setAllFreeClassesAndSubject(filteredData);
    setConfirmButtonShow(true);
    setShowOkButton(false);
    setALertModelTitle("Are you absolutely sure?");
    setAlertModel(false);
  };
  const actions = [
    {
      label: "file",
      handler: assignClass,
    },
  ];
  return (
    <>
      <AlertModel
        setAlertModel={setAlertModel}
        title={alertModelTitle}
        show={alertModel}
        showConfirmButton={confirmButtonShow}
        showOk={showOkButton}
        onCancel={() => onCancel()}
        onConfirm={() => asignTeacher()}
        description={alertMessage}
      />
      <Table
        columns={columns}
        setColumns={setColumns}
        columntoggleButtonShow={false}
        data={allFreeClassesAndSubject}
        actions={actions}
      />
    </>
  );
};

export default AssignInformation;
