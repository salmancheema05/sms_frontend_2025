import React, { useState } from "react";
import Logo from "@/assets/logo.jpg";
import Table from "@/components/custom/table/table";
const AllStudents = () => {
  const [columns, setColumns] = useState([
    { columnName: "id", status: "show" },
    { columnName: "image", status: "show" },
    { columnName: "name", status: "show" },
    { columnName: "class", status: "show" },
    { columnName: "city", status: "show" },
  ]);
  const [students] = useState([
    { id: 1, image: Logo, name: "John Doe", class: "10A", city: "Faisalabad" },
    {
      id: 2,
      image: Logo,
      name: "Jane Smith",
      class: "11B",
      city: "Faisalabad",
    },
    {
      id: 3,
      image: Logo,
      name: "Bob Johnson",
      class: "9C",
      city: "Faisalabad",
    },
  ]);
  const handleEdit = (student) => {
    alert(`Editing: ${student.name}`);
    // You could open a modal or navigate to an edit screen here
  };
  const handleDelete = (student) => {
    alert(`delete: ${student.name}`);
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
  ];

  return (
    <div className="w-full p-4 bg-gray-50 min-h-screen">
      <Table
        columns={columns}
        setColumns={setColumns}
        columntoggleButtonShow={true}
        data={students}
        actions={actions}
      />
    </div>
  );
};

export default AllStudents;
