import {
  Document,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { QuotationData } from "./types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  title: {
    color: "#7E3AF2",
    fontSize: 24,
    fontWeight: "bold",
  },
  statusBadge: {
    backgroundColor: "#F59E0B",
    color: "white",
    padding: "4px 12px",
    borderRadius: 4,
    fontSize: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    width: 100,
    color: "#666666",
  },
  businessSection: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
  },
  businessBox: {
    flex: 1,
    backgroundColor: "#F3F0FF",
    padding: 20,
    borderRadius: 8,
  },
  businessTitle: {
    color: "#7E3AF2",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#7E3AF2",
    color: "white",
    padding: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    padding: 8,
  },
  tableCell: {
    flex: 1,
  },
  tableCellNarrow: {
    width: 60,
  },
  totalsSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  totalLabel: {
    width: 100,
    textAlign: "right",
    marginRight: 20,
  },
  totalValue: {
    width: 80,
    textAlign: "right",
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    marginTop: 8,
    paddingTop: 8,
    fontWeight: "bold",
  },
});

export const QuotationPDF = ({ data }: { data: QuotationData }) => {
  // Calculate totals
  const calculateTotals = (
    items: { quantity: any; rate: any; gstRate: any }[]
  ) => {
    return items.reduce(
      (acc, item) => {
        const amount = item.quantity * item.rate;
        const gst = (amount * item.gstRate) / 100;
        const cgst = gst / 2;
        const sgst = gst / 2;
        const total = amount + cgst + sgst;

        return {
          amount: acc.amount + amount,
          cgst: acc.cgst + cgst,
          sgst: acc.sgst + sgst,
          total: acc.total + total,
        };
      },
      { amount: 0, cgst: 0, sgst: 0, total: 0 }
    );
  };

  const totals = calculateTotals(data.items);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Quotation</Text>
          <Text style={styles.statusBadge}>Created</Text>
        </View>

        {/* Quotation Details */}
        <View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quotation No #</Text>
            <Text>{data.quotationNo}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quotation Date</Text>
            <Text>{data.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Valid Till Date</Text>
            <Text>{data.validTill}</Text>
          </View>
        </View>

        {/* Business Details */}
        <View style={styles.businessSection}>
          <View style={styles.businessBox}>
            <Text style={styles.businessTitle}>Quotation From</Text>
            <Text>{data.businessDetails.from.name}</Text>
            <Text>{data.businessDetails.from.address}</Text>
            <Text>India</Text>
          </View>
          <View style={styles.businessBox}>
            <Text style={styles.businessTitle}>Quotation For</Text>
            <Text>{data.businessDetails.to.name}</Text>
            <Text>{data.businessDetails.to.address}</Text>
            <Text>India</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellNarrow}>Item</Text>
            <Text style={styles.tableCellNarrow}>GST Rate</Text>
            <Text style={styles.tableCellNarrow}>Quantity</Text>
            <Text style={styles.tableCell}>Rate</Text>
            <Text style={styles.tableCell}>Amount</Text>
            <Text style={styles.tableCell}>CGST</Text>
            <Text style={styles.tableCell}>SGST</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellNarrow}>{item.name}</Text>
              <Text style={styles.tableCellNarrow}>{item.gstRate}%</Text>
              <Text style={styles.tableCellNarrow}>{item.quantity}</Text>
              <Text style={styles.tableCell}>₹{item.rate}</Text>
              <Text style={styles.tableCell}>₹{item.quantity * item.rate}</Text>
              <Text style={styles.tableCell}>
                ₹{((item.quantity * item.rate * item.gstRate) / 200).toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>
                ₹{((item.quantity * item.rate * item.gstRate) / 200).toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>
                ₹
                {(item.quantity * item.rate * (1 + item.gstRate / 100)).toFixed(
                  2
                )}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Amount</Text>
            <Text style={styles.totalValue}>₹{totals.amount.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>CGST</Text>
            <Text style={styles.totalValue}>₹{totals.cgst.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SGST</Text>
            <Text style={styles.totalValue}>₹{totals.sgst.toFixed(2)}</Text>
          </View>
          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.totalLabel}>Total (INR)</Text>
            <Text style={styles.totalValue}>₹{totals.total.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const generatePDF = async (formData: QuotationData) => {
  const blob = await pdf(<QuotationPDF data={formData} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Quotation-${formData.quotationNo}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
