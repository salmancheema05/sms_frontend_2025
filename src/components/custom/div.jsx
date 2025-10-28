import React from "react";

const ContentWithTitle = ({ title, children }) => {
  return (
    <div>
      <div className="border-1 border-primary-border w-[100%] h-auto">
        <div className="bg-primary-color  text-primary-text p-5  font-bold">
          {title}
        </div>
        <div className="p-5 bg-card-body">{children}</div>
      </div>
    </div>
  );
};

export default ContentWithTitle;
