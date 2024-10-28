import Image from "next/image";
import Form from "./components/Form";

export default function page() {
  return (
    <>
      <div className="w-full h-[56px] p-[16px]">
        <button type="button" className="w-[24px] h-[24px] ">
          <Image
            src="/images/ArrowBack.svg"
            alt="뒤로가기"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="mt-[24px] mb-[44px] ml-[16px] text-darkGray text-title-md">
        저장해둔 맵핀을 불러올게요
      </div>
      <Form />
      <div className="h-[20px]" />
    </>
  );
}