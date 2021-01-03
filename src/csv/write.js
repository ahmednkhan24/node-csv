const fileStream = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeFile = (data, folderPath) => {
  if (!fileStream.existsSync(folderPath)) {
    fileStream.mkdirSync(folderPath);
  }

  const csvWriter = createCsvWriter({
    path: `${folderPath}/merged.csv`,
    header: [
      { id: 'PostDate', title: 'PostDate' },
      { id: 'Description', title: 'Description' },
      { id: 'Amount', title: 'Amount' },
      { id: 'FileName', title: 'FileName' }
    ]
  });

  console.log(`writing data to merged.csv in the ${folderPath} directory.\n`);

  csvWriter.writeRecords(data);
};

module.exports = writeFile;
