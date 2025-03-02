import React from "react";
import Button from "./Button";
import { Select } from "@mui/material";

type Props = {
  buttonName?: string;
  buttonOnclick?: () => void;
};

export default function SelectField({ buttonName, buttonOnclick }: Props) {
  return (
    <Select
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
      <option className="p-3 hover:bg-[--background]" value="1">
        Option 1
      </option>

      {buttonName && (
        <div
          className="p-3 flex justify-center items-center"
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
