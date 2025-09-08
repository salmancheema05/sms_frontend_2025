import { GripHorizontal } from "lucide-react";
import ActionsDropdown from "@/components/custom/table/actionsDropdown";
const Row = ({
  data,
  columns,
  dropdownShow,
  openDropdown,
  actions,
  rowIndex,
}) => {
  return (
    <tr className="border-t hover:bg-sidebar-accent transition duration-150">
      {columns.map((col, index) => {
        if (col.status !== "show") return null;

        return (
          <td key={index} className="px-6 py-4">
            {data[col.columnName]}
          </td>
        );
      })}

      <td className="px-6 py-4 text-center relative">
        <div className="flex justify-center">
          <GripHorizontal
            className="cursor-pointer text-gray-500 hover:text-blue-600"
            onClick={() => openDropdown(rowIndex)}
          />
        </div>
        {rowIndex === dropdownShow && (
          <ActionsDropdown
            actions={actions.map((action) => ({
              ...action,
              handler: () => action.handler(data),
            }))}
          />
        )}
      </td>
    </tr>
  );
};
export default Row;
