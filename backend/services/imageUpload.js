const multer = require("multer");
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
}).any();


const bufferToDataURI = (fileFormat, buffer) =>
  parser.format(fileFormat, buffer);


module.exports = { upload, bufferToDataURI };
