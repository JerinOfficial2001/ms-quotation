import { FormHelperText, IconButton } from "@mui/material";
import React from "react";
import EditableTypography from "./EditableTypography";
import { Clear } from "@mui/icons-material";

type Props = {
  variant?: "primary" | "secondary";
  value?: any;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  showDelete?: boolean;
  isEditable?: boolean;
  handleDelete?: () => void;
  label?: string;
  type?: string;
  accept?: string;
};

export default function InputField({
  variant,
  value,
  className,
  onChange,
  name,
  placeholder,
  helperText,
  disabled,
  error,
  label,
  handleDelete,
  showDelete,
  isEditable,
  type,
  accept,
}: Props) {
  return (
    <div className="w-full">
      {label && <EditableTypography text={label} />}
      <div className="flex items-center">
        <input
          accept={accept}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          className={`${
            className || ""
          } w-full border-b-[1px] border-[var(--border-secondary)] hover:border-[var(--primary)] outline-none`}
          value={value}
          onChange={onChange}
        />

        {showDelete && isEditable && (
          <IconButton size="small" onClick={handleDelete}>
            <Clear
              sx={{
                color: "red",
              }}
            />
          </IconButton>
        )}
      </div>
      {helperText && (
        <FormHelperText
          sx={{
            color: error ? "var(--helperText)" : "var(--text-secondary)",
            fontSize: "0.75rem",
            lineHeight: "1rem",
            marginTop: "0.25rem",
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}
