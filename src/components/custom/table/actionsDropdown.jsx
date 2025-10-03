import React from "react";
import { Pencil, Trash, Eye, FileCog } from "lucide-react";

const ActionsDropdown = ({ actions }) => {
  return (
    <div className="flex absolute top-12 transform -translate-x-1/2 w-40 dark:bg-[#111826] border border-gray-600 shadow-lg rounded-md z-50">
      <ul className="w-full">
        {actions.map((item, index) =>
          item.label === "edit" ? (
            <li
              key={index}
              onClick={item.handler}
              className="w-full border-b-1 flex flex-col items-center border-gray-300 py-4  dark:hover:bg-accent  cursor-pointer gap-2"
            >
              <Pencil size={16} />
            </li>
          ) : item.label === "delete" ? (
            <li
              key={index}
              onClick={item.handler}
              className="w-full border-b-1 flex flex-col items-center border-gray-300 py-4  dark:hover:bg-accent  cursor-pointer gap-2"
            >
              <Trash size={16} />
            </li>
          ) : item.label === "viewDetail" ? (
            <li
              key={index}
              onClick={item.handler}
              className="w-full flex flex-col items-center  py-4 dark:hover:bg-accent cursor-pointer gap-2"
            >
              <Eye size={16} />
            </li>
          ) : item.label === "file" ? (
            <li
              key={index}
              onClick={item.handler}
              className="w-full flex flex-col items-center  py-4 dark:hover:bg-accent cursor-pointer gap-2"
            >
              <FileCog size={16} />
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ActionsDropdown;
