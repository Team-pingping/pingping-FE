"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import NameField from "./components/NameField";
import PinField from "./components/PinField";

export default function NamePinPage() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isNameInputComplete, setIsNameInputComplete] = useState(false); // 이름 입력 완료 여부
  const router = useRouter();
  const { id } = useParams();
  const nameInputRef = useRef<HTMLInputElement>(null);

  // 로컬 스토리지를 초기화하고 이름 입력 필드에 포커스 설정
  useEffect(() => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userPin");
    setName("");
    setPin(["", "", "", ""]);

    // 이름 입력 필드에 포커스 설정
    nameInputRef.current?.focus();
  }, []);

  // PIN 입력 완료 여부 확인
  const isPinComplete = pin.every((digit) => digit !== "");

  // 이름 입력 필드의 포커스가 해제될 때 입력 완료 여부 설정
  const handleNameBlur = () => {
    if (name.trim() !== "") {
      setIsNameInputComplete(true);
    }
  };

  // 이름과 PIN이 모두 완성되었는지 확인하고 페이지 이동
  useEffect(() => {
    if (isNameInputComplete && isPinComplete) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userPin", pin.join(""));
      router.push(`/event-maps/${id}/load-mappin/forms/links`);
    }
  }, [isNameInputComplete, isPinComplete, name, pin, id, router]);

  const handleBack = () => {
    router.push(`/event-maps/${id}`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-white">
      <Navigation onBack={handleBack} />
      <div className="w-full max-w-[360px] pt-[64px] px-4 h-full overflow-y-auto hide-scrollbar">
        <div className="mt-[16px] mb-[36px]">
          <div className="text-[#2c2c2c] text-[22px] font-semibold leading-[30px] font-['Pretendard']">
            내가 pick한 공간을 공유해 볼까요?
          </div>
          <div className="text-[#555555] text-base font-medium leading-relaxed font-['Pretendard'] mt-2">
            먼저 프로필을 만들어 주세요
          </div>
        </div>

        <NameField
          value={name}
          onChange={setName}
          inputRef={nameInputRef}
          onBlur={handleNameBlur} // 포커스 해제 시 호출
        />
        <div className="mt-[24px]">
          <PinField value={pin} onChange={setPin} />
        </div>
        <div className="h-[20px]" />
      </div>
    </div>
  );
}
