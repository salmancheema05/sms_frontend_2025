import Header from "./modal/header";
import ModalLayout from "./modal/modalLayout"; // Ensure consistent naming (ModalLayout)

const ViewClassDetailModal = ({
  modalOpen = false,
  setModalOpen,
  modalTitle,
  data,
}) => {
  return modalOpen ? (
    <ModalLayout>
      <div className="bg-white w-[60%] h-[30rem] rounded-lg shadow-lg">
        <Header
          title={data.school_class_name}
          close={() => setModalOpen(false)}
        />
        <div className="p-5 overflow-y-auto h-[calc(100%-4rem)]">
          <div>
            <ul>
              <div className="flex border-b border-b-gray-500 pb-2 mb-5">
                <li className="text-md font-bold">Session</li>
                <li className="ml-[12%] text-md">{data.session_name}</li>
              </div>
              <div className="flex border-b border-b-gray-500 pb-2 mb-5">
                <li className="text-md font-bold">Group</li>
                <li className="ml-[13%] text-md">{data.group_name}</li>
              </div>
              <div className="flex border-b border-b-gray-500 pb-2 mb-5">
                <li className="text-md font-bold">Creator Role</li>
                <li className="ml-[7%] text-md">{data.creator_role}</li>
              </div>
            </ul>
          </div>
          <fieldset className="border-1 border-gray-400">
            <legend className="px-2 text-sm font-semibold text-gray-600">
              Subject
            </legend>
            <div className="m-3">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      SR.No
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Subject Name
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Subject writer/board
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Edit
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.subjects.map((item, index) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <td className="py-2 px-4 border-t border-gray-200">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200">
                        {item.board_or_writer_name}
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200">
                        Edit
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200">
                        Delete
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>
        </div>
      </div>
    </ModalLayout>
  ) : null;
};

export default ViewClassDetailModal;
