const readAllFiles = require('./csv/read');
const write = require('./csv/write');

const parseData = async () => {
  const dataFolderName = 'data';
  const data = await readAllFiles(dataFolderName);

  const mergedData = [].concat.apply([], data);

  write(mergedData);
};

parseData();
