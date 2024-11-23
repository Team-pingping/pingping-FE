import { create } from "zustand";

interface NonMember {
  nonMemberId: number;
  name: string;
}

interface Data {
  uuid: string;
  name: string;
  password: string;
  bookmarkUrls: string[];
  storeUrls: string[];
  nonMembers: NonMember[];
}

interface DataStore {
  data: Data | null;
  setData: (data: Data) => void;
}

const useDataStore = create<DataStore>((set) => ({
  data: null,
  setData: (data: Data) => set({ data }),
}));

export default useDataStore;
