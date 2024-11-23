"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import Button from "@/app/components/common/Button";

function LoadingPage() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/eventcreate-page");
  };

  return (
    <div className="w-full h-screen bg-[#1d1d1d] flex flex-col items-center relative">
      {/* 중앙 로고 */}
      <div className="flex flex-col items-center absolute inset-x-0 top-[152px]">
        <Image
          src="/images/mopinglogo.svg"
          alt="Moping Logo"
          width={150}
          height={169}
          className="object-cover"
          priority
        />

        {/* MOPING 텍스트 */}
        <div className="mt-[27px]">
          <Image
            src="/images/MOPING.svg"
            alt="Moping Text"
            width={193}
            height={27}
            className="object-cover"
          />
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="fixed bottom-[45px] w-full flex justify-center px-4">
        <Button
          label="모핑 시작하기"
          onClick={handleStartClick}
          type="start"
          className="w-full max-w-[328px] h-[60px] py-[17px] rounded-lg bg-[#F73A2C] text-white"
        />
      </div>
    </div>
  );
}

export default LoadingPage;
