import React from "react";
import EditableTypography from "./EditableTypography";

type Props = {};

export default function TextEditor({}: Props) {
  const resize = true;
  return (
    <div className="control-pane flex flex-col">
      <EditableTypography text="Description" className="!font-bold" />
      <div className="flex flex-col gap-1">
        <EditableTypography
          className="max-w-[200px] whitespace-normal"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
        <EditableTypography
          className="max-w-[200px] whitespace-normal"
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
      </div>
    </div>
  );
}
