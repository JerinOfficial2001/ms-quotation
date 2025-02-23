import jsPDF from "jspdf";

export const generatePDF = (quotationData: any) => {
  const doc = new jsPDF();

  // Add company logo
  // doc.addImage(logo, 'PNG', 10, 10, 50, 50);

  // Add title
  doc.setFontSize(20);
  doc.text("Quotation", 105, 20, { align: "center" });

  // Add quotation details
  doc.setFontSize(12);
  doc.text(`Quotation No: ${quotationData.quotationNo}`, 10, 40);
  doc.text(`Date: ${quotationData.date}`, 10, 50);

  // Add business details
  doc.text("From:", 10, 70);
  doc.text(quotationData.businessDetails.from.name, 10, 80);
  doc.text(quotationData.businessDetails.from.address, 10, 90);

  doc.text("To:", 10, 110);
  doc.text(quotationData.businessDetails.to.name, 10, 120);
  doc.text(quotationData.businessDetails.to.address, 10, 130);

  // Add items table
  const tableTop = 150;
  const headers = ["Item", "HSN/SAC", "Qty", "Rate", "Amount", "GST", "Total"];
  let currentY = tableTop;

  // Draw table headers
  headers.forEach((header, i) => {
    doc.text(header, 10 + i * 25, currentY);
  });

  // Draw items
  quotationData.items.forEach((item: any, index: number) => {
    currentY += 10;
    doc.text(item.name, 10, currentY);
    doc.text(item.hsn, 35, currentY);
    doc.text(item.quantity.toString(), 60, currentY);
    doc.text(item.rate.toString(), 85, currentY);
    doc.text(item.amount.toString(), 110, currentY);
    doc.text(item.gstRate + "%", 135, currentY);
    doc.text(item.total.toString(), 160, currentY);
  });

  // Save the PDF
  doc.save(`Quotation-${quotationData.quotationNo}.pdf`);
};
