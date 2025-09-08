import React from "react";
import { Pencil, Trash, Eye } from "lucide-react";

const ActionsDropdown = ({ actions }) => {
  return (
    <div className="flex absolute top-12 transform -translate-x-1/2 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-50">
      <ul className="w-full">
        {actions.map((item, index) =>
          item.label === "edit" ? (
            <li
              key={index}
              onClick={item.handler}
              className="border-b-2 flex flex-col items-center border-gray-300 my-2 py-2 hover:bg-blue-100 cursor-pointer gap-2"
            >
              <Pencil size={16} />
            </li>
          ) : item.label === "delete" ? (
            <li
              key={index}
              onClick={item.handler}
              className="border-b-2 flex flex-col items-center border-gray-300 my-2 py-2 hover:bg-blue-100 cursor-pointer   gap-2"
            >
              <Trash size={16} />
            </li>
          ) : item.label === "viewDetail" ? (
            <li
              key={index}
              onClick={item.handler}
              className="border-b-2 flex flex-col items-center border-gray-300 my-2 py-2 hover:bg-blue-100 cursor-pointer   gap-2"
            >
              <Eye size={16} />
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ActionsDropdown;
