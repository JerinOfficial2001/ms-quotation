import CustomModal from "@/components/common/CustomModal";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return (
    <div className="p-10 flex items-center justify-center flex-col">
      <Toaster position="top-center" />
      {children}
      <CustomModal />
    </div>
  );
}
