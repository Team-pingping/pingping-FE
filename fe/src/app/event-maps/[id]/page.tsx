"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import MapComponent from "./components/MapComponent";
import { BottomDrawer } from "./components/BottomDrawer";
import useDrawer from "./hooks/useDrawer";
import { useLocationStore } from "./stores/useLocationStore";
import { useMarkerStore } from "./load-mappin/stores/useMarkerStore";
import ExitModal from "./components/EventMapExitModal";
import useUpdateTimeStore from "./stores/useUpdateTime";
import useDidMountEffect from "./hooks/useDidmountEffect";
import LoginModal from "./components/LoginModal";

interface NonMember {
  nonMemberId: number;
  name: string;
  profileSvg?: string;
}

interface Ping {
  iconLevel: number;
  nonMembers: NonMember[];
  url: string;
  placeName: string;
  px: number;
  py: number;
  sid: string;
}

interface Data {
  eventName: string;
  px: number;
  py: number;
  nonMembers: NonMember[];
  pings: Ping[];
}

export default function Page() {
  const { y, openDrawer, closeDrawer, setPosition, stopPoints } = useDrawer();
  const { id } = useParams();
  const parsedId = Array.isArray(id) ? id[0] : id;
  const [data, setData] = useState<Data | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const moveToLocation = useLocationStore((state) => state.moveToLocation);
  const setCustomMarkers = useMarkerStore((state) => state.setCustomMarkers);
  const router = useRouter();
  const { updateTime, trigger } = useUpdateTimeStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/pings?uuid=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result);
          if (result.px && result.py) {
            moveToLocation(result.py, result.px);
          }

          if (result.pings) {
            setCustomMarkers(result.pings);
          }
        } else {
          console.error(
            "Failed to fetch data from API. Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };

    if (!data) {
      fetchData();
    }
  }, [id, data, moveToLocation, setCustomMarkers]);

  const handleBackbtn = () => {
    router.replace("/eventcreate-page");
  };

  const handleExit = () => {
    setIsModalOpen(false);
    router.replace("/eventcreate-page");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useDidMountEffect(() => {
    setIsVisible(true);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false);
    }, 4500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [updateTime, trigger]);

  const bind = useDrag(
    ({ last, movement: [, my], memo = y.get() }) => {
      if (last) {
        const newY = my + memo;
        const closestStopPoint = stopPoints.reduce((prev, curr) =>
          Math.abs(curr - newY) < Math.abs(prev - newY) ? curr : prev
        );
        setPosition(closestStopPoint);

        if (closestStopPoint === stopPoints[0]) {
          openDrawer();
        } else if (closestStopPoint === stopPoints[2]) {
          closeDrawer();
        }
      } else {
        setPosition(my + memo);
      }
      return memo;
    },
    {
      filterTaps: true,
      threshold: 10,
    }
  );

  return (
    <div>
      {isVisible && (
        <div
          className={`fixed h-[60px] mt-[16px] mx-[16px] text-white z-20 bg-[#1d1d1d] rounded-[8px] px-[16px] py-[14px] flex items-center text-text-md2 gap-[12px]  backdrop-blur-lg ${
            isFadingOut ? "animate-fadeout" : "animate-fadein2"
          }`}
          style={{ width: "calc(100% - 32px)" }}
        >
          <Image src="/profile/level3.svg" width={45} height={50} alt="핑" />
          <div>{updateTime} 전 맵핀이 업데이트 됐어요!</div>
        </div>
      )}
      <div className="w-[100%] h-[56px] px-[16px] py-[16px] fixed z-10 flex justify-end">
        <button
          type="button"
          className="w-[84px] h-[38px] text-white bg-[#2d2d2d] rounded-[8px]"
          onClick={handleBackbtn}
        >
          + 새 모임
        </button>
      </div>
      {data && (
        <>
          <MapComponent px={data.px} py={data.py} />
          <a.div
            {...bind()}
            style={{
              transform: y.to((val) => `translateY(${val}px)`),
              touchAction: "none",
            }}
            className="w-full h-[218px] fixed bottom-0 z-10 bg-white shadow-lg rounded-t-lg"
          >
            <BottomDrawer
              nonMembers={data.nonMembers.map((member) => ({
                ...member,
                profileSvg: member.profileSvg || "/profile/default.svg",
              }))}
              eventName={data.eventName}
              id={parsedId}
            />
          </a.div>
        </>
      )}
      {isModalOpen && <ExitModal onCancel={handleCancel} onExit={handleExit} />}
      <LoginModal eventId={parsedId} />
    </div>
  );
}
