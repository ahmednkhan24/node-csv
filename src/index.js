const readAllFiles = require('./csv/read');
const write = require('./csv/write');
const dictionary = require('./dictionary');

const multiplyByDictionary = (data) => {
  return data.map((data) => {
    if (Object.keys(data).length === 0) {
      return data;
    } else {
      data.Amount *= dictionary[data.FileName];
      return data;
    }
  });
};

const parseData = async () => {
  const dataFolderName = 'data';

  const data = await readAllFiles(dataFolderName);
  const mergedData = [].concat.apply([], data);
  const fixNegatives = multiplyByDictionary(mergedData);

  write(fixNegatives);
};

parseData();
