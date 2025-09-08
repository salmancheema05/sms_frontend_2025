import React from "react";

const ContentWithTitle = ({ title, children }) => {
  return (
    <div className="border-1 border-gray-200 w-[100%] h-auto">
      <div className="bg-chart-3 text-white px-5 py-2 text-[20px] font-bold">
        {title}
      </div>
      <div className="p-5 bg-white">{children}</div>
    </div>
  );
};

export default ContentWithTitle;
