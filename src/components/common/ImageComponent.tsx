import React from "react";
import CardLayout from "./CardLayout";
import ImageIcon from "@/assets/svgs/ImageIcon";
import { translateText } from "@/helperFunction";
import EditableTypography from "./EditableTypography";
import Button from "./Button";
import Close from "@/assets/svgs/Close";
import { EditOutlined } from "@mui/icons-material";

type Props = {
  src: any;
  isEditable: boolean;
  variant?: "signature";
  onClick?: (file: File | any) => void;
  handleClear?: () => void;
  handleUpdate?: (file: File | any) => void;
};

export default function ImageComponent({
  isEditable,
  src,
  onClick,
  handleClear,
  handleUpdate,
  variant,
}: Props) {
  return (
    <CardLayout
      variant={src ? "transparent" : undefined}
      onClick={onClick}
      className={`${variant != "signature" ? "!w-[270px]" : "!p-0"} ${
        !src && "hover:bg-[var(--border-secondary)] cursor-pointer"
      }  terms-section`}
    >
      <div className="flex items-center justify-center flex-col text-[var(--text-secondary)]">
        {!src ? (
          <>
            <ImageIcon className="text-[var(--icon-color)]" />
            <EditableTypography
              text={
                variant != "signature"
                  ? translateText("bussinessImage.TITLE")
                  : translateText("signatureImage.TITLE")
              }
            />
            <EditableTypography
              text={translateText("bussinessImage.DESCRIPTION")}
            />
            <EditableTypography text={translateText("bussinessImage.TYPE")} />
          </>
        ) : (
          <>
            {src && (
              <img
                className={variant != "signature" ? "" : "h-[120px]"}
                src={src instanceof File ? URL.createObjectURL(src) : src}
                alt=""
              />
            )}
            {variant == "signature" && (
              <EditableTypography
                text={translateText("signatureImage.DESCRIPTION")}
              />
            )}
            {isEditable && (
              <div className="flex items-center w-full ">
                <Button
                  iconPosition="left"
                  icon={<Close />}
                  text={translateText("bussinessImage.REMOVE")}
                  onClick={handleClear}
                />
                <Button
                  iconPosition="left"
                  icon={<EditOutlined fontSize="small" />}
                  variant="file"
                  onClick={handleUpdate}
                  text={translateText("bussinessImage.CHANGE")}
                />
              </div>
            )}
          </>
        )}
      </div>
    </CardLayout>
  );
}
