"use client";

import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

interface LinkFieldProps {
  label: string;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  showTooltip?: boolean;
  onInfoClick?: () => void;
}

interface InputField {
  id: string;
  text: string;
  error: string;
  isValid: boolean;
  isTyping: boolean;
  canEdit: boolean;
}

export default function LinkField({
  label,
  placeholder,
  value,
  onChange,
}: LinkFieldProps) {
  const [inputFields, setInputFields] = useState<InputField[]>(
    value.length > 0
      ? value.map((val) => ({
          id: nanoid(),
          text: val,
          error: "",
          isValid: true,
          isTyping: false,
          canEdit: true,
        }))
      : [
          {
            id: nanoid(),
            text: "",
            error: "",
            isValid: false,
            isTyping: false,
            canEdit: true,
          },
        ]
  );

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const validLinks = inputFields
      .filter((field) => field.isValid)
      .map((field) => field.text);
    onChange(validLinks);
  }, [inputFields, onChange]);

  const validateLink = async (fieldId: string, url: string, type: string) => {
    const endpoint =
      type === "북마크 공유 링크" ? "/pings/bookmark" : "/pings/store";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );

      if (response.ok) {
        setInputFields((prevFields) =>
          prevFields.map((fieldItem) =>
            fieldItem.id === fieldId
              ? { ...fieldItem, error: "", isValid: true }
              : fieldItem
          )
        );
      } else {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse?.message || "링크가 유효하지 않아요.";
        setInputFields((prevFields) =>
          prevFields.map((fieldItem) =>
            fieldItem.id === fieldId
              ? { ...fieldItem, error: errorMessage, isValid: false }
              : fieldItem
          )
        );
      }
    } catch {
      setInputFields((prevFields) =>
        prevFields.map((fieldItem) =>
          fieldItem.id === fieldId
            ? {
                ...fieldItem,
                error: "URL 검증에 실패했습니다.",
                isValid: false,
              }
            : fieldItem
        )
      );
    }
  };

  const handlePasteFromClipboard = async (fieldId: string) => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText.trim()) {
        setInputFields((prevFields) =>
          prevFields.map((fieldItem) =>
            fieldItem.id === fieldId
              ? { ...fieldItem, text: clipboardText, isValid: false }
              : fieldItem
          )
        );

        validateLink(fieldId, clipboardText, label);
      }
    } catch (error) {
      console.error("클립보드에서 텍스트를 읽는 데 실패했습니다:", error);
    }
  };

  const handleInputChange = (fieldId: string, inputValue: string) => {
    setInputFields((prevFields) =>
      prevFields.map((fieldItem) =>
        fieldItem.id === fieldId
          ? { ...fieldItem, text: inputValue, isValid: false, isTyping: true }
          : fieldItem
      )
    );

    validateLink(fieldId, inputValue, label);
  };

  const handleFocus = (fieldId: string) => {
    setInputFields((prevFields) =>
      prevFields.map((fieldItem) =>
        fieldItem.id === fieldId ? { ...fieldItem, isTyping: true } : fieldItem
      )
    );

    handlePasteFromClipboard(fieldId);
  };

  const handleBlur = (fieldId: string) => {
    setInputFields((prevFields) =>
      prevFields.map((fieldItem) =>
        fieldItem.id === fieldId ? { ...fieldItem, isTyping: false } : fieldItem
      )
    );
  };

  const addInputField = () => {
    setInputFields((prevFields) => [
      ...prevFields,
      {
        id: nanoid(),
        text: "",
        error: "",
        isValid: false,
        isTyping: false,
        canEdit: true,
      },
    ]);
  };

  const clearInput = (fieldId: string) => {
    setInputFields((prevFields) =>
      prevFields.map((fieldItem) =>
        fieldItem.id === fieldId
          ? { ...fieldItem, text: "", error: "", isValid: false }
          : fieldItem
      )
    );
  };

  const navigateToTooltipPage = () => {
    if (id) {
      router.push(`/event-maps/${id}/load-mappin/forms/tooltip`);
    }
  };

  const handleNaverMove = () => {
    window.location.href = "https://m.map.naver.com/";
  };

  const getClassNames = (item: InputField): string => {
    if (item.error && !item.isTyping)
      return "border-2 border-[#f73a2c] bg-[#F8F8F8]";
    if (item.isValid) return "bg-[#EBF4FD] text-[#3a91ea]";
    if (item.isTyping) return "border-2 border-[#555555] bg-[#F8F8F8]";
    return "bg-[#F8F8F8]";
  };

  return (
    <div className="mb-[48px] relative">
      <label className="text-[#2c2c2c] font-300 text-lg mb-[8px] flex items-center">
        {label}
        {label === "북마크 공유 링크" && (
          <div
            className="relative group"
            onClick={(e) => {
              e.stopPropagation();
              navigateToTooltipPage();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigateToTooltipPage()}
          >
            <Image
              src="/svg/information.svg"
              alt="information"
              width={18}
              height={18}
              className="p-[3px] w-[24px] h-[24px] ml-[6px] cursor-pointer"
            />
          </div>
        )}
        <span
          className="mr-0 ml-auto text-[#8e8e8e] text-sm font-medium font-['Pretendard'] leading-tight cursor-pointer"
          onClick={handleNaverMove}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNaverMove()}
        >
          네이버지도 열기
        </span>
        <Image
          src="/svg/rightArrow.svg"
          alt="rightArrow"
          width={12}
          height={24}
        />
      </label>
      <div className="flex flex-col items-center border-[#F0F0F0] border p-[16px] rounded-xl w-[328px]">
        {inputFields.map((item, index) => (
          <div
            key={item.id}
            className={`relative w-full ${index === inputFields.length - 1 ? "" : "mb-[16px]"}`}
          >
            <div
              className={`w-[296px] h-[52px] px-4 py-3.5 pr-[40px] rounded-md inline-flex relative ${getClassNames(
                item
              )}`}
              style={{
                boxSizing: "border-box",
              }}
            >
              <input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                value={item.text}
                onFocus={() => handleFocus(item.id)}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                onBlur={() => handleBlur(item.id)}
                placeholder={placeholder}
                className={`flex-1 bg-transparent outline-none placeholder:text-[#8e8e8e] text-sm font-medium font-['Pretendard'] ${
                  item.isValid ? "text-[#3A91EA]" : ""
                }`}
              />
              {item.text && (
                <button
                  type="button"
                  onClick={() => clearInput(item.id)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-[3px]"
                >
                  <Image
                    src={
                      item.isValid ? "/svg/bluecheck.svg" : "/svg/delete.svg"
                    }
                    alt={item.isValid ? "check" : "delete"}
                    width={16}
                    height={16}
                  />
                </button>
              )}
            </div>
            {!item.isTyping && item.error && (
              <div className="text-sm font-medium font-['Pretendard'] text-[#f73a2c] mt-[4px]">
                {item.error}
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addInputField}
          className="mx-auto mt-[16px]"
        >
          <Image src="/svg/linkAdd.svg" alt="linkAdd" width={28} height={28} />
        </button>
      </div>
    </div>
  );
}
