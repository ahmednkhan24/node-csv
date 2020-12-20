const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeFile = () => {
  const csvWriter = createCsvWriter({
    path: 'bin/out.csv',
    header: [
      { id: 'name', title: 'Name' },
      { id: 'surname', title: 'Surname' },
      { id: 'age', title: 'Age' },
      { id: 'gender', title: 'Gender' }
    ]
  });

  const data = [
    {
      name: 'John',
      surname: 'Snow',
      age: 26,
      gender: 'M'
    },
    {
      name: 'Clair',
      surname: 'White',
      age: 33,
      gender: 'F'
    },
    {
      name: 'Fancy',
      surname: 'Brown',
      age: 78,
      gender: 'F'
    }
  ];

  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));
};

module.exports = writeFile;
