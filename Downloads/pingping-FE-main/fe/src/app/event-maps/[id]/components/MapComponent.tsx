import React, { useEffect, useRef, useState } from "react";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";

interface MapComponentProps {
  px: number;
  py: number;
}

export default function MapComponent({ px, py }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const { customMarkers } = useMarkerStore();
  const { center } = useLocationStore();
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]); // 초기값을 빈 배열로 설정

  const getIconByLevel = (level: number, isSelected: boolean = false) => {
    const size = isSelected ? 44 : 36;
    return {
      url: `/pin/level${level}.svg`,
      size: new window.naver.maps.Size(size, size),
      scaledSize: new window.naver.maps.Size(size, size),
      origin: new window.naver.maps.Point(0, 0),
      anchor: new window.naver.maps.Point(size / 2, size),
    };
  };

  useEffect(() => {
    const initializeMap = () => {
      if (!mapInstanceRef.current && window.naver && mapRef.current) {
        mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(py, px),
          zoom: 15,
          scaleControl: false,
          logoControl: true,
          logoControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
          mapDataControl: false,
          mapTypeControl: false,
        });
      }
    };

    if (window.naver && window.naver.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    }
  }, [px, py]);

  useEffect(() => {
    if (!mapInstanceRef.current || !customMarkers) return;

    // 이전 마커 제거
    (markersRef.current || []).forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새로운 마커 추가
    customMarkers.forEach((ping, index) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(ping.py, ping.px),
        map: mapInstanceRef.current!,
        icon: getIconByLevel(ping.iconLevel),
      });
      markersRef.current.push(marker);

      const nonMemberNames = (ping.nonMembers || [])
        .map((member) => member.name)
        .join(", ");

      const infoWindowContent = `
        <div style="position: relative; padding: 8px; background: black; color: white; border-radius: 8px; font-size: 14px; max-width: 200px;">
          <strong>${nonMemberNames}</strong><br/>
          <a href="${ping.url}" target="_self" style="color: white; text-decoration: none; font-size: 12px;">
            가게 정보 바로 보기 &rsaquo;
          </a>
          <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid black;"></div>
        </div>
      `;

      const infoWindow = new window.naver.maps.InfoWindow({
        content: infoWindowContent,
        borderWidth: 0,
        disableAnchor: true,
        backgroundColor: "transparent",
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (selectedMarker !== null && selectedMarker !== index) {
          markersRef.current[selectedMarker].setIcon(
            getIconByLevel(customMarkers[selectedMarker].iconLevel)
          );
        }

        setSelectedMarker(index);
        marker.setIcon(getIconByLevel(ping.iconLevel, true));
        infoWindow.open(mapInstanceRef.current!, marker);
      });

      window.naver.maps.Event.addListener(
        mapInstanceRef.current!,
        "click",
        () => {
          if (selectedMarker !== null) {
            markersRef.current[selectedMarker].setIcon(
              getIconByLevel(customMarkers[selectedMarker].iconLevel)
            );
            setSelectedMarker(null);
            infoWindow.close();
          }
        }
      );
    });
  }, [customMarkers, selectedMarker]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(
        new window.naver.maps.LatLng(center.latitude, center.longitude)
      );
    }
  }, [center]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }} />;
}
