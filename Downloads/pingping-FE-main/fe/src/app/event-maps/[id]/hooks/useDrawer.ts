import { useState } from "react";
import { useSpring } from "@react-spring/web";

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const openDrawer = () => {
    setIsOpen(true);
    api.start({ y: 0 });
  };

  const closeDrawer = () => {
    setIsOpen(false);
    api.start({ y: 130 });
  };

  const setPosition = (newY: number) => {
    const limitedY = Math.min(Math.max(newY, 0), 130);
    api.start({ y: limitedY });
  };

  return {
    y,
    isOpen,
    openDrawer,
    closeDrawer,
    setPosition,
    api, // 필요한 경우 외부에서 제어할 수 있도록 spring API를 반환
  };
};

export default useDrawer;
