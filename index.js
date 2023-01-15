import { getGlossary, setGlossary } from "./data/glossary.js";
import { glossaryFilename, mindMapFilename } from "./data/constant.js";
import { downloadFile } from "./utils/download-file.js";
import { downloadFileCallback } from "./utils/download-file-callback.js";
import { loadData } from "./utils/load-data.js";
import { loadFileCallback } from "./utils/load-file-callback.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import { getMindMap, setMindMap } from "./data/mindmap.js";

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/html'));

app.get("/json/mind-map", (request, response) => {
  console.log("GET /json/mind-map called...")

  response.writeHead(200);
  response.end(JSON.stringify(getMindMap()));
});

app.get("/json/glossary", (request, response) => {
  console.log("GET /json/glossary called...")

  const term = request.query.term;

  if (!term) {
    response.writeHead(200);
    response.end(JSON.stringify(getGlossary()));

    return;
  }

  if (getGlossary()[term]) {
    response.writeHead(200);
    response.end(getGlossary()[term]);
  } else {
    response.writeHead(404);
    response.end();
  }
});

app.put("/json/glossary", (request, response) => {
  const glossaryUrl = request.body.glossaryUrl;

  downloadFile(glossaryUrl, glossaryFilename, downloadFileCallback(glossaryFilename, setGlossary));

  response.writeHead(200);
  response.end();
});

app.put("/json/mind-map", (request, response) => {
  const mindMapUrl = request.body.mindMapUrl;

  downloadFile(mindMapUrl, mindMapFilename, downloadFileCallback(mindMapFilename, setMindMap));

  response.writeHead(200);
  response.end();
});

app.listen(port, () => {
  loadData("./data/default/glossary.json", loadFileCallback, setGlossary);
  loadData("./data/default/mindmap.json", loadFileCallback, setMindMap);

  console.log("Server is listening...")
});
