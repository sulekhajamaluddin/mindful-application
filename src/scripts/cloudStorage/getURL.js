import { uploadFile } from "./uploadFile";
import { downloadFile } from "./downloadFile";

export async function getURL(file, filePath) {
  await uploadFile(file, filePath);
  const url = await downloadFile(filePath);
  return url;
}
