import React from "react";
import Image from "next/image";
import useLastUpdateStore from "@/app/stores/useLastUpdateStore";
import { useMapStore } from "../stores/useMapStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";
import { useLoginModalStore } from "../stores/useLoginModalStore";
import useTriggerStore from "../stores/useTriggerStore";

export default function PingInformaion() {
  const { customMarkers } = useMarkerStore();
  const selectedMarkerName = useMapStore((state) => state.selectedMarkerName);
  const { toggleTrigger } = useTriggerStore();
  const { openLoginModal } = useLoginModalStore();
  const { setLastUpdated } = useLastUpdateStore();
  const nonMemberId = localStorage.getItem("nonMemberId");

  const selectedPing = customMarkers.find(
    (ping) => ping.placeName === selectedMarkerName
  );

  const reissueAccessToken = async (refreshToken: string | null) => {
    if (!refreshToken) {
      console.error("Refresh Token이 없습니다.");
      return null;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reissue`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;

        // 새로 발급받은 Access Token 저장
        localStorage.setItem("authToken", newAccessToken);
        console.log("Access Token 재발급 성공:", newAccessToken);
        return newAccessToken;
      }
      console.error("Access Token 재발급 실패:", response.status);
      return null;
    } catch (error) {
      console.error("토큰 재발급 중 오류 발생:", error);
      return null;
    }
  };

  const sendPingApi = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/pings/member`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sid: selectedPing?.sid,
          }),
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          const errorResponse = await response.json();
          if (errorResponse.subCode === 4) {
            const newAccessToken = await reissueAccessToken(token);
            if (newAccessToken) {
              return await sendPingApi();
            }
            openLoginModal();
            return null;
          }
        }
        openLoginModal();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toggleTrigger();
      setLastUpdated(Date.now());
      return true;
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  };
  const deletePingApi = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/pings/member`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sid: selectedPing?.sid,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          const errorResponse = await response.json();
          if (errorResponse.subCode === 4) {
            const newAccessToken = await reissueAccessToken(token);
            if (newAccessToken) {
              return await deletePingApi();
            }
            openLoginModal();
            return null;
          }
        }
        openLoginModal();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toggleTrigger();
      setLastUpdated(Date.now());
      console.log("삭제 성공");
      return true;
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      return null;
    }
  };
  const handleOpenLoginModal = () => {
    sendPingApi();
    console.log("Button clicked: Open login modal");
  };

  console.log(Number(nonMemberId));
  console.log(selectedPing?.nonMembers);
  const isAlreadyPing = selectedPing?.nonMembers.some((member) => {
    console.log(
      `Checking member.nonMemberId: ${member.nonMemberId} === ${Number(nonMemberId)}`
    );
    return member.nonMemberId === Number(nonMemberId);
  });
  console.log(`isAlreadyPing: ${isAlreadyPing}`);

  if (!selectedPing) {
    return (
      <div className="w-[256px] bg-[#1d1d1d] rounded-[4px] p-[12px] text-white">
        선택된 마커가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full  px-[20px] pt-[12px]">
      {/* Header */}
      <div className="mx-[4px] mb-[8px]">
        <div className="text-[#8e8e8e] text-text-sm1 flex justify-between">
          <div>{selectedPing.type}</div>
        </div>
        <div className=" flex justify-between">
          <div className="text-white text-title-sm w-[200px] truncate">
            {selectedPing.placeName}
          </div>

          {isAlreadyPing ? (
            <button type="button" onClick={deletePingApi}>
              <Image
                src="/svg/alreadyPing.svg"
                alt="내 핑에서 삭제"
                width={24}
                height={24}
              />
            </button>
          ) : (
            <button type="button" onClick={handleOpenLoginModal}>
              <Image
                src="/svg/plus.svg"
                alt="내 핀에 추가"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-[12px] bg-[#2d2d2d] flex items-center gap-[12px]">
        <div className="bg-grayscale-70 w-[41px] h-[24px] rounded-[2px] flex justify-center items-center text-text-sm1 text-white">
          <Image
            src="/svg/people.svg"
            alt="People"
            width={16}
            height={16}
            className="mr-[4px]"
          />
          {selectedPing.nonMembers.length}
        </div>
        <div className="w-[127px] text-text-sm1 text-white truncate">
          {selectedPing.nonMembers.map((member) => member.name).join(", ")}
        </div>
      </div>

      <button
        type="button"
        className="bg-danger-base rounded-small text-white w-full mt-[16px] h-[48px]"
        onClick={() => {
          window.open(selectedPing.url);
        }}
      >
        자세히 보러 가기
      </button>
    </div>
  );
}
