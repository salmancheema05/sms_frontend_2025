const ModalLayout = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
      {children}
    </div>
  );
};
export default ModalLayout;
