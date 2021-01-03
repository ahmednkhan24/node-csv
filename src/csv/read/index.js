const fileStream = require('fs');
const parseAllFiles = require('./parse');
const importFileNames = require('./importFileNames');

module.exports = async (dirName) => {
  console.log(`👋👋👋 Reading all csv files from the ${dirName} directory.\n`);

  if (!fileStream.existsSync(dirName)) {
    console.log(`Could not find the ${dirName} directory.\n`);
    throw err;
  }

  const fileNames = await importFileNames(dirName);

  const dsStore = fileNames.indexOf('.DS_Store');
  if (dsStore > -1) {
    fileNames.splice(dsStore, 1);
  }

  if (fileNames.length <= 0) {
    console.log(`Could not find any csv files in the ${dirName} directory.\n`);
    throw err;
  }

  console.log(`Found ${fileNames.length} files:`);
  console.log(`${fileNames.toString()}\n`);

  const allData = await parseAllFiles(dirName, fileNames);

  console.log('\n✅✅✅ Done parsing all files.\n');

  return allData;
};
