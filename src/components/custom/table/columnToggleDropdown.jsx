import React from "react";
import { useStateContext } from "@/context/stateProvider";
import useDropdownToggle from "@/hooks/dropdown";

const ColumnToggleDropdown = ({
  columns,
  setColumns,
  columntoggleButtonShow = false,
}) => {
  const { dropdownShow, setDropdownShow } = useStateContext();
  const { openDropdown } = useDropdownToggle();

  return (
    <div className="flex gap-4 mb-4 relative">
      <div>
        {columntoggleButtonShow === true ? (
          <button
            className="p-2 bg-chart-3  text-white rounded"
            onClick={() => openDropdown("column-toggle")}
          >
            Filter Columns
          </button>
        ) : null}

        {dropdownShow === "column-toggle" && (
          <div className="absolute mt-2 bg-white border shadow-lg rounded w-48 z-50">
            <ul className="divide-y">
              {columns.map((col, index) => (
                <li key={index} className="flex items-center px-4 py-2 gap-2">
                  <input
                    type="checkbox"
                    checked={col.status === "show"}
                    className="accent-chart-3"
                    onChange={() =>
                      setColumns((prev) =>
                        prev.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                status:
                                  item.status === "show" ? "hide" : "show",
                              }
                            : item
                        )
                      )
                    }
                  />
                  <span className="capitalize">{col.columnNameforUser}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnToggleDropdown;
