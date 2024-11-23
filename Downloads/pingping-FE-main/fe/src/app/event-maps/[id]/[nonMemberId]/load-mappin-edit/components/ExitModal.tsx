"use client";

import React from "react";
import Image from "next/image";

interface ExitModalProps {
  onCancel: () => void;
  onExit: () => void;
}

const ExitModal: React.FC<ExitModalProps> = function ExitModal({
  onCancel,
  onExit,
}) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[272px] bg-white rounded-lg shadow-lg flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col items-center px-6 pt-7 pb-6 gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/svg/modal.svg"
              alt="Warning Icon"
              width={129}
              height={84}
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <div className="text-[#1d1d1d] text-xl font-semibold font-['Pretendard'] leading-7">
              저장하지 않고 나갈까요?
            </div>
            <div className="text-[#8e8e8e] text-sm font-medium font-['Pretendard'] leading-snug mt-1">
              이대로 나가면
              <br /> 작성하던 내용이 사라져요.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex border-t border-[#f0f0f0]">
          <button
            type="button"
            onClick={onCancel}
            className="w-[136px] h-[50px] flex items-center justify-center bg-white rounded-bl-lg border-r border-[#f0f0f0]"
          >
            <span className="text-[#555555] text-base font-medium font-['Pretendard'] leading-none">
              취소
            </span>
          </button>
          <button
            type="button"
            onClick={onExit}
            className="w-[136px] h-[50px] flex items-center justify-center bg-white rounded-br-lg"
          >
            <span className="text-[#f73a2c] text-base font-semibold font-['Pretendard'] leading-none">
              나가기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
