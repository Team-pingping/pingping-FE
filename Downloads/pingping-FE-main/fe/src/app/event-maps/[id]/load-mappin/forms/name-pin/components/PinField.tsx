"use client";

import React, { useRef, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface PinFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function PinField({ value, onChange }: PinFieldProps) {
  const pinRefs = useRef<HTMLInputElement[]>([]);
  const [inputKeys, setInputKeys] = useState<string[]>([]);

  // 초기화 시 고유한 key 생성
  useEffect(() => {
    setInputKeys((prevKeys) =>
      value.length === prevKeys.length ? prevKeys : value.map(() => nanoid())
    );
  }, [value]);

  useEffect(() => {
    const storedPin = localStorage.getItem("userPin");
    if (storedPin) {
      const pinArray = storedPin.split("") as string[];
      onChange(pinArray);
    }
  }, [onChange]);

  useEffect(() => {
    localStorage.setItem("userPin", value.join(""));
  }, [value]);

  const handlePINChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    if (/^\d?$/.test(inputValue)) {
      const newPin = [...value];
      newPin[index] = inputValue;
      onChange(newPin);

      if (inputValue && index < pinRefs.current.length - 1) {
        pinRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newPin = [...value];

      if (newPin[index]) {
        newPin[index] = "";
        onChange(newPin);
      } else if (index > 0) {
        pinRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    const newPin = pasteData
      .split("")
      .map((char) => (/^\d$/.test(char) ? char : ""));
    onChange(newPin);

    const lastIndex = newPin.findIndex((char) => char === "");
    pinRefs.current[lastIndex !== -1 ? lastIndex : newPin.length - 1]?.focus();
  };

  return (
    <div className="mb-[24px]">
      <label
        htmlFor="pin"
        className="block text-[#8E8E8E] font-medium mb-[8px]"
      >
        내 프로필 암호 <span className="text-red-500">*</span>
      </label>
      <div className="flex space-x-[16px]">
        {value.map((digit, index) => (
          <input
            key={inputKeys[index]} // 고유한 key 사용
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => {
              pinRefs.current[index] = el!;
            }}
            value={digit}
            onChange={(e) => handlePINChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-[70px] h-[56px] p-3 text-center rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#555555]"
          />
        ))}
      </div>
    </div>
  );
}
