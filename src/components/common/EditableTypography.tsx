import { FormHelperText } from "@mui/material";
import React, { useState } from "react";

type Props = {
  variant?: "header" | "text" | "title" | "small" | "placeholder";
  text: string;
  className?: string;
  editabeleType?: "input" | "text";
  placeholder?: string;
  type?: string;
  showRupee?: boolean;
  showPercent?: boolean;
  setText?: (text: string) => void;
};

export default function EditableTypography({
  variant,
  text,
  className,
  editabeleType,
  setText,
  placeholder,
  type,
  showRupee,
  showPercent,
}: Props) {
  const [isEditable, setisEditable] = useState(false);
  const handleEnableEdit = () => {
    setisEditable(true);
  };
  const handleDisableEdit = () => {
    setisEditable(false);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText && setText(e.target.value);
  };
  if (isEditable) {
    return (
      <div>
        {showRupee && "₹ "}
        <input
          type={type}
          placeholder={placeholder}
          className={`${
            className || ""
          } border-b-[1px] border-[var(--border-primary)] outline-none`}
          value={text}
          onBlur={text ? handleDisableEdit : undefined}
          onChange={handleTextChange}
        />
        {showPercent && "%"}

        {!text && (
          <FormHelperText
            sx={{
              color: "var(--helperText)",
              fontSize: "0.75rem",
              lineHeight: "1rem",
              marginTop: "0.25rem",
            }}
          >
            required*
          </FormHelperText>
        )}
      </div>
    );
  } else if (!variant) {
    return (
      <p
        onClick={editabeleType ? handleEnableEdit : undefined}
        className={`${className || ""} ${
          editabeleType &&
          "cursor-pointer border-b-[1px] border-dashed border-[var(--border-primary)]"
        }`}
      >
        {showRupee && "₹"} {placeholder && !text ? placeholder : text}
        {showPercent && "%"}
      </p>
    );
  } else if (variant == "header") {
    return (
      <h1
        onClick={editabeleType ? handleEnableEdit : undefined}
        className={`${className || ""} ${
          editabeleType &&
          "cursor-pointer border-b-[1px] border-dashed border-[var(--border-primary)]"
        } text-[2rem] font-bold text-[var(--text-header)]`}
      >
        {text}
      </h1>
    );
  } else if (variant == "title") {
    return (
      <h1
        onClick={editabeleType ? handleEnableEdit : undefined}
        className={`${className || ""} ${
          editabeleType &&
          "cursor-pointer border-b-[1px] border-dashed border-[var(--border-primary)]"
        } text-[1.25rem] font-bold text-[var(--text-header)]`}
      >
        {text}
      </h1>
    );
  } else if (variant == "small") {
    return (
      <p
        onClick={editabeleType ? handleEnableEdit : undefined}
        className={`${className || ""} ${
          editabeleType &&
          "cursor-pointer border-b-[1px] border-dashed border-[var(--border-primary)]"
        } text-[16px]`}
      >
        {text}
      </p>
    );
  } else if (variant == "placeholder") {
    return (
      <p
        onClick={editabeleType ? handleEnableEdit : undefined}
        className={`text-[14px] text-[var(--border-primary)]`}
      >
        {text}
      </p>
    );
  }
}
