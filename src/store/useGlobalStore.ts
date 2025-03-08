import { create } from "zustand";

interface store {
  openModal: string;
  setOpenModal: (value: string) => void;
  fromAndTo: {
    name: string;
    address: string;
    additional: string;
    type: "client" | "business";
  };
  handleChangeFormData: (key: string, value: any) => void;
  details: any;
  handleAddDetails: (value: any) => void;
  handleReset: (fromName: string) => void;
}

const initialData: any = {
  openModal: "",
  fromAndTo: {
    name: "",
    address: "",
    additional: "",
    type: "client",
  },
  details: [],
};

export const useGlobalStore = create<store>((set) => ({
  ...initialData,
  setOpenModal: (value) => set({ openModal: value }),
  handleChangeFormData: (key, value) =>
    set((prev) => {
      return { fromAndTo: { ...prev.fromAndTo, [key]: value } };
    }),
  handleAddDetails: (value) =>
    set((prev) => {
      return { details: [...prev.details, value] };
    }),
  handleReset: (form) => set({ [form]: initialData[form] }),
}));
