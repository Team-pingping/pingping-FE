"use client";

import React from "react";
import Image from "next/image";

interface CheckBoxProps {
  isChecked: boolean;
  onChange: () => void;
}

function CheckBox({ isChecked, onChange }: CheckBoxProps) {
  return (
    <button
      type="button"
      className={`w-6 h-6 relative rounded-md border ${
        isChecked ? "border-[#B8B8B8]" : "border-[#e4e4e4]"
      } flex items-center justify-center`}
      onClick={onChange}
      role="checkbox" // 명시적으로 checkbox 역할 부여
      aria-checked={isChecked} // aria-checked 속성 유지
      aria-label="체크박스"
    >
      {isChecked && (
        <Image src="/svg/graycheck.svg" alt="체크" width={16} height={16} />
      )}
    </button>
  );
}

export default CheckBox;
