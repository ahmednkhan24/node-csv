const printAllData = (allData) => {
  console.log();
  allData.forEach((files) => {
    console.log('file: ', files.file);
    files.data.forEach((data) => console.log(data));
    console.log();
  });
  console.log();
};

module.exports = {
  printAllData
};
