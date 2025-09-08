import React, { useState } from "react";
import FiltersRow from "@/components/custom/table/filtersRow";
import Row from "@/components/custom/table/row";
import { useStateContext } from "@/context/stateProvider";
import useDropdownToggle from "@/hooks/dropdown";
import ColumnToggleDropdown from "@/components/custom/table/columnToggleDropdown";

const Table = ({
  columns,
  setColumns,
  data,
  actions,
  columntoggleButtonShow,
}) => {
  const { dropdownShow } = useStateContext();
  const { openDropdown } = useDropdownToggle();
  const [filters, setFilters] = useState(() => {
    return columns.reduce((acc, col) => {
      if (col.columnName !== "image") {
        acc[col.columnName] = "";
      }
      return acc;
    }, {});
  });
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const filteredStudents = data.filter((student) => {
    for (const key in filters) {
      const value = filters[key].toLowerCase();
      const studentValue = String(student[key] || "").toLowerCase();

      if (!studentValue.includes(value)) {
        return false;
      }
    }
    return true;
  });
  return (
    <>
      <ColumnToggleDropdown
        columns={columns}
        setColumns={setColumns}
        columntoggleButtonShow={columntoggleButtonShow}
      />
      <div className="w-full rounded-xl border border-gray-200 shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-chart-3 text-white">
              {columns
                .filter((col) => col.status === "show")
                .map((col, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left font-semibold capitalize"
                  >
                    {col.columnNameforUser}
                  </th>
                ))}
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
            <FiltersRow
              columns={columns}
              handleFilterChange={handleFilterChange}
            />
          </thead>
          <tbody>
            {filteredStudents.map((item, index) => (
              <Row
                key={index}
                rowIndex={index + 1}
                data={item}
                columns={columns}
                dropdownShow={dropdownShow}
                openDropdown={openDropdown}
                actions={actions}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
