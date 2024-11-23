import Image from "next/image";
import { UserProps } from "../types/types";

export default function User({
  id,
  label,
  selectedButton,
  handleButtonClick,
}: UserProps) {
  return (
    <div className="w-[68px] h-[90px] mr-[8px] flex flex-col justify-between shrink-0">
      <button
        type="button"
        onClick={() => handleButtonClick(id)}
        className={`w-[68px] h-[68px] ${
          selectedButton === id ? "border-2 rounded-lg border-primary-50" : ""
        }`}
      >
        <Image src="/svg/add.svg" alt="add" width={68} height={68} />
      </button>
      <div className="text-center">{label}</div>
    </div>
  );
}
