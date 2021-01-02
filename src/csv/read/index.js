const parseAllFiles = require('./parse');
const importFileNames = require('./importFileNames');

module.exports = async (dirName) => {
  console.log(`reading all csv files from the ${dirName} folder.`);

  const fileNames = await importFileNames(dirName);
  const allData = parseAllFiles(dirName, fileNames);

  return allData;
};
