import React from "react";

const buttonStyles = {
  default: "w-full bg-blue-950 text-white py-2 font-medium rounded-2xl",
  danger: "w-full bg-red-600 text-white py-2 font-medium rounded-2xl",
  outline:
    "w-full border border-blue-950 text-blue-950 py-2 font-medium rounded-2xl",
};

const DefaultButton = ({
  label = "Button",
  type = "button",
  variant = "default",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles[variant] || buttonStyles.default}
    >
      {label}
    </button>
  );
};

export default DefaultButton;
