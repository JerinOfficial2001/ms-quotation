"use client";
import BaseLayout from "@/layout/BaseLayout";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QuotationTemplate from "../templates/Quotaion";
import Button from "../common/Button";
import { useReactToPrint } from "react-to-print";

type Props = {};

export default function Quotation({}: Props) {
  const [isEditable, setisEditable] = useState(false);
  const resumeRef: any = useRef<any>(null);
  const reactToPrintFn = useReactToPrint({ contentRef: resumeRef });

  return (
    <BaseLayout>
      <div className="sticky top-10 flex w-full flex-row-reverse justify-between items-center mb-2">
        <Button
          variant="primary"
          text={isEditable ? "Done" : "Edit"}
          onClick={() => {
            setisEditable(!isEditable);
          }}
        />
        {!isEditable && (
          <Button
            variant="primary"
            onClick={reactToPrintFn}
            text="Convert To Pdf"
          />
        )}
      </div>
      <div ref={resumeRef}>
        <QuotationTemplate isEditable={isEditable} />
      </div>
    </BaseLayout>
  );
}
