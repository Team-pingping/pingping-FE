"use client";

import React, { useState } from "react";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "start" | "next" | "submit" | "default";
  className?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  isFormComplete?: boolean;
}

function Button({
  label,
  onClick,
  type = "default",
  className = "",
  disabled = false,
  isSubmitting = false,
  isFormComplete = true,
}: ButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setIsClicked(true);
    onClick();
  };

  const getButtonStyle = () => {
    if (isSubmitting) {
      return "bg-[#000000] text-white cursor-not-allowed";
    }

    if (!isFormComplete) {
      return "bg-[#E4E4E4] cursor-not-allowed text-[#8E8E8E]";
    }

    if (isClicked && type !== "start") {
      return "bg-[#000000] text-white";
    }

    if (isActive) {
      switch (type) {
        case "start":
          return "bg-[#A6251B] text-white";
        case "next":
        case "submit":
        case "default":
        default:
          return "bg-[#1D1D1D] text-white";
      }
    }

    switch (type) {
      case "start":
        return "bg-[#F73A2C] text-white";
      case "next":
      case "submit":
      case "default":
      default:
        return "bg-[#1D1D1D] text-white";
    }
  };

  return (
    <div className="w-full fixed bottom-[20px] left-0 right-0 flex justify-center">
      <button
        type={type === "submit" ? "submit" : "button"}
        onClick={handleClick}
        className={`${getButtonStyle()} ${className} w-[328px] h-[60px] py-[17px] rounded-lg justify-center items-center inline-flex`}
        disabled={disabled || isSubmitting}
      >
        <div className="text-center text-lg font-medium font-['Pretendard'] leading-relaxed">
          {label}
        </div>
      </button>
    </div>
  );
}

export default Button;
