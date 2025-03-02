import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: (file: File | null) => void;
  variant?: "transparent";
};

export default function CardLayout({
  variant,
  children,
  className,
  onClick,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const clearFileInput = () => {
    if (fileRef?.current) {
      fileRef.current.value = "";
    }
  };
  const handleClick = () => {
    if (fileRef?.current) {
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

  return (
    <div
      style={{
        boxShadow:
          variant == "transparent" ? "none" : "0px 1px 2px 0px var(--shadow)",
      }}
      className={`${className || ""} ${
        variant == "transparent" ? "bg-transparent" : "bg-[--background]"
      } w-full p-5 rounded-lg `}
      onClick={onClick && variant != "transparent" ? handleClick : undefined}
    >
      {children}
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
