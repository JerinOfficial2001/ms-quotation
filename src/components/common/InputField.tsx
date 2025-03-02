import { FormHelperText } from "@mui/material";
import React from "react";

type Props = {
  variant?: "primary" | "secondary";
  value: any;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
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
}: Props) {
  return (
    <div className="w-full">
      <input
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        className={`${
          className || ""
        } w-full border-b-[1px] border-[var(--border-secondary)] hover:border-[var(--primary)] outline-none`}
        value={value}
        onChange={onChange}
      />
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
