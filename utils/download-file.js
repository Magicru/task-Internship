import fs from "fs";
import https from 'https';

export const downloadFile = (url, filename, callback) => {
  const stream = fs.createWriteStream(filename);

  https
    .get(url, res => {
      res.pipe(stream);
      stream.on('finish', () => stream.close(callback));
    }).on('error', err => {
      fs.unlink(filename);
      if (callback) {
        callback(err.message);
      }
    });
};
