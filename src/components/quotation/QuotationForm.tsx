import { Container, Paper } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import { AnimatePresence, motion } from "framer-motion";
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
        name: "Item Name",
        description: "",
        hsn: "",
        gstRate: 18,
        quantity: 1,
        rate: 1.0,
        amount: 1.0,
        cgst: 0.09,
        sgst: 0.09,
        total: 1.18,
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
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              mt: 4,
              borderRadius: "8px",
              bgcolor: "#FFFFFF",
            }}
          >
            {/* Header section */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-[#7E3AF2] text-2xl sm:text-3xl font-semibold">
                Quotation
              </h1>
              <span className="bg-[#F59E0B] text-white px-4 py-1 rounded text-sm">
                Created
              </span>
            </motion.div>

            {/* Quotation Details */}
            <motion.div
              className="space-y-4 mb-8"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <span className="text-gray-600 w-full sm:w-32">
                  Quotation No #
                </span>
                <span className="text-black">{formData.quotationNo}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <span className="text-gray-600 w-full sm:w-32">
                  Quotation Date
                </span>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="border-none p-0 text-black"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <span className="text-gray-600 w-full sm:w-32">
                  Valid Till Date
                </span>
                <input
                  type="date"
                  value={formData.validTill}
                  onChange={(e) =>
                    setFormData({ ...formData, validTill: e.target.value })
                  }
                  className="border-none p-0 text-black"
                />
              </div>
            </motion.div>

            {/* Business Details */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="bg-[#F3F0FF] p-4 sm:p-6 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-[#7E3AF2] text-lg sm:text-xl font-semibold mb-4">
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
              </motion.div>
              <motion.div
                className="bg-[#F3F0FF] p-4 sm:p-6 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-[#7E3AF2] text-lg sm:text-xl font-semibold mb-4">
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
              </motion.div>
            </motion.div>

            {/* Items Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ItemsTable
                items={formData.items}
                onChange={(items) => setFormData({ ...formData, items })}
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-end gap-4 mt-8"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#7E3AF2] text-white rounded-md hover:bg-[#6D28D9]"
                onClick={generatePDF}
              >
                Download PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-[#7E3AF2] text-white rounded-md hover:bg-[#6D28D9]"
                onClick={() => onSubmit(formData)}
              >
                Save Quotation
              </motion.button>
            </motion.div>
          </Paper>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};
