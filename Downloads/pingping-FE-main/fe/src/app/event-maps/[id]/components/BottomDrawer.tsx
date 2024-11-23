import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";

interface NonMember {
  nonMemberId: number;
  name: string;
}

interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
}

interface BottomDrawerProps {
  nonMembers: NonMember[];
  eventName: string;
  id: string;
}

export default function BottomDrawer({
  nonMembers: initialNonMembers,
  eventName: initialEventName,
  id,
}: BottomDrawerProps) {
  const [eventName, setEventName] = useState(initialEventName);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [nonMembers, setNonMembers] = useState<NonMember[]>(initialNonMembers);
  const [memberProfiles, setMemberProfiles] = useState<{
    [key: number]: string;
  }>({});
  const [allPings, setAllPings] = useState<Ping[]>([]);
  const { setCustomMarkers } = useMarkerStore();
  const moveToLocation = useLocationStore((state) => state.moveToLocation);
  const router = useRouter();
  const profileImagesRef = useRef([
    "/profile/profil1.svg",
    "/profile/profil2.svg",
    "/profile/profil3.svg",
    "/profile/profil4.svg",
  ]);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const profiles = nonMembers.reduce(
      (acc, member) => {
        const randomImage =
          profileImagesRef.current[
            Math.floor(Math.random() * profileImagesRef.current.length)
          ];
        acc[member.nonMemberId] = randomImage;
        return acc;
      },
      {} as { [key: number]: string }
    );
    setMemberProfiles(profiles);
  }, [nonMembers]);

  useEffect(() => {
    const fetchAllPings = async () => {
      try {
        const response = await fetch(`${apiUrl}/nonmembers/pings?uuid=${id}`);
        if (response.ok) {
          const data = await response.json();
          setAllPings(data.pings || []);
          setCustomMarkers(data.pings || []);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchAllPings();
  }, [apiUrl, id, setCustomMarkers]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          moveToLocation(latitude, longitude);
        },
        () => alert("현재 위치 정보를 가져올 수 없습니다.")
      );
    }
  };

  const handleButtonClick = async (nonMemberId: number) => {
    const isDeselect = selectedButton === nonMemberId;
    setSelectedButton(isDeselect ? null : nonMemberId);

    if (isDeselect) {
      setCustomMarkers(allPings);
    } else {
      try {
        const response = await fetch(
          `${apiUrl}/nonmembers/pings/${nonMemberId}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (response.ok) {
          const data = await response.json();
          const filteredPings = data.pings.map((ping: Ping) => ({
            ...ping,
            iconLevel: 1,
          }));
          setCustomMarkers(filteredPings);
        } else {
          console.log("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const handleAddButtonClick = () => {
    router.push(`/event-maps/${id}/load-mappin/forms/name-pin`);
  };

  const handleEditBtn = () => {
    if (selectedButton !== null) {
      router.push(`/event-maps/${id}/${selectedButton}`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: window.location.href }).then().catch();
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/nonmembers/pings/refresh-all?uuid=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEventName(data.eventName);
        setNonMembers(data.nonMembers);
        setAllPings(data.pings || []);
        setCustomMarkers(data.pings || []);
      } else {
        console.log("Failed to fetch refreshed data:", response.status);
      }
    } catch (error) {
      console.log("Error refreshing data:", error);
    }
  };

  const handleDrawerClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.type === "keydown") {
      const keyboardEvent = event as React.KeyboardEvent<HTMLDivElement>;
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        setSelectedButton(null);
        setCustomMarkers(allPings);
      }
    } else if (event.type === "click") {
      const mouseEvent = event as React.MouseEvent<HTMLDivElement>;
      const target = mouseEvent.target as HTMLElement;
      if (!target.closest("button")) {
        setSelectedButton(null);
        setCustomMarkers(allPings);
      }
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="bottom-drawer w-full h-[218px] bg-grayscale-90 z-10 rounded-t-xlarge"
      onClick={handleDrawerClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleDrawerClick(e);
        }
      }}
    >
      <div className="absolute mr-[16px] right-0 -top-[120px] flex flex-col">
        <button
          type="button"
          className="w-[48px] h-[48px] mb-[12px] shadow-medium"
          onClick={handleShare}
        >
          <Image src="/svg/share.svg" alt="share" width={48} height={48} />
        </button>
        <button
          type="button"
          className="w-[48px] h-[48px] shadow-medium"
          onClick={handleLocationClick}
        >
          <Image
            src="/svg/my-location.svg"
            alt="location"
            width={48}
            height={48}
          />
        </button>
      </div>
      <div className="w-full h-[20px] flex justify-center">
        <Image
          src="/svg/Grabber.svg"
          alt="Grabber"
          width={36}
          height={4}
          className="mt-[12px]"
        />
      </div>
      <div className="h-[62px] w-full pt-[16px] pb-[14px] pl-[20px] pr-[16px] flex justify-between text-lg text-grayscale-0 font-300">
        <div className="truncate max-w-[210px]">{eventName}</div>
        <div>
          {selectedButton !== null ? (
            <button
              type="button"
              className="w-[32px] h-[32px]"
              onClick={handleEditBtn}
            >
              <Image src="/svg/edit.svg" alt="edit" width={32} height={32} />
            </button>
          ) : (
            <button
              type="button"
              className="w-[32px] h-[32px]"
              onClick={handleRefresh}
            >
              <Image
                src="/svg/refresh.svg"
                alt="refresh"
                width={32}
                height={32}
              />
            </button>
          )}
        </div>
      </div>
      <div className="h-[96px] w-full flex pt-[6px] px-[16px] text-caption font-200 text-grayscale-20 overflow-x-auto scrollbar-hide gap-[12px]">
        <div className="w-[68px] h-[90px] flex flex-col justify-between shrink-0">
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="w-[68px] h-[68px] rounded-lg"
          >
            <Image src="/svg/add.svg" alt="add" width={68} height={68} />
          </button>
        </div>
        {nonMembers.map((member) => (
          <div
            key={member.nonMemberId}
            className="w-[68px] h-[90px] flex flex-col justify-between shrink-0"
          >
            <button
              type="button"
              onClick={() => handleButtonClick(member.nonMemberId)}
              className={`w-[72px] h-[72px] p-[2px] ${selectedButton === member.nonMemberId ? "border-2 rounded-lg border-primary-50" : ""}`}
            >
              <Image
                src={
                  memberProfiles[member.nonMemberId] || "/profile/default.svg"
                }
                alt="profile"
                width={68}
                height={68}
              />
            </button>
            <div className="text-center">{member.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
