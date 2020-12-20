const fs = require('fs');
const csv = require('csv-parser');

const parseFile = (filename) => {
  const data = [];

  const fileData = fs.createReadStream(`data/${filename}`).pipe(csv());

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

module.exports = {
  parseFile,
  parseAllFiles
};
