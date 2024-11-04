"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLocationStore } from "@/app/eventcreate-page/stores/useLocationStore";
import { LocationInputProps } from "@/app/eventcreate-page/types/types"; // 'Place'를 삭제

function LocationInput({
  className,
  value = "",
  onSelect,
}: LocationInputProps) {
  const router = useRouter();
  const { selectedLocation } = useLocationStore();
  const [location, setLocationState] = useState(value);

  useEffect(() => {
    if (selectedLocation && selectedLocation.name !== location) {
      setLocationState(selectedLocation.name);
      onSelect?.(selectedLocation);
    }
  }, [selectedLocation, onSelect, location]);

  return (
    <div className={`relative flex flex-col ${className} mt-4`}>
      <label className="text-[#2c2c2c] text-xl font-semibold font-['Pretendard'] leading-loose mb-4">
        어떤 공간을 찾고 계신가요?
      </label>
      <button
        type="button"
        className="relative w-[328px] h-14 px-4 bg-[#f7f7f7] rounded-lg flex items-center cursor-pointer"
        onClick={() => router.push("/eventcreate-page/location-search")}
      >
        <Image
          src="/images/Search.svg"
          alt="돋보기 아이콘"
          width={24}
          height={24}
          className="mr-3"
        />
        <input
          type="text"
          value={location}
          placeholder="장소를 입력해주세요"
          className="bg-transparent border-none flex-grow text-[#2c2c2c] text-base font-medium outline-none"
          readOnly
        />
      </button>
    </div>
  );
}

export default LocationInput;
