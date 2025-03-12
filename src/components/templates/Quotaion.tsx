import React, { useState } from "react";
import EditableTypography from "../common/EditableTypography";
import { translateText } from "@/helperFunction";
import useQuotation from "@/hooks/useQuotation";
import { Grid2 } from "@mui/material";
import InputField from "../common/InputField";
import CardLayout from "../common/CardLayout";
import Button from "../common/Button";
import CommonTable from "../common/CommonTable";
import DetailsCard from "../common/DetailsCard";
import { useGlobalStore } from "@/store/useGlobalStore";
import ImageComponent from "../common/ImageComponent";
import { POST_TO_STORAGE } from "@/utils/localstorage.service";
import toast from "react-hot-toast";
import ListInputs from "../common/ListInputs";

type Props = {
  isEditable?: boolean;
};

export default function QuotationTemplate({ isEditable }: Props) {
  const {
    handleRemoveData,
    handleTableDatas,
    tableDatas,
    quotationData,
    handleForm,
    detailsData,
    handleTerm,
    termsAndConditons,
    setTermsAndConditons,
    handleDeleteTerm,
  } = useQuotation();
  const [allDetails, setallDetails] = useState<any>({
    client: null,
    business: {
      name: "Microgenesis Software Solutions",
      address: "No 3/49A,North Subdistrict,",
      additional_line1: "Coimbatore,",
      additional_line2: "Tamil Nadu, India-641110",
      type: "business",
    },
  });
  const { details } = useGlobalStore();
  const amount = tableDatas.data?.reduce(
    (total: any, item: any) => total + item.amount,
    0
  );
  const total = tableDatas.data?.reduce(
    (total, item: any) => total + item.total,
    0
  );
  return (
    <div
      style={{
        boxShadow: isEditable ? "0px 1px 2px 0px var(--shadow)" : "none",
      }}
      className={`${
        isEditable ? "items-center" : "items-start"
      } relative bg-[var(--white)] rounded-xl p-[10px] sm:p-[60px] max-w-[1024px] h-full flex flex-col justify-center gap-10`}
    >
      <EditableTypography
        variant="header"
        className={!isEditable ? "!text-[var(--primary)] !font-[500]" : ""}
        text={quotationData.title}
        editabeleType={isEditable ? "text" : undefined}
        setText={(text) => handleForm("title", text)}
      />
      <Grid2
        spacing={3}
        container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid2
          size={{
            md: isEditable ? 6 : 5,
            sm: isEditable ? 6 : 5,
            xs: 12,
          }}
        >
          <Grid2 container spacing={isEditable ? 4 : 0} className="w-full mb-3">
            <Grid2 size={5}>
              <EditableTypography
                text={
                  quotationData.quotationNo.key + `${!isEditable ? " #" : ""}`
                }
                editabeleType={isEditable ? "text" : undefined}
                setText={(text) => handleForm("quotationNo", text, "key")}
              />
            </Grid2>
            <Grid2 size={7}>
              <InputField
                className={!isEditable ? "!border-none" : ""}
                value={quotationData.quotationNo.value}
                onChange={(e) =>
                  handleForm("quotationNo", e.target.value, "value")
                }
                helperText={isEditable ? "Latest" : ""}
              />
            </Grid2>
          </Grid2>
          <Grid2
            spacing={isEditable ? 4 : 0}
            container
            className={`w-full ${isEditable ? "mb-7" : "mb-3"}`}
          >
            <Grid2 size={5}>
              <EditableTypography
                text={quotationData.quotationDate.key}
                editabeleType={isEditable ? "text" : undefined}
                setText={(text) => handleForm("quotationDate", text, "key")}
              />
            </Grid2>
            <Grid2 size={7}>
              <InputField
                className={!isEditable ? "!border-none" : ""}
                value={quotationData.quotationDate.value}
                onChange={(e) =>
                  handleForm("quotationDate", e.target.value, "value")
                }
              />
            </Grid2>
          </Grid2>
          <Grid2 spacing={isEditable ? 4 : 0} container className="w-full mb-7">
            <Grid2 size={5}>
              <EditableTypography
                text={quotationData.quotationValidTill.key}
                editabeleType={isEditable ? "text" : undefined}
                setText={(text) =>
                  handleForm("quotationValidTill", text, "key")
                }
              />
            </Grid2>
            <Grid2 size={7}>
              <InputField
                className={!isEditable ? "!border-none" : ""}
                value={quotationData.quotationValidTill.value}
                onChange={(e) =>
                  handleForm("quotationValidTill", e.target.value, "value")
                }
              />
            </Grid2>
          </Grid2>
        </Grid2>
        {!isEditable && (
          <Grid2
            size={{
              md: 6,
              sm: 6,
              xs: 12,
            }}
          ></Grid2>
        )}
        <Grid2
          size={{
            md: 6,
            sm: 6,
            xs: 12,
          }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: isEditable ? "center" : "flex-start",
            position: isEditable ? "static" : "absolute",
            top: 30,
            right: 10,
          }}
        >
          {(quotationData.logo || isEditable) && (
            <ImageComponent
              onClick={(file) => {
                handleForm("logo", file as any);
              }}
              handleClear={() => {
                handleForm("logo", "");
              }}
              handleUpdate={(file) => {
                handleForm("logo", file as any);
              }}
              isEditable={isEditable || false}
              src={quotationData.logo}
            />
          )}
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
              handleSelect={(selectedItem) =>
                setallDetails((prev: any) => ({
                  ...prev,
                  [data.type]: details.find(
                    (elem: any) => elem.name == selectedItem
                  ),
                }))
              }
              data={
                (allDetails.client || allDetails.business) && data.type
                  ? allDetails[data.type]
                  : null
              }
              editable={isEditable}
              type={data.type as any}
              value={data.value}
              setValue={data.setValue}
            />
          </Grid2>
        ))}
      </Grid2>
      <div className="w-[100%] overflow-x-auto">
        <CommonTable
          editable={isEditable}
          handleTableDatas={handleTableDatas}
          handleRemoveData={handleRemoveData}
          data={tableDatas.data}
          columnLabels={tableDatas.columns}
        />
      </div>
      {isEditable && (
        <div className="w-full gap-3 flex items-center">
          <Button
            onClick={() => {
              handleTableDatas(
                "data",
                {
                  item: "",
                  GST: 0,
                  quantity: 1,
                  rate: 1,
                  amount: 1,
                  total: 1,
                },
                "nestedKey"
              );
            }}
            className="w-1/2 border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)]"
            text={translateText("BUTTONS.ADD_ITEM")}
          />
          <Button
            onClick={() => {
              if (tableDatas.showGST) {
                handleTableDatas("showGST", false);
                handleTableDatas("columns", {
                  item: "Item",
                  GST: "GST Rate",
                  quantity: "Quantity",
                  rate: "Rate",
                  amount: "Amount",
                  total: "Total",
                  action: "",
                });
              } else {
                handleTableDatas("showGST", true);
                handleTableDatas("columns", "CGST", "cgst");
                handleTableDatas("columns", "SGST", "sgst");
              }
            }}
            className="w-1/2 border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)]"
            text={
              tableDatas.showGST
                ? translateText("BUTTONS.DISABLE_GST")
                : translateText("BUTTONS.ENABLE_GST")
            }
          />
        </div>
      )}
      <div className="w-full flex items-center justify-end ">
        <div className="w-full sm:w-[40%] flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
            <EditableTypography text="Amount" />
            <EditableTypography text={`₹${amount}.00`} className="!font-bold" />
          </div>
          <div className="w-full flex items-center justify-between">
            <EditableTypography text="CGST" />
            <EditableTypography text="₹0.00" className="!font-bold" />
          </div>
          <div className="w-full flex items-center justify-between">
            <EditableTypography text="SGST" />
            <EditableTypography text="₹0.00" className="!font-bold" />
          </div>
          <div className="border-t-2 border-b-2 pt-4 pb-4 w-full flex items-center justify-between">
            <EditableTypography variant="title" text="Total" />
            <EditableTypography variant="title" text={`₹${total}.00`} />
          </div>

          {(quotationData.signature || isEditable) && (
            <ImageComponent
              variant="signature"
              onClick={(file) => {
                handleForm("signature", file as any);
              }}
              handleClear={() => {
                handleForm("signature", "");
              }}
              handleUpdate={(file) => {
                handleForm("signature", file as any);
              }}
              isEditable={isEditable || false}
              src={quotationData.signature}
            />
          )}
        </div>
      </div>
      {isEditable && (
        <div className="w-full gap-3 flex items-center justify-center">
          {termsAndConditons.length == 0 && (
            <Button
              onClick={() => {
                handleTerm("title");
              }}
              className="w-[-webkit-fill-available] border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)]"
              text={translateText("TERMS_AND_CONDIITION.NEW_GROUP")}
            />
          )}
          <Button
            onClick={() => {}}
            className="w-[-webkit-fill-available] border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)]"
            text={translateText("BUTTONS.ADDITION_INFO")}
          />
        </div>
      )}

      {termsAndConditons.length > 0 && (
        <ListInputs
          addChildButtonName={translateText("TERMS_AND_CONDIITION.NEW_TERM")}
          addGroupButtonName={translateText("TERMS_AND_CONDIITION.NEW_GROUP")}
          handleSave={() => {
            POST_TO_STORAGE(termsAndConditons, translateText("STORAGE.TERMS"));
            toast.success("Terms stored to storage");
          }}
          datas={termsAndConditons}
          setDatas={setTermsAndConditons}
          defaultTitle={translateText("TERMS_AND_CONDIITION.TITLE")}
          isEditable={isEditable}
        />
      )}
    </div>
  );
}
