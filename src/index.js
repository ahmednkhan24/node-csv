const readAllFiles = require('./csv/read');
const utils = require('./utils');
const write = require('./csv/write');

const parseData = async () => {
  console.log('parsing data.csv file...');

  const dataFolderName = 'data';
  const data = await readAllFiles(dataFolderName);

  console.log('done parsing data.csv file.');

  utils.printAllData(data);
};

parseData();

// write();
