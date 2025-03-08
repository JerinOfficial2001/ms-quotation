import React from "react";
import Button from "./Button";
import { MenuItem, Select } from "@mui/material";

type Props = {
  buttonName?: string;
  buttonOnclick?: () => void;
  value: any;
  onChange: any;
  options: {
    label: string;
    value: any;
  }[];
};

export default function SelectField({
  buttonName,
  buttonOnclick,
  value,
  onChange,
  options,
}: Props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <Select
      onChange={onChange}
      value={value}
      MenuProps={MenuProps}
      size="small"
      sx={{
        background: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          outline: "none",
        },

        borderRadius: "10px",
        boxShadow: "0px 1px 2px 0px var(--shadow)",
        "&:hover": {
          border: "1px solid var(--primary)",
        },
      }}
    >
      {options?.map((elem: any, index: number) => {
        return (
          <MenuItem
            key={index}
            className="p-3 hover:bg-[--background]"
            value={elem.value}
          >
            {elem.label}
          </MenuItem>
        );
      })}

      {buttonName && (
        <div
          className="bg-white p-3 sticky bottom-0 flex justify-center items-center"
          style={{
            boxShadow: "0px -10px 10px 0px var(--shadow)",
          }}
        >
          <Button variant="primary" text={buttonName} onClick={buttonOnclick} />
        </div>
      )}
    </Select>
  );
}
