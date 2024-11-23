"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { EventNameInputProps } from "@/app/eventcreate-page/types/types";
import classNames from "classnames";

function EventNameInput({
  className,
  selectedLocation,
  onChange,
  value,
}: EventNameInputProps) {
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태 추가
  const showWarning = hasUserEdited && value.trim().length < 1;

  useEffect(() => {
    if (!hasUserEdited) {
      const newEventName = selectedLocation ? `${selectedLocation} 모임` : "";
      onChange(newEventName);
    }
  }, [selectedLocation, onChange, hasUserEdited]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasUserEdited(true);
      setIsTyping(true); // 타이핑 상태 활성화
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    setIsTyping(false); // 타이핑 상태 비활성화
  }, []);

  const handleClear = useCallback(() => {
    setHasUserEdited(true);
    onChange("");
  }, [onChange]);

  return (
    <div className={`relative flex flex-col mt-4 ${className}`}>
      <label className="text-[#2c2c2c] text-[22px] font-semibold font-['Pretendard'] leading-[30px] mb-2">
        우리 모핑 이름은?
      </label>

      <div
        className={classNames(
          "relative w-[328px] h-14 p-4 bg-[#f7f7f7] rounded-lg flex justify-between items-center border-2",
          {
            "border-danger-base": showWarning, // 경고 상태
            "border-[#555555]": isTyping, // 타이핑 중
            "border-transparent": !isTyping && !showWarning, // 기본 상태
          }
        )}
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur} // 포커스 해제 시 상태 변경
          onFocus={() => setIsTyping(true)} // 포커스 시 타이핑 활성화
          placeholder="모임"
          className={classNames(
            "bg-transparent text-base font-medium font-['Pretendard'] leading-normal outline-none flex-grow",
            {
              "text-[#2c2c2c]": isTyping || value.trim().length > 0, // 타이핑 중 또는 텍스트 입력 완료
              "text-[#8e8e8e]": !isTyping && value.trim().length === 0, // 기본 텍스트 색상
            }
          )}
          aria-label="이벤트 이름 입력"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="w-5 h-5 cursor-pointer"
            aria-label="이름 삭제"
          >
            <Image
              src="/svg/delete.svg"
              alt="삭제 아이콘"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default EventNameInput;
