"use client";
import BaseLayout from "@/layout/BaseLayout";
import React, { useState } from "react";
import { translateText } from "@/helperFunction";
import EditableTypography from "../common/EditableTypography";
import { Grid2 } from "@mui/material";
import CardLayout from "../common/CardLayout";
import InputField from "../common/InputField";
import ImageIcon from "@/assets/svgs/ImageIcon";
import Button from "../common/Button";
import DetailsCard from "../common/DetailsCard";
import { Close, EditOutlined } from "@mui/icons-material";
import CommonTable from "../common/CommonTable";

type Props = {};

export default function Quotation({}: Props) {
  const [quotationData, setQuotationData] = useState<any>({
    title: translateText("quotation.TITLE") || "",
    quotationNo: {
      key: translateText("quotation.QUOTATION_NO") || "",
      value: "",
    },
    quotationDate: {
      key: translateText("quotation.QUOTATION_DATE") || "",
      value: "",
    },
    quotationValidTill: {
      key: translateText("quotation.VALID_TILL") || "",
      value: "",
    },
    logo: "",
    business: translateText("BUSINESS.FROM_SECTION") || "",
    client: translateText("CLIENT.TITLE") || "",
  });

  const handleForm = (
    key: string,
    value: string,
    nestedKey?: "key" | "value"
  ) => {
    if (
      key === "title" ||
      key === "logo" ||
      key == "client" ||
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
  return (
    <BaseLayout>
      <div
        style={{
          boxShadow: "0px 1px 2px 0px var(--shadow)",
        }}
        className="bg-[var(--white)] rounded-xl p-10 w-full h-full flex flex-col justify-center items-center gap-10"
      >
        <EditableTypography
          variant="header"
          text={quotationData.title}
          editabeleType="text"
          setText={(text) => handleForm("title", text)}
        />
        <Grid2 spacing={3} rowGap={5} container sx={{ width: "100%" }}>
          <Grid2
            size={{
              md: 6,
              sm: 6,
              xs: 12,
            }}
          >
            <Grid2 spacing={7} container className="w-full mb-3">
              <Grid2 size={5}>
                <EditableTypography
                  text={quotationData.quotationNo.key}
                  editabeleType="text"
                  setText={(text) => handleForm("quotationNo", text, "key")}
                />
              </Grid2>
              <Grid2 size={7}>
                <InputField
                  value={quotationData.quotationNo.key}
                  onChange={(e) =>
                    handleForm("quotationNo", e.target.value, "value")
                  }
                  helperText="Latest"
                />
              </Grid2>
            </Grid2>
            <Grid2 spacing={7} container className="w-full mb-7">
              <Grid2 size={5}>
                <EditableTypography
                  text={quotationData.quotationDate.key}
                  editabeleType="text"
                  setText={(text) => handleForm("quotationDate", text, "key")}
                />
              </Grid2>
              <Grid2 size={7}>
                <InputField
                  value={quotationData.quotationDate.key}
                  onChange={(e) =>
                    handleForm("quotationDate", e.target.value, "value")
                  }
                />
              </Grid2>
            </Grid2>
            <Grid2 spacing={7} container className="w-full mb-7">
              <Grid2 size={5}>
                <EditableTypography
                  text={quotationData.quotationValidTill.key}
                  editabeleType="text"
                  setText={(text) =>
                    handleForm("quotationValidTill", text, "key")
                  }
                />
              </Grid2>
              <Grid2 size={7}>
                <InputField
                  value={quotationData.quotationValidTill.key}
                  onChange={(e) =>
                    handleForm("quotationValidTill", e.target.value, "value")
                  }
                />
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2
            size={{
              md: 6,
              sm: 6,
              xs: 12,
            }}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CardLayout
              variant={quotationData.logo ? "transparent" : undefined}
              onClick={(file) => {
                handleForm("logo", file as any);
              }}
              className={`!w-[270px] ${
                !quotationData.logo &&
                "hover:bg-[var(--border-secondary)] cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-center gap-2 flex-col text-[var(--text-secondary)]">
                {!quotationData.logo ? (
                  <>
                    <ImageIcon className="text-[var(--icon-color)]" />
                    <EditableTypography
                      text={translateText("bussinessImage.TITLE")}
                    />
                    <EditableTypography
                      text={translateText("bussinessImage.DESCRIPTION")}
                    />
                    <EditableTypography
                      text={translateText("bussinessImage.TYPE")}
                    />
                  </>
                ) : (
                  <>
                    {quotationData.logo && (
                      <img
                        src={
                          quotationData.logo instanceof File
                            ? URL.createObjectURL(quotationData?.logo)
                            : ""
                        }
                        alt=""
                      />
                    )}
                    <div className="flex items-center w-full ">
                      <Button
                        iconPosition="left"
                        icon={<Close />}
                        text={translateText("bussinessImage.REMOVE")}
                        onClick={() => {
                          handleForm("logo", "");
                        }}
                      />
                      <Button
                        iconPosition="left"
                        icon={<EditOutlined fontSize="small" />}
                        variant="file"
                        onClick={(file) => {
                          handleForm("logo", file as any);
                        }}
                        text={translateText("bussinessImage.CHANGE")}
                      />
                    </div>
                  </>
                )}
              </div>
            </CardLayout>
          </Grid2>
          {detailsData.map((data, index) => (
            <Grid2
              size={{
                md: 6,
                sm: 6,
                xs: 12,
              }}
              key={index}
            >
              <DetailsCard
                type={data.type as any}
                value={data.value}
                setValue={data.setValue}
              />
            </Grid2>
          ))}
        </Grid2>
        <CommonTable
          data={[]}
          columnLabels={{
            name: "Item",
            Quantity: "Quantity",
            Rate: "Rate",
            Amount: "Amount",
            Total: "Total",
          }}
        />
      </div>
    </BaseLayout>
  );
}
