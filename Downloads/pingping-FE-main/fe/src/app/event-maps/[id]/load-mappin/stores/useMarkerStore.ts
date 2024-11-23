import { create } from "zustand";

interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
  nonMembers: { nonMemberId: number; name: string }[];
}

export type PingWithoutNonMembers = Omit<Ping, "nonMembers">;

interface MarkerStoreState {
  customMarkers: Ping[];
  setCustomMarkers: (pings: Ping[] | PingWithoutNonMembers[]) => void;
  resetMarkers: () => void;
}

export const useMarkerStore = create<MarkerStoreState>((set) => ({
  customMarkers: [],
  setCustomMarkers: (pings) => set({ customMarkers: pings as Ping[] }),
  resetMarkers: () => set({ customMarkers: [] }),
}));
