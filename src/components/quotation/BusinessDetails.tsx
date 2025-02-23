import { TEXT } from "@/constants/text";
import React from "react";

interface BusinessDetailsProps {
  type: "from" | "to";
  data: {
    name: string;
    gstin: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    email: string;
    pan: string;
  };
  onChange: (data: any) => void;
}

export const BusinessDetails: React.FC<BusinessDetailsProps> = ({
  type,
  data,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* From Section */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">
          {TEXT.BUSINESS.FROM_SECTION}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {type === "from" ? "Business Name" : "Client Name"}
            </label>
            <input
              type="text"
              name="name"
              value={data?.name || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {TEXT.BUSINESS.GSTIN}
            </label>
            <input
              type="text"
              name="gstin"
              value={data.gstin}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {TEXT.BUSINESS.ADDRESS}
            </label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* To Section */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">
          {TEXT.BUSINESS.TO_SECTION}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {TEXT.BUSINESS.CLIENT_NAME}
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {TEXT.BUSINESS.GSTIN}
            </label>
            <input
              type="text"
              name="gstin"
              value={data.gstin}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {TEXT.BUSINESS.ADDRESS}
            </label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
