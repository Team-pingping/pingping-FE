"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function BottomSheet() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[360px] h-[556px] bg-[#1d1d1d] rounded-t-[20px] transition-transform duration-700 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* 상단 바 */}
      <div className="flex justify-center items-center w-full h-5 bg-[#1d1d1d] rounded-t-[20px] p-3">
        <div className="w-9 h-1 bg-[#555555] rounded-sm" />
      </div>

      {/* 바텀 시트 내용 */}
      <div className="px-4 pt-4 pb-6 flex flex-col justify-between h-full">
        <div>
          {/* Title and Close Button */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-white text-[22px] font-semibold leading-[30px] font-['Pretendard']">
              네이버 지도에서 원하는 곳을
              <br />
              저장해보세요
            </h2>
            <button
              onClick={handleClose}
              type="button"
              className="w-8 h-8 bg-[#2c2c2c] rounded-md flex items-center justify-center ml-[28px]"
            >
              <Image
                src="/svg/graycancel.svg"
                alt="닫기"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Description */}
          <p className="text-white text-base font-normal leading-normal mb-2 font-['Pretendard']">
            북마크 모음을 붙여넣으면 여러 곳을
            <br />한 번에 공유 가능!
          </p>

          {/* Note */}
          <div className="flex items-center text-sm font-normal font-['Pretendard'] text-[#8e8e8e] gap-1 mb-2">
            <span className="text-[#f96156]">*</span>
            <span>맘에 쏙 든 가게 하나만 공유도 가능해요</span>
          </div>
        </div>

        {/* Inner Rectangle with GIF */}
        <div className="w-[328px] h-[348px] mx-auto rounded-xl overflow-hidden mb-2">
          <Image
            src="/gif/popup.gif"
            alt="Popup Animation"
            width={328}
            height={348}
            layout="intrinsic"
          />
        </div>

        {/* 16px Spacing at the Bottom */}
        <div className="h-[8px]" />
      </div>
    </div>
  );
}
