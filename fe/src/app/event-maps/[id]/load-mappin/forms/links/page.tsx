"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import Button from "@/app/components/common/Button";
import LinkField from "./components/LinkField";
import BottomSheet from "./components/BottomSheet";
import CheckBox from "./components/CheckBox";

export default function LinksPage() {
  const [mapLinks, setMapLinks] = useState<string[]>([]);
  const [storeLinks, setStoreLinks] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const allMapLinksValid = mapLinks.length > 0;
    const allStoreLinksValid = storeLinks.length > 0;

    const isComplete =
      (allMapLinksValid || allStoreLinksValid) && isChecked && !isSubmitting;

    setIsFormComplete(isComplete);
  }, [mapLinks, storeLinks, isChecked, isSubmitting]);

  const cleanURL = (url: string): string => {
    const match = url.match(/https?:\/\/[^\s]+/);
    return match ? match[0].trim() : "";
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!isFormComplete) return;

    const name = localStorage.getItem("userName") || "";
    const pin = localStorage.getItem("userPin") || "";

    if (!name || !pin) {
      setIsFormComplete(false);
      return;
    }

    const cleanedMapLinks = mapLinks.map(cleanURL).filter(Boolean);
    const cleanedStoreLinks = storeLinks.map(cleanURL).filter(Boolean);

    const requestBody = {
      uuid: id,
      name,
      password: pin,
      bookmarkUrls: cleanedMapLinks,
      storeUrls: cleanedStoreLinks,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/pings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        localStorage.clear();
        router.push(`/event-maps/${id}`);
      } else if (response.status === 409) {
        alert("이미 존재하는 이름입니다. 다시 시도해주세요.");
      } else {
        setIsFormComplete(false);
        alert("저장에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("저장 중 에러 발생:", error);
      setIsFormComplete(false);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push(`/event-maps/${id}/load-mappin/forms/name-pin`);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-[360px] h-screen bg-white mx-auto flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-white h-[56px]">
        <Navigation onBack={handleBack} />
      </div>

      <div className="flex-1 px-[16px] pt-[72px] w-full overflow-y-auto pb-[100px]">
        <div className="mt-[16px] mb-[36px]">
          <div className="text-[#2c2c2c] text-[22px] font-semibold leading-[30px] font-['Pretendard']">
            마음에 쏙 든 공간을 불러와요
          </div>
          <div className="text-[#555555] text-base font-medium leading-relaxed font-['Pretendard'] mt-2">
            네이버지도에 북마크 해 둔 공간을 불러와요
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <LinkField
            label="북마크 공유 링크"
            placeholder="네이버지도 저장 리스트 붙여넣기"
            value={mapLinks}
            onChange={setMapLinks}
          />
          <LinkField
            label="가게 링크"
            placeholder="마음에 쏙 든 가게 하나만 공유하기"
            value={storeLinks}
            onChange={setStoreLinks}
          />

          <div className="flex items-center">
            <CheckBox isChecked={isChecked} onChange={handleCheckboxChange} />
            <span className="ml-2 text-[#8e8e8e] text-xs font-medium font-['Pretendard'] leading-none">
              내 공간 정보를 모핑에서 활용하는 것에 동의합니다
            </span>
          </div>
        </form>
      </div>

      <div
        className="w-fix px-[16px] bg-white fixed py-[8px]"
        style={{ zIndex: 50 }}
      >
        <Button
          label="저장"
          onClick={handleSubmit}
          isSubmitting={isSubmitting}
          isFormComplete={isFormComplete}
        />
      </div>

      <BottomSheet />
    </div>
  );
}
