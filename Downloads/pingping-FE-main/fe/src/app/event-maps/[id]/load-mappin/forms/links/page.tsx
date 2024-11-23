"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Moved to the correct order
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!isFormComplete) return;

    const name = localStorage.getItem("userName") || "";
    const pin = localStorage.getItem("userPin") || "";

    if (!name || !pin) {
      setIsFormComplete(false);
      return;
    }

    const requestBody = {
      uuid: id,
      name,
      password: pin,
      bookmarkUrls: mapLinks,
      storeUrls: storeLinks,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/pings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        localStorage.clear();
        router.push(`/event-maps/${id}`);
      } else {
        setIsFormComplete(false);
      }
    } catch {
      setIsFormComplete(false);
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
      <Navigation onBack={handleBack} />
      {/* Scrollable Content */}
      <div className="flex-1 mt-[16px] px-[16px] pt-[72px] w-full overflow-y-auto pb-[80px]">
        <div className="text-[#2c2c2c] text-[22px] font-semibold leading-[30px] font-['Pretendard']">
          마음에 쏙 든 공간을 불러와요
        </div>
        <div className="text-[#555555] text-base font-medium leading-relaxed font-['Pretendard'] mb-[24px]">
          네이버지도에 북마크 해 둔 공간을 불러와요
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          {/* 북마크 공유 링크 */}
          <LinkField
            label="북마크 공유 링크"
            placeholder="네이버지도 저장 리스트 붙여넣기"
            value={mapLinks}
            onChange={setMapLinks}
          />
          {/* 가게 링크 */}
          <LinkField
            label="가게 링크"
            placeholder="마음에 쏙 든 가게 하나만 공유하기"
            value={storeLinks}
            onChange={setStoreLinks}
          />

          {/* CheckBox Section */}
          <div className="flex items-center mt-[83px] mb-[18px] w-full">
            <CheckBox isChecked={isChecked} onChange={handleCheckboxChange} />
            <span className="ml-2 text-[#8e8e8e] text-xs font-medium font-['Pretendard'] leading-none">
              내 공간 정보를 모핑에서 활용하는 것에 동의합니다
            </span>
          </div>
        </form>
      </div>

      {/* Sticky Save Button */}
      <div className="w-full px-[16px] bg-white sticky bottom-0 border-t border-[#f0f0f0]">
        <Button
          label="저장"
          onClick={handleSubmit}
          className={`w-fix h-[60px] py-[17px] rounded-lg text-base font-medium text-white ${
            isFormComplete && !isSubmitting
              ? "bg-black"
              : "bg-[#d9d9d9] cursor-not-allowed"
          }`}
          disabled={!isFormComplete || isSubmitting}
        />
      </div>

      <BottomSheet />
    </div>
  );
}
