"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import Button from "@/app/components/common/Button";
import CheckBox from "../../load-mappin/forms/links/components/CheckBox";
import LinkFieldEdit from "./components/EditLink";
import ExitModal from "./components/ExitModal";
import { useUserDataStore } from "../stores/useUserDataStore";

export default function LinkEditPage() {
  const { userData, setUserData } = useUserDataStore();
  const [mapLinks, setMapLinks] = useState<string[]>([]);
  const [storeLinks, setStoreLinks] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isChecked, setIsChecked] = useState(true);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { id, nonMemberId } = useParams();

  // URL 유효성 검사 함수
  const isValidLink = (link: string) => {
    const urlPattern = /^(https?:\/\/[^\s]+)/g;
    return urlPattern.test(link.trim());
  };

  // 데이터 로드 및 초기화
  useEffect(() => {
    if (!id || !nonMemberId) {
      console.error("누락된 라우트 매개변수:", { id, nonMemberId });
      router.push("/error");
      return;
    }

    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.nonMemberId === Number(nonMemberId)) {
        setMapLinks(
          parsedData.bookmarkUrls.length ? parsedData.bookmarkUrls : [""]
        );
        setStoreLinks(
          parsedData.storeUrls.length ? parsedData.storeUrls : [""]
        );
        setUserName(parsedData.name || "");
        setUserData(parsedData);
      }
    } else {
      setMapLinks(userData.bookmarkUrls.length ? userData.bookmarkUrls : [""]);
      setStoreLinks(userData.storeUrls.length ? userData.storeUrls : [""]);
      setUserName(userData.name || "");
    }

    setIsLoading(false);
  }, [id, nonMemberId, setUserData, userData, router]);

  // 저장 버튼 활성화 상태 업데이트
  useEffect(() => {
    const allMapLinksValid = mapLinks.length > 0 && mapLinks.every(isValidLink);
    const allStoreLinksValid =
      storeLinks.length > 0 && storeLinks.every(isValidLink);

    const isComplete = (allMapLinksValid || allStoreLinksValid) && isChecked;
    setIsSaveButtonEnabled(isComplete);
  }, [mapLinks, storeLinks, isChecked]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const updatedData = {
      nonMemberId: userData.nonMemberId || Number(nonMemberId),
      name: userName,
      bookmarkUrls: mapLinks,
      storeUrls: storeLinks,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/pings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("비회원 핑 업데이트 실패");
      }

      setUserData(updatedData);
      localStorage.setItem("userData", JSON.stringify(updatedData));

      router.push(`/event-maps/${id}`);
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  const handleBack = () => {
    setShowExitModal(true);
  };

  const handleExit = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("formData");
    router.back();
  };

  const handleCancel = () => {
    setShowExitModal(false);
  };

  if (isLoading) {
    return <div />;
  }

  return (
    <div className="w-[360px] h-screen bg-white mx-auto flex flex-col">
      {/* 상단 네비게이션 */}
      <Navigation onBack={handleBack} />

      {/* 스크롤 가능 영역 */}
      <div
        className="flex-1 px-4 mt-[75px] overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 60px)", // 화면 높이에서 저장 버튼 높이를 뺀 영역
          paddingBottom: "120px", // 저장 버튼과 내용 간 여백 추가
        }}
      >
        {userName && (
          <div className="text-darkGray text-title-md">
            {userName}님의 맵핀 모음이에요
          </div>
        )}
        <div className="text-[#555555] text-base font-medium leading-relaxed mb-[24px]">
          불러온 북마크를 자유롭게 편집할 수 있어요
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <LinkFieldEdit
            label="북마크 공유 링크"
            placeholder="네이버지도 저장 리스트 붙여넣기"
            value={mapLinks}
            onChange={setMapLinks}
          />
          <LinkFieldEdit
            label="가게 정보 링크"
            placeholder="마음에 쏙 든 가게 하나만 공유하기"
            value={storeLinks}
            onChange={setStoreLinks}
          />
          <div className="flex items-center mt-[83px] mb-[20px] w-full">
            <CheckBox
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span className="ml-2 text-[#8e8e8e] text-xs font-medium font-['Pretendard'] leading-none">
              내 공간 정보를 모핑에서 활용하는 것에 동의합니다
            </span>
          </div>
        </form>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="w-full px-[16px] bg-white sticky bottom-0 border-t border-[#f0f0f0]">
        <Button
          label="저장"
          className="w-fix h-[60px] py-[17px] rounded-lg bg-black text-white disabled:bg-[#e0e0e0]"
          onClick={handleSubmit}
          disabled={!isSaveButtonEnabled}
        />
      </div>
      {showExitModal && (
        <ExitModal onCancel={handleCancel} onExit={handleExit} />
      )}
    </div>
  );
}
