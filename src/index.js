const read = require('./csv/read');
const utils = require('./utils');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const parseData = async () => {
  const fileNames = ['data.csv', 'data2.csv'];
  console.log('parsing data.csv file...');

  const data = await read.parseAllFiles(fileNames);

  console.log('done parsing data.csv file.');

  utils.printAllData(data);
};

parseData();

// const fileData = fs
//   .createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     // console.log(row);
//     console.log('in data');
//     data.push(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });

// console.log('writing to out.csv file...');

// const csvWriter = createCsvWriter({
//   path: 'out.csv',
//   header: [
//     { id: 'name', title: 'Name' },
//     { id: 'surname', title: 'Surname' },
//     { id: 'age', title: 'Age' },
//     { id: 'gender', title: 'Gender' }
//   ]
// });

// console.log('done: ', data);

// const data2 = [
//   {
//     name: 'John',
//     surname: 'Snow',
//     age: 26,
//     gender: 'M'
//   },
//   {
//     name: 'Clair',
//     surname: 'White',
//     age: 33,
//     gender: 'F'
//   },
//   {
//     name: 'Fancy',
//     surname: 'Brown',
//     age: 78,
//     gender: 'F'
//   }
// ];

// console.log('data 1: ', data);
// console.log('data 2: ', data2);

// csvWriter
//   .writeRecords(data)
//   .then(() => console.log('The CSV file was written successfully'));
