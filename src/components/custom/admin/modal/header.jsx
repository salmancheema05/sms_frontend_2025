import React from "react";

const Header = ({ title, close }) => {
  return (
    <div className="h-15 mt-0 w-full border-b rounded-tr-lg rounded-tl-lg border-gray-500 bg-chart-3 text-white">
      <div className="flex items-center py-5 px-5">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="ml-auto text-xl cursor-pointer" onClick={close}>
          X
        </div>
        {/* Corrected typo and added context */}
      </div>
    </div>
  );
};

export default Header;
