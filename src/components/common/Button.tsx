import React, { useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  variant?: "primary" | "secondary" | "file";
  text: string;
  className?: string;
  onClick?: (file: File | any | null) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant,
  text,
  className,
  onClick,
  disabled,
  loading,
  icon,
  iconPosition,
  type,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const clearFileInput = () => {
    if (fileRef?.current) {
      fileRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (variant === "file" && fileRef?.current) {
      clearFileInput();
      fileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (onClick) {
      onClick(file);
    }
  };
  if (!variant || variant == "file") {
    return (
      <>
        <button
          type={type || "button"}
          disabled={disabled}
          onClick={variant == "file" && onClick ? handleClick : onClick}
          className={`${
            className || ""
          } flex items-center justify-center px-4 py-2 rounded-lg `}
        >
          {iconPosition === "left" && icon}
          {loading ? "Loading..." : text}
          {iconPosition === "right" && icon}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </>
    );
  } else if (variant == "primary") {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type={type || "button"}
          disabled={disabled}
          onClick={onClick}
          className={`${
            className || ""
          } flex items-center justify-center px-4 py-2 rounded-lg bg-[--primary] text-[--white] hover:bg-[var(--icon-color)] `}
        >
          {iconPosition === "left" && icon}
          {loading ? "Loading..." : text}
          {iconPosition === "right" && icon}
        </motion.button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </>
    );
  } else if (variant == "secondary") {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type={type || "button"}
          disabled={disabled}
          onClick={onClick}
          className={`${
            className || ""
          } w-1/2 border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)] rounded-md`}
        >
          {iconPosition === "left" && icon}
          {loading ? "Loading..." : text}
          {iconPosition === "right" && icon}
        </motion.button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </>
    );
  }
}
