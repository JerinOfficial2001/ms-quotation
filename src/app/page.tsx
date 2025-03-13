"use client";

import Button from "@/components/common/Button";
import QuotationTemplate from "@/components/templates/Quotaion";
import { useGlobalStore } from "@/store/useGlobalStore";
import {
  downloadBackupFile,
  GET_FROM_STORAGE,
} from "@/utils/localstorage.service";
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function Home() {
  const printRef = useRef(null);
  const printToPdf = useReactToPrint({ contentRef: printRef });
  const [isEditable, setisEditable] = useState(false);
  const { setOpenModal } = useGlobalStore();
  return (
    <main className=" bg-background-default py-8">
      <div className="max-w-[95%] sm:max-w-[auto] mx-auto ">
        {/* Header */}
        <div className="text-center mb-8 no-print">
          <h1 className="text-3xl font-bold text-text-primary">
            Create Your Quotation
          </h1>
          <p className="mt-2 text-text-secondary">
            Fill in the details below to generate a professional quotation
          </p>
        </div>

        {/* Quotation Form */}
        <div className="no-print w-full flex flex-row-reverse items-center justify-between">
          <Button
            onClick={() => {
              setisEditable(!isEditable);
            }}
            variant="primary"
            text={isEditable ? "Done" : "Edit"}
            className="mb-10"
          />
          <Button
            onClick={() => {
              setOpenModal("backup");
            }}
            variant="primary"
            text={"Upload Backup"}
            className="mb-10"
          />
          {!isEditable && (
            <Button
              onClick={printToPdf}
              variant="primary"
              text="Print"
              className="mb-10"
            />
          )}
        </div>
        <div className="no-print w-full flex flex-row-reverse items-center justify-between">
          {GET_FROM_STORAGE() && (
            <Button
              variant="primary"
              text={"Download Backup file"}
              onClick={downloadBackupFile}
            />
          )}
        </div>
        <Box ref={printRef} className="print-content">
          <QuotationTemplate isEditable={isEditable} />
        </Box>
      </div>
    </main>
  );
}
