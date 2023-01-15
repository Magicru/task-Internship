import fs from "fs";

export const loadData = (filename, callback, setData) => {
  fs.readFile(filename, (error, data) => {
    if (error) {
      console.error(error);

      callback(error);
      return;
    }

    setData(JSON.parse(data));

    callback();
  });
}
