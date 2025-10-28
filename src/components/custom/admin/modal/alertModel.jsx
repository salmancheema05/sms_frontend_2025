import React from "react";
import ModalLayout from "./modalLayout";

const AlertModal = ({
  title,
  description,
  show = true,
  onConfirm = () => {},
  onCancel = () => {},
  setAlertModel,
  showOk,
  showConfirmButton = false,
}) => {
  if (!show) return null;

  return (
    <ModalLayout>
      <div className="bg-primary-color dark:bg-primary-bg w-85 h-55  rounded-xl border border-gray-600  md:w-200 md:h-auto">
        <div className="m-5">
          <p className="mb-5 text-xl font-semibold">{title}</p>
          <p>{description}</p>
        </div>
        <div className="flex w-full h-15 px-5 justify-end space-x-2">
          {showConfirmButton && (
            <>
              <button
                type="button"
                className="bg-red-600 w-20 h-10 rounded-2xl text-white"
                onClick={() => setAlertModel(false)}
              >
                No
              </button>
              <button
                className="bg-blue-950 w-20 h-10 rounded-2xl text-white"
                onClick={onConfirm}
              >
                Yes
              </button>
            </>
          )}
          {showOk && (
            <button
              className="bg-blue-950 w-20 h-10 rounded-2xl text-white"
              onClick={onCancel}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default AlertModal;
