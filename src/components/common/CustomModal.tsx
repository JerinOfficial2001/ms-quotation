"use client";
import { useGlobalStore } from "@/store/useGlobalStore";
import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import EditableTypography from "./EditableTypography";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { setDataToLocalStorage } from "@/utils/localstorage.service";

export default function CustomModal() {
  const {
    openModal,
    setOpenModal,
    fromAndTo,
    handleChangeFormData,
    handleAddDetails,
    handleReset,
  } = useGlobalStore();
  useEffect(() => {
    if (openModal == "client" || openModal == "business") {
      handleChangeFormData("type", openModal);
    }
  }, [openModal]);
  const [backup_file, setbackup_file] = useState(null);
  return (
    <Modal
      open={!!openModal}
      onClose={() => setOpenModal("")}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="p-5 bg-[var(--white)] rounded-lg flex flex-col w-[320px] gap-2 items-center">
        <EditableTypography
          variant="title"
          text={"ADD " + openModal.toLocaleUpperCase()}
        />
        {openModal == "client" || openModal == "business" ? (
          <>
            <InputField
              className="p-2 rounded-lg bg-[var(--border-secondary)]"
              label="Name"
              value={fromAndTo.name}
              onChange={(e) => {
                handleChangeFormData("name", e.target.value);
              }}
            />
            <InputField
              className="p-2 rounded-lg bg-[var(--border-secondary)]"
              label="Address"
              value={fromAndTo.address}
              onChange={(e) => {
                handleChangeFormData("address", e.target.value);
              }}
            />
            <InputField
              className="p-2 rounded-lg bg-[var(--border-secondary)]"
              label="Address line 1"
              value={fromAndTo?.additional_line1}
              onChange={(e) => {
                handleChangeFormData("additional_line1", e.target.value);
              }}
            />
            <InputField
              className="p-2 rounded-lg bg-[var(--border-secondary)]"
              label="District"
              value={fromAndTo.additional_line2}
              onChange={(e) => {
                handleChangeFormData("additional_line2", e.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (fromAndTo.address && fromAndTo.name) {
                  handleAddDetails(fromAndTo);
                  setOpenModal("");
                  handleReset("fromAndTo");
                } else {
                  toast.error("All fields are mandatory");
                }
              }}
              variant="primary"
              text="Submit"
            />
          </>
        ) : openModal == "backup" ? (
          <>
            <InputField
              className="p-2 rounded-lg bg-[var(--border-secondary)]"
              accept=".json"
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (file) {
                  setbackup_file(file);
                }
              }}
              type="file"
            />
            <Button
              onClick={() => {
                if (backup_file) {
                  setDataToLocalStorage(backup_file);
                  setOpenModal("");
                } else {
                  toast.error("Backup file is required");
                }
              }}
              variant="primary"
              text="Submit"
            />
          </>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
}
