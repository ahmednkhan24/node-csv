const fileStream = require('fs');
const csv = require('csv-parser');
const headerHandler = require('./headerHandler');
const { seperateDebitsAndCredits, getDateFromArgs } = require('./utils');

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

      // remove dates that aren't part of the specified month
      const dateToUse = getDateFromArgs();
      oneFilesData = oneFilesData.filter((data) => {
        const dataDate = new Date(data.PostDate);
        return dataDate.getMonth() === dateToUse.getMonth();
      });

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
