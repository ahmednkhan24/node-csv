const fileStream = require('fs');
const EventEmitter = require('events').EventEmitter;
const csv = require('csv-parser');

const extractRelevantFields = (arr) =>
  arr.map(({ Amount, Description, ['Post Date']: PostDate, FileName }) => ({
    Amount,
    Description,
    PostDate,
    FileName
  }));

const getAllFileNames = (dirName) => {
  const filesEventEmitter = new EventEmitter();
  const fileNames = [];

  fileStream.readdir(dirName, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => fileNames.push(file));

    filesEventEmitter.emit('done');
  });

  return new Promise((resolve, reject) => {
    filesEventEmitter.on('done', () => resolve(fileNames));
    filesEventEmitter.on('error', reject);
  });
};

const parseFile = (filename) => {
  const data = [];

  const fileData = fileStream.createReadStream(`data/${filename}`).pipe(csv());

  fileData.on('data', (row) => {
    data.push({
      ...row,
      FileName: filename,
      Amount: Number(row.Amount.replace(/[^0-9.-]+/g, ''))
    });
  });

  return new Promise((resolve, reject) => {
    fileData.on('end', () => resolve(data));
    fileData.on('error', reject);
  });
};

const parseAllFiles = async (files) => {
  var allData = await Promise.all(
    files.map(async (file) => {
      const oneFilesData = await parseFile(file);
      const extractedData = extractRelevantFields(oneFilesData);
      extractedData.sort((a, b) => {
        return new Date(a.PostDate) - new Date(b.PostDate);
      });
      return [...extractedData, {}];
    })
  );
  return allData;
};

module.exports = async (dirName) => {
  console.log('reading all csv files from the data folder.');
  const fileNames = await getAllFileNames(dirName);
  const allData = parseAllFiles(fileNames);
  console.log('done reading all csv data.');
  return allData;
};
