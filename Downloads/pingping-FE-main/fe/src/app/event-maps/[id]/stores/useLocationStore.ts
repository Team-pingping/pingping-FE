import { create } from "zustand";
import { LocationState } from "../types/types";

export const useLocationStore = create<LocationState>((set) => ({
  center: {
    latitude: 37.5665,
    longitude: 126.978,
  },
  moveToLocation: (latitude, longitude) =>
    set(() => ({
      center: { latitude, longitude },
    })),
}));
