import Table from "@/components/custom/table/table";
import useCreateToken from "@/hooks/createNewToken";
import { useViewAllTeacherapiMutation } from "@/services/teacher";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const ViewAllTeachers = () => {
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const navigate = useNavigate();
  const [viewAllTeacherapi] = useViewAllTeacherapiMutation();
  const { createNewToken } = useCreateToken();
  const [columns, setColumns] = useState([
    {
      columnName: "school_teacher_id",
      columnNameforUser: "ID",
      status: "show",
    },
    {
      columnName: "teacher_name",
      columnNameforUser: "Session",
      status: "show",
    },
    {
      columnName: "contact_number",
      columnNameforUser: "Contact Number",
      status: "show",
    },
    {
      columnName: "email",
      columnNameforUser: "Email",
      status: "show",
    },
  ]);
  const [allTeachers, setAllTeaches] = useState([]);
  const getAllTeachers = async () => {
    try {
      if (token) {
        const res = await viewAllTeacherapi({
          token: token,
          school_id: school_id,
        });
        if (res.data.error) {
          await createNewToken({
            refreshToken: refreshToken,
          });
        } else {
          setAllTeaches(res.data.result);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllTeachers();
  }, [token]);
  const handleView = (data) => {
    navigate(`/detail/${data.school_teacher_id}`);
  };
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
      handler: handleView,
    },
  ];
  return (
    <Table
      columns={columns}
      setColumns={setColumns}
      columntoggleButtonShow={true}
      data={allTeachers}
      actions={actions}
    />
  );
};

export default ViewAllTeachers;
