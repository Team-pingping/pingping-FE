"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Navigation from "@/app/components/common/Navigation";
import Button from "@/app/components/common/Button";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "혹시 지금 이렇게 보이시나요?",
    description:
      "공유 버튼이 안 보이시죠?\n장소 리스트가 비공개로 되어 있어서 그래요",
    image: "/images/placeholder1.png",
  },
  {
    id: 2,
    step: "STEP 1",
    title: "공개 설정 리스트 새로 만들기",
    description: "[공개 범위 ‘공개’ 로 선택 > 새 리스트를 생성]",
    image: "/images/placeholder2.png",
  },
  {
    id: 3,
    step: "STEP 2",
    title: "북마크 옮기기",
    description: "[비공개 리스트 > 편집 > 장소 목록 편집]",
    image: "/images/placeholder3.png",
  },
  {
    id: 4,
    step: "STEP 3",
    title: "북마크 옮기기",
    description: "[전체 선택 > 이동 > 이동할 리스트 선택 > 완료]",
    image: "/images/placeholder4.png",
  },
  {
    id: 5,
    step: "STEP 4",
    title: "링크 복사하기",
    description: "공유해서 링크 복사하면 끝!",
    image: "/images/placeholder5.png",
  },
];

export default function ToolTipPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSwipe = (direction: "LEFT" | "RIGHT") => {
    if (direction === "LEFT") {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    } else if (direction === "RIGHT") {
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    trackMouse: true,
  });

  return (
    <div
      className="w-full h-screen bg-white flex flex-col items-center"
      {...handlers}
    >
      <Navigation />

      {/* Title Section */}
      <div className="w-[328px] mt-16 mb-[48px]">
        <h1 className="text-[#2c2c2c] text-[22px] font-semibold font-['Pretendard'] leading-[30px]">
          이렇게 공유 버튼이 안 보이나요?
          <br />
          이렇게 하면 해결 완
        </h1>
      </div>

      {/* Slide Content */}
      <div className="w-[328px] h-[406px] mb-[20px]">
        <div className="bg-[#F8F8F8] rounded-xl border border-[#F0F0F0] p-[20px]">
          {slides[currentSlide].step && (
            <div className="flex items-center gap-2 mb-2">
              <div className="text-[#3a91ea] text-base font-['Pretendard'] font-semibold">
                {slides[currentSlide].step}
              </div>
              <div className="text-black text-base font-['Pretendard'] font-semibold">
                {slides[currentSlide].title}
              </div>
            </div>
          )}
          {!slides[currentSlide].step && (
            <h2 className="text-black text-base font-['Pretendard'] font-semibold mb-2">
              {slides[currentSlide].title}
            </h2>
          )}
          <p className="text-[#555555] text-sm font-medium font-['Pretendard'] leading-snug mb-5 whitespace-pre-line">
            {slides[currentSlide].description}
          </p>
          <Image
            src={slides[currentSlide].image}
            alt="Example Screenshot"
            width={286}
            height={286}
            className="w-full rounded-xl border border-[#f0f0f0]"
          />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center items-center gap-2 mb-[50px]">
        {slides.map((slide) => (
          <div
            key={`slide-indicator-${slide.id}`}
            className={`w-2 h-2 rounded-full ${
              currentSlide === slides.indexOf(slide)
                ? "bg-black"
                : "bg-[#d9d9d9]"
            }`}
          />
        ))}
      </div>

      {/* Button Section */}
      <Button
        label="네이버 지도 바로 열기"
        onClick={() => {
          window.location.href = "https://m.map.naver.com/";
        }}
        className="w-[328px] h-[60px] text-lg font-medium font-['Pretendard'] rounded-lg flex justify-center items-center"
      />
    </div>
  );
}
