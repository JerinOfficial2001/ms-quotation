import { TEXT } from "@/constants/text";
import { motion } from "framer-motion";
import React from "react";

interface ItemsTableProps {
  items: any[];
  onChange: (items: any[]) => void;
}

export const ItemsTable: React.FC<ItemsTableProps> = ({ items, onChange }) => {
  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };

    // Calculate amounts
    newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    const gstAmount = (newItems[index].amount * newItems[index].gstRate) / 100;
    newItems[index].cgst = gstAmount / 2;
    newItems[index].sgst = gstAmount / 2;
    newItems[index].total = newItems[index].amount + gstAmount;

    onChange(newItems);
  };

  const addNewItem = () => {
    onChange([
      ...items,
      {
        name: "",
        hsn: "",
        gstRate: 18,
        quantity: 1,
        rate: 0,
        amount: 0,
        cgst: 0,
        sgst: 0,
        total: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  // Calculate totals
  const calculateTotals = () => {
    return items.reduce(
      (acc, item) => {
        const amount = item.quantity * item.rate;
        const gst = (amount * item.gstRate) / 100;
        const cgst = gst / 2;
        const sgst = gst / 2;
        const total = amount + gst;

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

  const totals = calculateTotals();

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary-main text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.ITEM}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.HSN_SAC}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.GST_RATE}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.QUANTITY}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.RATE}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.AMOUNT}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.CGST}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.SGST}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                {TEXT.ITEMS.TOTAL}
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={item.hsn}
                    onChange={(e) =>
                      handleItemChange(index, "hsn", e.target.value)
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.gstRate}
                    onChange={(e) =>
                      handleItemChange(index, "gstRate", Number(e.target.value))
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(index, "rate", Number(e.target.value))
                    }
                    className="w-full border-gray-300 rounded-md shadow-sm"
                  />
                </td>
                <td className="px-4 py-3">{item.amount.toFixed(2)}</td>
                <td className="px-4 py-3">{item.cgst.toFixed(2)}</td>
                <td className="px-4 py-3">{item.sgst.toFixed(2)}</td>
                <td className="px-4 py-3">{item.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addNewItem}
          className="px-4 py-2 bg-primary-main text-white rounded-md"
        >
          {TEXT.BUTTONS.ADD_ITEM}
        </motion.button>
      </div>

      {/* Totals Section */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-end items-center">
          <span className="text-gray-700 mr-4">Amount</span>
          <span className="w-32 text-right">₹{totals.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-end items-center">
          <span className="text-gray-700 mr-4">CGST</span>
          <span className="w-32 text-right">₹{totals.cgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-end items-center">
          <span className="text-gray-700 mr-4">SGST</span>
          <span className="w-32 text-right">₹{totals.sgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-end items-center border-t border-gray-300 pt-2">
          <span className="font-medium text-gray-900 mr-4">Total (INR)</span>
          <span className="w-32 text-right font-medium">
            ₹{totals.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
