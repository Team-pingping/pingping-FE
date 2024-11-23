import { create } from "zustand";

// 유저 데이터 인터페이스 정의
interface UserData {
  nonMemberId: number | null;
  name: string;
  bookmarkUrls: string[];
  storeUrls: string[];
}

interface UserDataStore {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

// LocalStorage 키
const LOCAL_STORAGE_KEY = "userData";

// LocalStorage에서 데이터를 가져오는 함수
const getUserDataFromLocalStorage = (): UserData => {
  if (typeof window === "undefined")
    return { nonMemberId: null, name: "", bookmarkUrls: [], storeUrls: [] };

  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedData
    ? JSON.parse(storedData)
    : { nonMemberId: null, name: "", bookmarkUrls: [], storeUrls: [] };
};

// Zustand 스토어 생성
export const useUserDataStore = create<UserDataStore>((set, get) => ({
  userData: getUserDataFromLocalStorage(),
  setUserData: (data) => {
    const currentData = get().userData;

    // 변경이 없는 경우 상태 업데이트 중단
    if (
      currentData.nonMemberId === data.nonMemberId &&
      currentData.name === data.name &&
      JSON.stringify(currentData.bookmarkUrls) ===
        JSON.stringify(data.bookmarkUrls) &&
      JSON.stringify(currentData.storeUrls) === JSON.stringify(data.storeUrls)
    ) {
      return;
    }

    // 변경이 있을 경우 상태 업데이트 및 LocalStorage 저장
    set({ userData: data });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },
}));
