import React from "react";

const buttonStyles = {
  default: "w-full bg-blue-950 text-white py-2 font-medium rounded-2xl",
  danger: "w-full bg-red-600 text-white py-2 font-medium rounded-2xl",
  outline:
    "w-full border border-blue-950 text-blue-950 py-2 font-medium rounded-2xl",
  disabledDefault: "opacity-50 cursor-not-allowed", // styles to add when disabled on default
};

const DefaultButton = ({
  label = "Button",
  type = "button",
  variant = "default",
  onClick,
  disabledData = false,
}) => {
  // If disabled and variant is default, combine default + disabled styles
  const baseClass = buttonStyles[variant] || buttonStyles.default;
  const disabledClass =
    disabledData && variant === "default" ? buttonStyles.disabledDefault : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${disabledClass}`}
      disabled={disabledData}
    >
      {label}
    </button>
  );
};

export default DefaultButton;
