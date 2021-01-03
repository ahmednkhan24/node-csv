const fileStream = require('fs');
const parseAllFiles = require('./parse');
const importFileNames = require('./importFileNames');

module.exports = async (dirName) => {
  console.log(`👋👋👋 Reading all csv files from the ${dirName} folder.\n`);

  if (!fileStream.existsSync(dirName)) {
    console.log('Could not find the data directory.');
    throw err;
  }

  const fileNames = await importFileNames(dirName);

  const dsStore = fileNames.indexOf('.DS_Store');
  if (dsStore > -1) {
    fileNames.splice(dsStore, 1);
  }

  console.log(`Found ${fileNames.length} files:`);
  console.log(`${fileNames.toString()}\n`);

  const allData = await parseAllFiles(dirName, fileNames);

  console.log('\n✅✅✅ Done parsing all files.\n');

  return allData;
};
