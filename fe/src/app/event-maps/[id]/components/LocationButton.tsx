import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
}

function LocationButton({ onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="w-[48px] h-[48px] shadow-medium"
      onClick={onClick}
    >
      <Image src="/svg/my-location.svg" alt="location" width={48} height={48} />
    </button>
  );
}

export default LocationButton;
