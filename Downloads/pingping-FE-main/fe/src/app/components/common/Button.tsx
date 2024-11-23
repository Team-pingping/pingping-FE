"use client";

import React from "react";
import { ButtonProps } from "@/types/types";

function Button({
  label,
  onClick,
  type = "start",
  className = "",
  disabled = false,
}: ButtonProps) {
  // 기본 버튼 스타일 설정
  const buttonStyle = disabled
    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
    : "bg-[#1D1D1D] text-white";

  return (
    <div className="w-full fixed bottom-[20px] left-0 right-0 flex justify-center">
      <button
        type={type === "submit" ? "submit" : "button"} // type 속성에 직접 문자열 전달
        onClick={onClick}
        className={`${buttonStyle} ${className} w-[328px] h-[60px] py-[17px] rounded-lg`}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
