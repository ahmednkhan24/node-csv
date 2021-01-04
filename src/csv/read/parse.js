const fileStream = require('fs');
const csv = require('csv-parser');
const headerHandler = require('./headerHandler');
const { seperateDebitsAndCredits } = require('./utils');

const parseFile = (dirName, fileName, { headers, handler }) => {
  const data = [];

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
      oneFilesData.sort((a, b) => {
        return new Date(a.PostDate) - new Date(b.PostDate);
      });
      if (file.toUpperCase().includes('DEBIT')) {
        const { debits, credits } = seperateDebitsAndCredits(oneFilesData);
        oneFilesData = [...credits, {}, ...debits];
      }
      // else {
      //   oneFilesData = oneFilesData.filter((entry) => entry.Amount > 0);
      // }

      return [...oneFilesData, {}];
    })
  );

  return allData;
};
