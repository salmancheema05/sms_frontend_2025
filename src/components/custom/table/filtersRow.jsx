import React from "react";

const FiltersRow = ({ columns, handleFilterChange }) => {
  return (
    <tr className="bg-secondary-color">
      {columns.map((col, index) =>
        col.status === "show" ? (
          col.columnName === "image" ? (
            <td key={index}></td>
          ) : (
            <td key={index} className="px-6 py-2">
              <input
                type="text"
                placeholder={`Search ${col.columnName}`}
                onChange={(e) =>
                  handleFilterChange(col.columnName, e.target.value)
                }
                className="w-full px-3 py-1 placeholder-input-label-color border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </td>
          )
        ) : null
      )}
      <td></td>
    </tr>
  );
};

export default FiltersRow;
