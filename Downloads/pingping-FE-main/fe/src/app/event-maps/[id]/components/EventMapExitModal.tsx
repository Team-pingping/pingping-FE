import React from "react";

interface ExitModalProps {
  onCancel: () => void;
  onExit: () => void;
}

function ExitModal({ onCancel, onExit }: ExitModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[272px] h-[202px] flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="w-full h-[148px] px-[39px] pt-6 pb-7 flex flex-col items-center gap-2.5">
          {" "}
          {/* pt 값을 줄여서 위로 올림 */}
          <div className="w-full flex flex-col items-center gap-2">
            <div className="text-center text-[#1d1d1d] text-xl font-semibold font-['Pretendard'] leading-7">
              이벤트를 저장하지 않고 나갈까요?
            </div>
            <div className="text-center text-[#8e8e8e] text-base font-medium font-['Pretendard'] leading-normal">
              이대로 나가면
              <br /> 발급된 이벤트가 초기화됩니다.
            </div>
          </div>
        </div>

        <div className="w-full flex border-t">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 h-[54px] bg-[#f0f0f0] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors duration-200"
          >
            <span className="text-center text-[#2c2c2c] text-lg font-medium font-['Pretendard']">
              취소
            </span>
          </button>

          <button
            type="button"
            onClick={onExit}
            className="w-1/2 h-[54px] bg-[#1d1d1d] flex items-center justify-center hover:bg-[#333] transition-colors duration-200"
          >
            <span className="text-center text-white text-lg font-medium font-['Pretendard']">
              나가기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitModal;
