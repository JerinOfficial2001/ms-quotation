import { Container, Paper } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import React, { useState } from "react";
import { BusinessDetails } from "./BusinessDetails";
import { QuotationPDF } from "./GenerateQuotationPDF";
import { ItemsTable } from "./ItemsTable";

interface QuotationFormProps {
  onSubmit: (data: any) => void;
}

export const QuotationForm: React.FC<QuotationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    quotationNo: "A00001",
    date: new Date().toISOString().split("T")[0],
    validTill: "",
    businessDetails: {
      from: {
        name: "",
        gstin: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        email: "",
        pan: "",
      },
      to: {
        name: "",
        gstin: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        email: "",
        pan: "",
      },
    },
    items: [
      {
        name: "",
        description: "",
        hsn: "",
        gstRate: 18,
        quantity: 1,
        rate: 0,
        amount: 0,
        cgst: 0,
        sgst: 0,
        total: 0,
      },
    ],
  });

  const generatePDF = async () => {
    try {
      const blob = await pdf(<QuotationPDF data={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Quotation-${formData.quotationNo}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You might want to add some error handling UI here
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: "8px",
          bgcolor: "#FFFFFF",
        }}
      >
        {/* Header section */}
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-[#7E3AF2] text-3xl font-semibold">Quotation</h1>
          <span className="bg-[#F59E0B] text-white px-4 py-1 rounded text-sm">
            Created
          </span>
        </div>

        {/* Quotation Details */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <span className="text-gray-600 w-32">Quotation No #</span>
            <span className="text-black">{formData.quotationNo}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 w-32">Quotation Date</span>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="border-none p-0 text-black"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 w-32">Valid Till Date</span>
            <input
              type="date"
              value={formData.validTill}
              onChange={(e) =>
                setFormData({ ...formData, validTill: e.target.value })
              }
              className="border-none p-0 text-black"
            />
          </div>
        </div>

        {/* Business Details with light purple background */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-[#F3F0FF] p-6 rounded-lg">
            <h2 className="text-[#7E3AF2] text-xl font-semibold mb-4">
              Quotation From
            </h2>
            <BusinessDetails
              type="from"
              data={formData.businessDetails.from}
              onChange={(data) => {
                setFormData({
                  ...formData,
                  businessDetails: {
                    ...formData.businessDetails,
                    from: data,
                  },
                });
              }}
            />
            <div className="mt-2 text-black">India</div>
          </div>
          <div className="bg-[#F3F0FF] p-6 rounded-lg">
            <h2 className="text-[#7E3AF2] text-xl font-semibold mb-4">
              Quotation For
            </h2>
            <BusinessDetails
              type="to"
              data={formData.businessDetails.to}
              onChange={(data) => {
                setFormData({
                  ...formData,
                  businessDetails: {
                    ...formData.businessDetails,
                    to: data,
                  },
                });
              }}
            />
            <div className="mt-2 text-black">India</div>
          </div>
        </div>

        {/* Items Table */}
        <ItemsTable
          items={formData.items}
          onChange={(items) => setFormData({ ...formData, items })}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={generatePDF}
            className="px-6 py-2 bg-[#7E3AF2] text-white rounded-md hover:bg-[#6D28D9]"
          >
            Download PDF
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-6 py-2 bg-[#7E3AF2] text-white rounded-md hover:bg-[#6D28D9]"
          >
            Save Quotation
          </button>
        </div>
      </Paper>
    </Container>
  );
};
