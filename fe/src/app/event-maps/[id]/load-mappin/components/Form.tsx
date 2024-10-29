"use client";

import React, { useState, useEffect } from "react";
import NameField from "./NameField";
import PinField from "./PinField";
import LinkField from "./LinkField";

interface FormProps {
  uuid: string;
}

export default function Form({ uuid }: FormProps) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [mapLinks, setMapLinks] = useState([""]);
  const [storeLinks, setStoreLinks] = useState([""]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // API 호출
    try {
      const response = await fetch("/api/nonmembers/pings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: uuid, // UUID를 실제로 생성하거나 가져와야 합니다.
          name,
          password: pin.join(""),
          bookmarkUrls: mapLinks,
          storeUrls: storeLinks,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message || "성공적으로 처리되었습니다.");
        console.log(data);
      } else {
        console.log(data.error || "요청에 실패했습니다.");
      }
    } catch (error) {
      console.log("서버 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const isPinComplete = pin.every((digit) => digit !== "");
    setIsFormComplete(!!(name && isPinComplete));
  }, [name, pin]);

  useEffect(() => {
    const hideTooltip = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".group") === null) {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      window.addEventListener("click", hideTooltip);
    }

    return () => {
      window.removeEventListener("click", hideTooltip);
    };
  }, [isTooltipVisible]);

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit}>
        <NameField value={name} onChange={setName} />
        <PinField value={pin} onChange={setPin} />
        <LinkField
          label="맵핀 모음 링크"
          placeholder="링크 붙여넣기"
          value={mapLinks}
          onChange={setMapLinks}
          showTooltip={isTooltipVisible}
          onInfoClick={() => setIsTooltipVisible(true)}
        />
        <LinkField
          label="가게 정보 링크"
          placeholder="링크 붙여넣기"
          value={storeLinks}
          onChange={setStoreLinks}
        />
        <button
          className={`w-full flex items-center text-lg font-200 justify-center h-[60px] rounded-small ${
            isFormComplete
              ? "bg-grayscale-90 text-white"
              : "bg-grayscale-20 text-mediumGray"
          }`}
          type="submit"
          disabled={!isFormComplete}
        >
          확인
        </button>
      </form>
    </div>
  );
}