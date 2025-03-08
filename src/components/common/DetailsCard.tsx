import React, { useState } from "react";
import CardLayout from "./CardLayout";
import EditableTypography from "./EditableTypography";
import { translateText } from "@/helperFunction";
import SelectField from "./SelectField";
import { Grid2 } from "@mui/material";
import Button from "./Button";
import { useGlobalStore } from "@/store/useGlobalStore";

type Props = {
  type: "business" | "client";
  value: string;
  editable?: boolean;
  setValue: (value: string) => void;
  data?: any;
  handleSelect: (value: any) => void;
};

export default function DetailsCard({
  setValue,
  value,
  type,
  editable,
  data,
  handleSelect,
}: Props) {
  const [selectedMenu, setselectedMenu] = useState("");
  const { setOpenModal, details } = useGlobalStore();
  return (
    <CardLayout
      className={`flex flex-col h-full ${editable ? "gap-5" : "gap-0"}`}
    >
      <div className="w-auto flex gap-2 items-center">
        <EditableTypography
          variant="title"
          text={value}
          editabeleType={editable ? "text" : undefined}
          setText={(text) => setValue(text)}
        />
        {editable && (
          <EditableTypography
            className="!text-[var(--text-secondary)]"
            text={
              type === "business"
                ? translateText("BUSINESS.DETAIL")
                : translateText("CLIENT.DETAIL")
            }
          />
        )}
      </div>
      {editable && (
        <SelectField
          buttonOnclick={() => setOpenModal(type)}
          options={details
            .filter((elem: any) => elem.type == type)
            .map((elem: any) => ({ label: elem.name, value: elem.name }))}
          onChange={(e: any) => {
            handleSelect(e.target.value);
            setselectedMenu(e.target.value);
          }}
          value={selectedMenu}
          buttonName={
            type == "business"
              ? translateText("BUSINESS.BUTTON")
              : translateText("CLIENT.BUTTON")
          }
        />
      )}
      <div
        style={{
          boxShadow: editable ? "0px 1px 2px 0px var(--shadow)" : "none",
        }}
        className={`${
          editable ? "bg-[var(--white)] gap-5 p-4" : "gap-0"
        } rounded-lg w-full flex flex-col  `}
      >
        {data ? (
          <>
            {editable && (
              <EditableTypography text={translateText("BUSINESS_DETAILS")} />
            )}
            <Grid2 container spacing={3}>
              {editable && (
                <Grid2 size={4}>
                  <EditableTypography
                    variant={"small"}
                    className="text-[var(--border-primary)]"
                    text={translateText("BUSINESS_NAME")}
                  />
                </Grid2>
              )}
              <Grid2 size={8}>
                <EditableTypography
                  variant="small"
                  className={`text-[var(--border-primary)] ${
                    !editable && "font-bold"
                  }`}
                  text={data.name}
                />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={3}>
              {editable && (
                <Grid2 size={4}>
                  <EditableTypography
                    variant="small"
                    className="text-[var(--border-primary)]"
                    text={translateText("BUSINESS_ADDRESS")}
                  />
                </Grid2>
              )}
              <Grid2 size={8}>
                <EditableTypography
                  variant="small"
                  className="text-[var(--border-primary)]"
                  text={data.address}
                />
                {data.additional && (
                  <EditableTypography
                    variant="small"
                    className="text-[var(--border-primary)]"
                    text={data.additional}
                  />
                )}
              </Grid2>
            </Grid2>
          </>
        ) : (
          editable && (
            <div className="flex flex-col w-full items-center justify-center gap-2">
              <EditableTypography
                text={translateText("BUSINESS_INFO")}
                variant="placeholder"
              />
              <EditableTypography
                text={translateText(`OR`)}
                variant="placeholder"
              />
              <Button
                onClick={() => {
                  setOpenModal(type);
                }}
                variant="primary"
                text={translateText(`${type.toUpperCase()}.BUTTON`)}
              />
            </div>
          )
        )}
      </div>
    </CardLayout>
  );
}
