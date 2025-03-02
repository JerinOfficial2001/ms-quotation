import { TEXT } from "@/constants/text";

export const translateText = (key: string) => {
  const keys: string[] = key.split(".");
  const translatedText = keys.reduce((acc: any, string: any) => {
    return acc[string as keyof typeof acc];
  }, TEXT);
  return translatedText;
};
