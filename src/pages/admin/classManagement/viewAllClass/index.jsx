import ViewClassDetailModal from "@/components/custom/admin/defaultModel";
import Table from "@/components/custom/table/table";
import useDropdownToggle from "@/hooks/dropdown";
import { useFetchAllInstituteClassapiMutation } from "@/services/createclassapi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewAllClasss = () => {
  const { token, refreshToken, school_id } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const { openDropdown } = useDropdownToggle();
  const [fetchAllInstituteClassapi] = useFetchAllInstituteClassapiMutation();
  const [columns, setColumns] = useState([
    {
      columnName: "school_class_name",
      columnNameforUser: "class",
      status: "show",
    },
    {
      columnName: "session_name",
      columnNameforUser: "Session",
      status: "show",
    },
    { columnName: "group_name", columnNameforUser: "group", status: "show" },
    {
      columnName: "creator_role",
      columnNameforUser: "creator Name",
      status: "show",
    },
  ]);
  const [classes, setClasses] = useState([]);
  const [classData, setClassData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const getAllClasses = async () => {
    try {
      if (token) {
        const res = await fetchAllInstituteClassapi({
          token: token,
          school_id: school_id,
        });
        if (res.data.error) {
          await createNewToken({
            refreshToken: refreshToken,
          });
        } else {
          setClasses(res.data.result);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllClasses();
  }, [token]);
  const handleEdit = (student) => {
    alert(`Editing: ${student.name}`);
    // You could open a modal or navigate to an edit screen here
  };
  const handleDelete = (student) => {
    alert(`delete: ${student.name}`);
  };
  const handleView = (classData) => {
    const classId = classData.institute_class_id;
    const result = classes.find((item) => item.institute_class_id === classId);
    openDropdown(null);
    setClassData(result);
    setModalOpen(true);
  };

  const actions = [
    {
      label: "edit",
      handler: handleEdit,
    },
    {
      label: "delete",
      handler: handleDelete,
    },
    {
      label: "viewDetail",
      handler: handleView,
    },
  ];

  return (
    <>
      <ViewClassDetailModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={classData}
      />

      <Table
        columns={columns}
        setColumns={setColumns}
        columntoggleButtonShow={true}
        data={classes}
        actions={actions}
      />
    </>
  );
};

export default ViewAllClasss;
