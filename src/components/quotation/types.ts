export interface QuotationData {
  quotationNo: string;
  date: string;
  validTill: string;
  businessDetails: {
    from: BusinessDetails;
    to: BusinessDetails;
  };
  items: QuotationItem[];
}

interface BusinessDetails {
  name: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  pan: string;
}

interface QuotationItem {
  name: string;
  description: string;
  hsn: string;
  gstRate: number;
  quantity: number;
  rate: number;
  amount: number;
  cgst: number;
  sgst: number;
  total: number;
}
