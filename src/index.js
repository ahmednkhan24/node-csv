const { parseAllFiles } = require('./csv/read');
const utils = require('./utils');
const write = require('./csv/write');
const files = require('./files');

const parseData = async () => {
  console.log('parsing data.csv file...');

  const data = await parseAllFiles(files);

  console.log('done parsing data.csv file.');

  utils.printAllData(data);
};

parseData();

// write();
