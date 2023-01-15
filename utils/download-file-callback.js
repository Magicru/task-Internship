import {loadData} from "./load-data.js";
import {loadFileCallback} from "./load-file-callback.js";

export const downloadFileCallback = (fileName, setData) => (error) => {
  if (error) {
    console.error(error);
    return;
  }

  loadData(fileName, loadFileCallback, setData);
}
