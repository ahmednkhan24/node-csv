const parseAllFiles = require('./parse');
const importFileNames = require('./importFileNames');

module.exports = async (dirName) => {
  console.log(`👋👋👋 Reading all csv files from the ${dirName} folder.\n`);

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
