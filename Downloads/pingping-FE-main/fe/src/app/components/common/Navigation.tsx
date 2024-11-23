"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

function Navigation({
  showBackButton = true,
  onBack,
  title = "",
}: NavigationProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[360px] h-[56px] bg-white flex items-center justify-between px-2 z-10">
      {showBackButton && (
        <button type="button" onClick={handleBackClick} className="p-2">
          <Image
            src="/images/ArrowBack.svg"
            alt="뒤로가기"
            width={24}
            height={24}
            className="mr-2"
          />
        </button>
      )}
      <h1 className="text-lg font-semibold text-[#2c2c2c] text-center w-full truncate">
        {title}
      </h1>
    </header>
  );
}

export default Navigation;
