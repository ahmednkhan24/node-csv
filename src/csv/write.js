const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'bin/merged.csv',
  header: [
    { id: 'PostDate', title: 'PostDate' },
    { id: 'Description', title: 'Description' },
    { id: 'Amount', title: 'Amount' },
    { id: 'FileName', title: 'FileName' }
  ]
});

const writeFile = (data) => {
  console.log('writing data to merged.csv in the bin directory.');

  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully.'));
};

module.exports = writeFile;
