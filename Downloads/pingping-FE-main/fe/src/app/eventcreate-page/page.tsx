"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/common/Navigation";
import LocationInput from "@/app/eventcreate-page/components/LocationInput";
import EventNameInput from "@/app/eventcreate-page/components/EventNameInput";
import Button from "@/app/components/common/Button";
import { useLocationStore } from "@/app/eventcreate-page/stores/useLocationStore";

function EventCreatePage() {
  const router = useRouter();
  const { selectedLocation, setLocation } = useLocationStore();
  const [eventName, setEventName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);

  const isFormComplete = selectedLocation?.name && eventName.trim();

  const handleNextClick = async () => {
    if (!isFormComplete || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          neighborhood: selectedLocation?.name,
          px: selectedLocation?.px ?? 0,
          py: selectedLocation?.py ?? 0,
          eventName,
        }),
      });

      const data = await response.json();
      if (response.ok && data.code === 200 && data.data?.shareUrl) {
        const extractedUuid = data.data.shareUrl.split("/").pop();
        setUuid(extractedUuid);
      } else {
        alert("이벤트 생성에 실패했습니다.");
      }
    } catch {
      alert("이벤트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (uuid) router.push(`/event-maps/${uuid}`);
  }, [uuid, router]);

  return (
    <div className="w-[360px] h-screen bg-white mx-auto flex flex-col">
      <Navigation onBack={() => router.push("/")} />
      <div className="flex-1 mt-4 px-4 overflow-auto pt-[56px]">
        <LocationInput
          onSelect={setLocation}
          className="mt-[12px] w-full"
          value={selectedLocation?.name || ""}
        />
        <EventNameInput
          className="mt-[40px] w-full"
          value={eventName}
          selectedLocation={selectedLocation?.name || ""}
          onChange={setEventName}
        />
      </div>
      <div className="w-fix fixed bottom-[45px] left-0 flex justify-center">
        <Button
          label="다음"
          type="next"
          onClick={handleNextClick}
          className="w-[328px] h-[60px] py-[17px] rounded-lg text-[#8e8e8e] text-lg font-['Pretendard'] font-medium"
          disabled={!isFormComplete || isSubmitting}
        />
      </div>
    </div>
  );
}

export default EventCreatePage;
