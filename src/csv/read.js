const fileStream = require('fs');
const EventEmitter = require('events').EventEmitter;
const csv = require('csv-parser');

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
    data.push(row);
  });

  return new Promise((resolve, reject) => {
    fileData.on('end', () => resolve(data));
    fileData.on('error', reject);
  });
};

const parseAllFiles = async (files) => {
  var allData = await Promise.all(
    files.map(async (file) => {
      const data = await parseFile(file);
      return { file, data };
    })
  );
  return allData;
};

module.exports = async (dirName) => {
  const fileNames = await getAllFileNames(dirName);
  const allData = parseAllFiles(fileNames);
  return allData;
};
