const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'bin/merged.csv',
  header: [
    { id: 'Name', title: 'Name' },
    { id: 'Surname', title: 'Surname' },
    { id: 'Age', title: 'Age' },
    { id: 'Gender', title: 'Gender' },
    { id: 'filename', title: 'Bank' }
  ]
});

const writeFile = (data) => {
  console.log('writing data to merged.csv in the bin directory.');

  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully.'));
};

module.exports = writeFile;
