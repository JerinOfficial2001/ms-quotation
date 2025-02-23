"use client";

import { QuotationForm } from "@/components/quotation/QuotationForm";
import { generatePDF } from "@/utils/pdfGenerator";

export default function Home() {
  const handleSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted:", data);

    // Generate PDF
    generatePDF(data);
  };

  return (
    <main className="min-h-screen bg-background-default py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">
            Create Your Quotation
          </h1>
          <p className="mt-2 text-text-secondary">
            Fill in the details below to generate a professional quotation
          </p>
        </div>

        {/* Quotation Form */}
        <QuotationForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
