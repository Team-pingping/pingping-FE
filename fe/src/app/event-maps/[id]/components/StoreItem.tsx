import React, { forwardRef, useState } from "react";
import Image from "next/image";

interface StoreItemProps {
  name: string;
  type: string;
  url: string;
  iconLevel: number;
}

const StoreItem = forwardRef<HTMLDivElement, StoreItemProps>(
  ({ name, type, url, iconLevel }, ref) => {
    const [imageSrc, setImageSrc] = useState(`/profile/level${iconLevel}.svg`);

    return (
      <div
        ref={ref}
        className="w-auto h-[56px] bg-[#2d2d2d] p-[8px] flex rounded justify-between store-item scrollbar-hide"
      >
        <div className="flex gap-[12px]">
          <Image
            src={imageSrc}
            onError={() => setImageSrc("/profile/level10.svg")}
            alt="pin"
            width={40}
            height={40}
          />
          <div>
            <div className="text-divider-default text-text-md1">{name}</div>
            <div className="text-text-disabled text-caption">{type}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            window.location.href = url;
          }}
          className="flex justify-center items-center text-text-disabled text-caption"
        >
          상세정보
          <Image
            src="/svg/rightArrow.svg"
            alt="화살표"
            width={12}
            height={24}
          />
        </button>
      </div>
    );
  }
);

export default StoreItem;
