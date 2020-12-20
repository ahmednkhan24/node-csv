const { parseAllFiles } = require('./csv/read');
const utils = require('./utils');
const write = require('./csv/write');

const parseData = async () => {
  const fileNames = ['data.csv', 'data2.csv'];
  console.log('parsing data.csv file...');

  const data = await parseAllFiles(fileNames);

  console.log('done parsing data.csv file.');

  utils.printAllData(data);
};

// parseData();

write();

// console.log('writing to out.csv file...');
