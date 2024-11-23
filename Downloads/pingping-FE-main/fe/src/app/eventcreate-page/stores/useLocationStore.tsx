import { create } from "zustand";

interface Place {
  name: string;
  address: string;
  px?: number;
  py?: number;
}

interface LocationState {
  selectedLocation: Place | null;
  setLocation: (location: Place) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: null,
  setLocation: (location) => set({ selectedLocation: location }),
}));
