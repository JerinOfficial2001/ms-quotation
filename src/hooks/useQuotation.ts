import { translateText } from "@/helperFunction";
import { useGlobalStore } from "@/store/useGlobalStore";
import { GET_FROM_STORAGE } from "@/utils/localstorage.service";
import React, { useState } from "react";

type Props = {};

export default function useQuotation() {
  const [tableDatas, settableDatas] = useState({
    columns: {
      item: "Item",
      GST: "GST Rate",
      quantity: "Quantity",
      rate: "Rate",
      amount: "Amount",
      total: "Total",
      action: "Action",
    },
    data: [],
    showGST: false,
  });

  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  const [quotationData, setQuotationData] = useState<any>({
    title: translateText("quotation.TITLE") || "",
    quotationNo: {
      key: translateText("quotation.QUOTATION_NO") || "",
      value: "0100",
    },
    quotationDate: {
      key: translateText("quotation.QUOTATION_DATE") || "",
      value: formattedDate,
    },
    quotationValidTill: {
      key: translateText("quotation.VALID_TILL") || "",
      value: formattedDate,
    },
    logo: "/Full_logo.png",
    signature: "",
    business: translateText("BUSINESS.FROM_SECTION") || "",
    client: translateText("CLIENT.TITLE") || "",
    terms_title: translateText("TERMS_AND_CONDIITION.TITLE") || "",
  });
  const [termsAndConditons, setTermsAndConditons] = useState<any>(
    GET_FROM_STORAGE(translateText("STORAGE.TERMS"))
      ? [...GET_FROM_STORAGE(translateText("STORAGE.TERMS"))]
      : []
  );
  const handleForm = (
    key: string,
    value: string,
    nestedKey?: "key" | "value"
  ) => {
    if (
      key === "title" ||
      key === "logo" ||
      key === "signature" ||
      key == "client" ||
      key == "terms_title" ||
      key == "business"
    ) {
      setQuotationData({
        ...quotationData,
        [key]: value,
      });
    } else {
      setQuotationData({
        ...quotationData,
        [key]: {
          ...quotationData[key as keyof typeof quotationData],
          [nestedKey as any]: value,
        },
      });
    }
  };
  const detailsData = [
    {
      type: "business",
      value: quotationData.business,
      setValue: (text: string) => handleForm("business", text),
    },
    {
      type: "client",
      value: quotationData.client,
      setValue: (text: string) => handleForm("client", text),
    },
  ];
  const handleTableDatas = (
    key: string,
    value: any,
    nestedKey?: string,
    index?: number
  ) => {
    if (nestedKey) {
      settableDatas((prev) => {
        const prevData = [...prev.data];
        let currentObj: any = null;
        if (index == 0 || (index && index > 0)) {
          currentObj = prevData[index];
          currentObj[nestedKey] = value;
        }
        return {
          ...prev,
          [key]:
            key == "columns"
              ? {
                  ...prev[key],
                  [nestedKey as any]: value,
                }
              : index == 0 || (index && index > 0)
              ? prevData
              : [...prev.data, value],
        };
      });
    } else {
      settableDatas((prev) => ({ ...prev, [key]: value }));
    }
  };
  const handleRemoveData = (index: number) => {
    settableDatas((prev) => {
      const tempData = [...prev.data].filter((_, i) => i != index);

      return {
        ...prev,
        data: tempData,
      };
    });
  };
  const handleTerm = (
    key: string | number,
    value?: any,
    nestedIndex?: number | string
  ) => {
    const tempTerms = [...termsAndConditons];
    if (key == "title") {
      if (tempTerms[key as any]) {
        tempTerms[key as any].title = value;
      } else {
        tempTerms.push({
          title: translateText("TERMS_AND_CONDIITION.TITLE") || "",
          conditions: [" "],
        });
      }
    } else if (nestedIndex || nestedIndex == 0) {
      const currentCondition = tempTerms[key as number].conditions;
      if (currentCondition[nestedIndex as number]) {
        currentCondition[nestedIndex as number] = value;
        setTermsAndConditons(tempTerms);
      } else {
        currentCondition.push(value);
      }
    } else {
      tempTerms[key as number].title = value;
    }
    setTermsAndConditons(tempTerms);
  };
  const handleDeleteTerm = (index: number, nestedIndex?: number) => {
    let tempTerms: any = [...termsAndConditons];

    if (nestedIndex) {
      tempTerms[index].conditions = tempTerms[index]?.conditions.filter(
        (_: any, i: number) => i != nestedIndex
      );
    } else {
      tempTerms = tempTerms.filter((_: any, i: number) => i != index);
    }
    setTermsAndConditons(tempTerms);
  };
  return {
    handleRemoveData,
    handleTableDatas,
    tableDatas,
    quotationData,
    handleForm,
    detailsData,
    termsAndConditons,
    handleTerm,
    handleDeleteTerm,
    setTermsAndConditons,
  };
}
