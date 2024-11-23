"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/app/components/common/Navigation";
import PasswordInput from "./components/PincheckInput";

export default function PasswordPage() {
  const { nonMemberId } = useParams();
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileIcon = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/${nonMemberId}`
        );
        if (response.ok) {
          const data = await response.json();
          setIconUrl(data.profileLockSvg);
        } else {
          alert("프로필 아이콘을 가져오지 못했습니다.");
        }
      } catch (error) {
        alert(`API 호출 실패: ${error}`);
      }
    };

    if (nonMemberId) {
      fetchProfileIcon();
    }
  }, [nonMemberId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-00">
      <NavBar />
      <div className="flex flex-col items-center justify-start flex-grow p-8 mt-8">
        <PasswordInput iconUrl={iconUrl} />
      </div>
    </div>
  );
}
