import Table from "@/components/custom/table/table";
import useCreateToken from "@/hooks/createNewToken";
import { useViewTeacherSubjectsAndClassesMutation } from "@/services/teacher";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewSubjectAndClasses = () => {
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const { createNewToken } = useCreateToken();
  const [columns, setColumns] = useState([
    {
      columnName: "teacher_id",
      columnNameforUser: "ID",
      status: "show",
    },
    {
      columnName: "teacher_name",
      columnNameforUser: "Name",
      status: "show",
    },
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
  ]);
  const [viewTeacherSubjectsAndClasses] =
    useViewTeacherSubjectsAndClassesMutation();
  const [teachers, setTeachers] = useState([]);
  const getteachersSubjectsAndClasses = async () => {
    try {
      if (token) {
        const res = await viewTeacherSubjectsAndClasses({
          school_id: school_id,
          token: token,
        });

        if (res.data.error) {
          const newToken = await createNewToken({
            refreshToken: refreshToken,
            token: token,
          });
          const result = await viewTeacherSubjectsAndClasses({
            school_id: school_id,
            token: newToken.data.message,
          });
          setTeachers(result.data.result);
        } else {
          setTeachers(res.data.result);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getteachersSubjectsAndClasses();
  }, []);
  const actions = [
    {
      label: "edit",
      //   handler: handleEdit,
    },
    {
      label: "delete",
      //   handler: handleDelete,
    },
    {
      label: "viewDetail",
      //   handler: handleView,
    },
  ];
  return (
    <Table
      columns={columns}
      setColumns={setColumns}
      columntoggleButtonShow={false}
      data={teachers}
      actions={actions}
    />
  );
};

export default ViewSubjectAndClasses;
