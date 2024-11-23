"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import MapComponent from "./components/MapComponent";
import BottomDrawer from "./components/BottomDrawer";
import useDrawer from "./hooks/useDrawer";
import { useLocationStore } from "./stores/useLocationStore";
import { useMarkerStore } from "./load-mappin/stores/useMarkerStore";
import ExitModal from "./components/EventMapExitModal";

interface NonMember {
  nonMemberId: number;
  name: string;
}

interface Ping {
  iconLevel: number;
  nonMembers: NonMember[];
  url: string;
  placeName: string;
  px: number;
  py: number;
}

interface Data {
  eventName: string;
  px: number;
  py: number;
  nonMembers: NonMember[];
  pings: Ping[];
}

export default function Page() {
  const { y, openDrawer, closeDrawer, setPosition } = useDrawer();
  const { id } = useParams();
  const parsedId = Array.isArray(id) ? id[0] : id;
  const [data, setData] = useState<Data | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const moveToLocation = useLocationStore((state) => state.moveToLocation);
  const setCustomMarkers = useMarkerStore((state) => state.setCustomMarkers);
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect triggered with id:", id);

    const fetchData = async () => {
      try {
        console.log("Fetching data for id:", id);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/pings?uuid=${id}`,
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
          console.log("API Response Data:", JSON.stringify(result, null, 2));
          if (result.px && result.py) {
            console.log("Moving to location:", result.py, result.px);
            moveToLocation(result.py, result.px);
          }

          if (result.pings) {
            console.log("Setting custom markers:", result.pings);
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
    setIsModalOpen(true);
  };

  const handleExit = () => {
    setIsModalOpen(false);
    router.replace("/eventcreate-page");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const bind = useDrag(
    ({ last, movement: [, my], memo = y.get() }) => {
      if (last) {
        if (my + memo > 100) {
          closeDrawer();
        } else {
          openDrawer();
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
      <div className="w-[100%] h-[56px] px-[16px] py-[8px] fixed z-10">
        <button
          type="button"
          className="w-[40px] h-[40px]"
          onClick={handleBackbtn}
        >
          <Image src="/svg/arrow-back.svg" alt="icon" width={40} height={40} />
        </button>
      </div>
      {data && (
        <>
          <MapComponent px={data.px} py={data.py} />
          <a.div
            {...bind()}
            style={{ y, touchAction: "none" }}
            className="w-full h-[218px] fixed bottom-0 z-10"
          >
            <BottomDrawer
              nonMembers={data.nonMembers}
              eventName={data.eventName}
              id={parsedId}
            />
          </a.div>
        </>
      )}
      {isModalOpen && <ExitModal onCancel={handleCancel} onExit={handleExit} />}
    </div>
  );
}
