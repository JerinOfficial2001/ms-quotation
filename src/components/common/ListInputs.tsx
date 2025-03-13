import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Button from "./Button";
import { translateText } from "@/helperFunction";
import EditableTypography from "./EditableTypography";
import InputField from "./InputField";

type Props = {
  isEditable?: boolean;
  datas: any;
  setDatas: (groups: any) => void;
  defaultTitle?: string;
  handleSave?: () => void;
  addGroupButtonName: string;
  addChildButtonName: string;
};
export default function ListInputs({
  isEditable,
  datas,
  setDatas,
  defaultTitle,
  handleSave,
  addGroupButtonName,
  addChildButtonName,
}: Props) {
  const handleGroup = (
    key: string | number,
    value?: any,
    nestedIndex?: number | string
  ) => {
    const tempTerms = [...datas];
    if (key == "title") {
      if (tempTerms[key as any]) {
        tempTerms[key as any].title = value;
      } else {
        tempTerms.push({
          title: defaultTitle || "",
          conditions: [" "],
        });
      }
    } else if (nestedIndex || nestedIndex == 0) {
      const currentCondition = tempTerms[key as number].conditions;
      if (currentCondition[nestedIndex as number]) {
        currentCondition[nestedIndex as number] = value;
        setDatas(tempTerms);
      } else {
        currentCondition.push(value);
      }
    } else {
      tempTerms[key as number].title = value;
    }
    setDatas(tempTerms);
  };
  const handleDeleteGroup = (index: number, nestedIndex?: number) => {
    let tempTerms: any = [...datas];

    if (nestedIndex) {
      tempTerms[index].conditions = tempTerms[index]?.conditions.filter(
        (_: any, i: number) => i != nestedIndex
      );
    } else {
      tempTerms = tempTerms.filter((_: any, i: number) => i != index);
    }
    setDatas(tempTerms);
  };
  return (
    <CardLayout
      className={`${
        !isEditable && "!bg-transparent !shadow-none"
      } flex flex-col gap-0 !p-0 !pt-3`}
    >
      {isEditable && handleSave && (
        <div className="flex flex-row-reverse items-center w-full">
          <Button
            variant="primary"
            onClick={handleSave}
            text={translateText("BUTTONS.SAVE")}
          />
        </div>
      )}
      {datas.map((elem: any, index: number) => {
        return (
          <div className="flex flex-col gap-3" key={index}>
            <EditableTypography
              className="!text-[16px]"
              variant="title"
              editabeleType={isEditable ? "text" : undefined}
              text={elem.title}
              setText={(text) => handleGroup(index, text)}
            />
            {elem.conditions.map((condition: any, condition_index: number) => {
              return (
                <div
                  className="flex gap-1 items-start justify-center"
                  key={condition_index}
                >
                  <EditableTypography text={`${condition_index + 1}.`} />
                  <InputField
                    isEditable={isEditable}
                    className={`bg-transparent ${
                      !isEditable ? "!border-none" : ""
                    }`}
                    value={condition}
                    onChange={(e) =>
                      handleGroup(index, e.target.value, condition_index)
                    }
                    showDelete={true}
                    handleDelete={() => {
                      handleDeleteGroup(index, condition_index);
                    }}
                  />
                </div>
              );
            })}
            {index != datas.length - 1 && isEditable ? (
              <Button
                onClick={() => {
                  handleGroup(index, " ", "new");
                }}
                className="w-[200px] border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)]"
                text={addChildButtonName}
              />
            ) : (
              isEditable && (
                <div className="w-full gap-3 flex items-center justify-start">
                  <Button
                    onClick={() => {
                      handleGroup("title");
                    }}
                    className="w-[200px] border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)]"
                    text={addGroupButtonName}
                  />
                  <Button
                    onClick={() => {
                      handleGroup(index, " ", "new");
                    }}
                    className="w-[200px] border border-dashed border-[var(--icon-color)] hover:bg-[var(--background)]"
                    text={addChildButtonName}
                  />
                </div>
              )
            )}
          </div>
        );
      })}
    </CardLayout>
  );
}
