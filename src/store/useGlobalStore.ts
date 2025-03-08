import { create } from "zustand";

interface store {
  openModal: string;
  setOpenModal: (value: string) => void;
  fromAndTo: {
    name: string;
    address: string;
    additional_line1: string;
    additional_line2: string;
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
    additional_line1: "",
    additional_line2: "",
    type: "client",
  },
  details: [
    {
      name: "Microgenesis Software Solutions",
      address: "No 3/49A,North Subdistrict,",
      additional_line1: "Coimbatore,",
      additional_line2: "Tamil Nadu, India-641110",
      type: "business",
    },
  ],
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
