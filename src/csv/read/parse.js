const fileStream = require('fs');
const csv = require('csv-parser');
const headerHandler = require('./headerHandler');

const parseFile = (dirName, fileName, logic) => {
  const data = [];
  const { headers, handler } = logic;

  const fileData = fileStream
    .createReadStream(`${dirName}/${fileName}`)
    .pipe(csv({ headers: false, skipLines: Number(headers) }));

  fileData.on('data', (row) => data.push(handler(row, fileName)));

  return new Promise((resolve, reject) => {
    fileData.on('end', () => resolve(data));
    fileData.on('error', reject);
  });
};

module.exports = async (dirName, files) => {
  var allData = await Promise.all(
    files.map(async (file) => {
      console.log(`Parsing ${dirName}/${file}...`);

      let oneFilesData = await parseFile(dirName, file, headerHandler(file));
      if (!file.toUpperCase().includes('DEBIT')) {
        oneFilesData = oneFilesData.filter((entry) => entry.Amount > 0);
      }
      oneFilesData.sort((a, b) => {
        return new Date(a.PostDate) - new Date(b.PostDate);
      });

      return [...oneFilesData, {}];
    })
  );

  return allData;
};
