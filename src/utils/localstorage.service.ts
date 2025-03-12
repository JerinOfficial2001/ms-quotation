import toast from "react-hot-toast";

const key: string = process.env.NEXT_PUBLIC_STORAGE_KEY || "";

export const POST_TO_STORAGE = (value: any, index_key?: string) => {
  if (typeof window === "undefined") {
    return;
  }
  if (!window || typeof window == undefined) {
    return;
  }
  const cache = localStorage.getItem(key);
  let storage: any = {};
  if (cache) {
    storage = JSON.parse(cache);
  }
  if (index_key) {
    storage[index_key] = value;
  } else {
    storage = value;
  }
  localStorage.setItem(key, JSON.stringify(storage));
};
export const GET_FROM_STORAGE = (index_key?: string) => {
  if (typeof window === "undefined") {
    return null;
  }
  if (!window || typeof window == undefined) {
    return null;
  }
  const cache = localStorage.getItem(key);
  if (!cache) {
    return null;
  }
  const storage = JSON.parse(cache);
  if (index_key) {
    return storage[index_key];
  }
  return storage;
};
export const downloadBackupFile = () => {
  if (typeof window === "undefined") {
    return;
  }
  const data = GET_FROM_STORAGE();
  const fileName = "ms_quotation_backup.json";
  const jsonData = JSON.stringify(data, null, 2);

  // Create a Blob from the JSON data
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create a download link and trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
export const setDataToLocalStorage = (file: File) => {
  if (typeof window === "undefined") {
    return;
  }
  const reader: any = new FileReader();

  reader.onload = () => {
    try {
      const fileData = JSON.parse(reader.result);
      localStorage.setItem(key, JSON.stringify(fileData));
      toast.success("Backup updated");
      window.location.reload();
    } catch (error) {
      toast.error("Invalid JSON file");
    }
  };

  reader.readAsText(file);
};
