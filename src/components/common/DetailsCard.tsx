import React from "react";
import CardLayout from "./CardLayout";
import EditableTypography from "./EditableTypography";
import { translateText } from "@/helperFunction";
import SelectField from "./SelectField";
import { Grid2 } from "@mui/material";

type Props = {
  type: "business" | "client";
  value: string;
  setValue: (value: string) => void;
};

export default function DetailsCard({ setValue, value, type }: Props) {
  return (
    <CardLayout className="flex gap-5 flex-col">
      <div className="w-auto flex gap-2 items-center">
        <EditableTypography
          variant="title"
          text={value}
          editabeleType="text"
          setText={(text) => setValue(text)}
        />
        <EditableTypography
          className="!text-[var(--text-secondary)]"
          text={
            type === "business"
              ? translateText("BUSINESS.DETAIL")
              : translateText("CLIENT.DETAIL")
          }
        />
      </div>
      <SelectField
        buttonName={
          type == "business"
            ? translateText("BUSINESS.BUTTON")
            : translateText("CLIENT.BUTTON")
        }
      />
      <div
        style={{
          boxShadow: "0px 1px 2px 0px var(--shadow)",
        }}
        className="rounded-lg p-4 bg-[var(--white)] w-full flex flex-col gap-5 "
      >
        <EditableTypography text={translateText("BUSINESS_DETAILS")} />
        <Grid2 container spacing={3}>
          <Grid2 size={3}>
            <EditableTypography
              variant="small"
              className="text-[var(--border-primary)]"
              text={translateText("BUSINESS_NAME")}
            />
          </Grid2>
          <Grid2 size={9}>
            <EditableTypography
              variant="small"
              className="text-[var(--border-primary)]"
              text={translateText("BUSINESS_NAME")}
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={3}>
          <Grid2 size={3}>
            <EditableTypography
              variant="small"
              className="text-[var(--border-primary)]"
              text={translateText("BUSINESS_ADDRESS")}
            />
          </Grid2>
          <Grid2 size={9}>
            <EditableTypography
              variant="small"
              className="text-[var(--border-primary)]"
              text={translateText("BUSINESS_ADDRESS")}
            />
          </Grid2>
        </Grid2>
      </div>
    </CardLayout>
  );
}
