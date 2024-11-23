"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image"; // Import 순서 수정
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useUserDataStore } from "../stores/useUserDataStore";

interface PasswordInputProps {
  iconUrl: string | null; // iconUrl prop 타입 정의
}

export default function PasswordInput({ iconUrl }: PasswordInputProps) {
  const [password, setPassword] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { id, nonMemberId } = useParams();
  const setUserData = useUserDataStore((state) => state.setUserData);

  const submitPassword = useCallback(async () => {
    const fullPassword = password.join("");

    if (fullPassword.length !== 4) {
      setHasError(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/login`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ nonMemberId, password: fullPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserData({
          nonMemberId: data.nonMemberId,
          name: data.name,
          bookmarkUrls: data.bookmarkUrls || [],
          storeUrls: data.storeUrls || [],
        });
        localStorage.setItem("userData", JSON.stringify(data));
        router.push(`/event-maps/${id}/${nonMemberId}/load-mappin-edit`);
      } else {
        setHasError(true);
        setPassword(["", "", "", ""]);
        setCurrentIndex(0);
      }
    } catch {
      // 서버 오류 처리 시 console.error 대신 메시지 로깅 또는 적절한 에러 핸들링 수행
      setHasError(true);
    }
  }, [id, nonMemberId, password, router, setUserData]);

  useEffect(() => {
    if (password.every((digit) => digit !== "")) {
      submitPassword();
    }
  }, [password, submitPassword]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    if (/^\d$/.test(inputValue)) {
      const newPass = [...password];
      newPass[index] = inputValue;
      setPassword(newPass);

      if (index < password.length - 1) {
        setCurrentIndex(index + 1);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newPass = [...password];
      newPass[index] = "";

      if (index > 0) {
        setCurrentIndex(index - 1);
      }

      setPassword(newPass);
      setHasError(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    inputRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center">
      {/* 아이콘 */}
      <div className="mt-[48px] w-[84px] h-[84px] mb-[36px]">
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt="Lock Icon"
            width={84}
            height={84}
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-md" />
        )}
      </div>

      {/* 안내 텍스트 */}
      <p className="text-xl font-medium mb-[20px] text-center">
        암호를 입력하세요
      </p>

      {/* 입력 필드 */}
      <div className="inline-flex items-center justify-center gap-[16px]">
        {password.map((_, i) => (
          <div
            key={uuidv4()}
            className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg inline-flex items-center justify-center ${
              hasError ? "border-2 border-[#f73a2c]" : ""
            } ${
              currentIndex === i && !hasError ? "border-2 border-[#2c2c2c]" : ""
            }`}
          >
            <input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="grow text-center w-full h-full bg-transparent outline-none text-2xl"
              maxLength={1}
              value={password[i]}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          </div>
        ))}
      </div>

      {/* 에러 메시지 */}
      {hasError && (
        <p className="text-[#f73a2c] mt-4 text-left text-sm font-medium font-['Pretendard'] leading-tight w-full max-w-xs">
          암호가 일치하지 않아요
        </p>
      )}
    </div>
  );
}
