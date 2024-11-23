import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { SearchResultItemProps } from "@/app/eventcreate-page/types/types";

function SearchResultItem({
  place,
  searchTerm,
  onClick,
}: SearchResultItemProps) {
  const placeId = useMemo(() => place.id || uuidv4(), [place.id]);

  const highlightText = useCallback(
    (text: string, highlight: string) => {
      if (!highlight.trim()) return text;

      const regex = new RegExp(`(${highlight})`, "gi");
      const parts = text.split(regex);

      return (
        <>
          {parts.map((part) => (
            <span
              key={`${placeId}-${part}`}
              style={{
                color:
                  part.toLowerCase() === highlight.toLowerCase()
                    ? "#3a91ea"
                    : "#4a4a4a",
              }}
              className={
                part.toLowerCase() === highlight.toLowerCase()
                  ? "font-semibold"
                  : "text-gray-800"
              }
            >
              {part}
            </span>
          ))}
        </>
      );
    },
    [placeId]
  );

  const highlightedText = useMemo(
    () => highlightText(place.name, searchTerm),
    [place.name, searchTerm, highlightText]
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-11 px-4 py-2.5 bg-white flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
      aria-label={`Select ${place.name}`}
    >
      <div className="w-6 h-6 flex-shrink-0">
        <Image
          src="/svg/LocationPin.svg"
          alt="위치 핀"
          width={24}
          height={24}
        />
      </div>
      <div className="text-base font-medium font-['Pretendard'] text-gray-800 leading-none truncate pt-1">
        {highlightedText}
      </div>
    </button>
  );
}

export default SearchResultItem;
