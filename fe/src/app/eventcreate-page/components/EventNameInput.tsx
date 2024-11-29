"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import classNames from "classnames";
import {
  cleanString,
  isValidLength,
  generateDefaultEventName,
} from "../utils/formHelpers";

interface EventNameInputProps {
  className?: string;
  selectedLocation?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function EventNameInput({
  className,
  selectedLocation,
  onChange,
  value,
}: EventNameInputProps) {
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!hasUserEdited && !value) {
      const newEventName: string = generateDefaultEventName(selectedLocation);
      if (newEventName) {
        onChange(newEventName);
      }
    }
  }, [selectedLocation, onChange, hasUserEdited, value]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasUserEdited(true);
      setIsTyping(true);
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    setIsTyping(false);
  }, []);

  const handleClear = useCallback(() => {
    setHasUserEdited(true);
    onChange("");
  }, [onChange]);

  const showWarning = hasUserEdited && !isValidLength(cleanString(value), 1);

  return (
    <div className={`relative flex flex-col mt-4 ${className}`}>
      <label className="text-[#2c2c2c] text-[22px] font-semibold font-['Pretendard'] leading-[30px] mb-2">
        우리 모핑 이름은?
      </label>

      <div
        className={classNames(
          "relative w-[328px] h-14 p-4 bg-[#f7f7f7] rounded-lg flex justify-between items-center border-2",
          {
            "border-[#f73a2c]": showWarning,
            "border-[#555555]": isTyping,
            "border-transparent": !isTyping && !showWarning,
          }
        )}
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={() => setIsTyping(true)}
          placeholder="모임"
          className={classNames(
            "bg-transparent text-base font-medium font-['Pretendard'] leading-normal outline-none flex-grow",
            {
              "text-[#2c2c2c]": isTyping || cleanString(value).length > 0,
              "text-[#8e8e8e]": !isTyping && cleanString(value).length === 0,
            }
          )}
          aria-label="이벤트 이름 입력"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="relative flex justify-center items-center"
            style={{
              width: "18px",
              height: "18px",
              minWidth: "18px",
              minHeight: "18px",
            }}
            aria-label="이름 삭제"
          >
            <Image
              src="/svg/delete.svg"
              alt="삭제 아이콘"
              width={18}
              height={18}
              className="object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
}
