const readAllFiles = require('./csv/read');
const write = require('./csv/write');

const parseData = async () => {
  console.time();

  const folderPath = '/Users/ahmedkhan/Downloads';
  const inDir = 'data';
  const outDir = 'bin';

  try {
    const data = await readAllFiles(`${folderPath}/${inDir}`);
    const mergedData = [].concat.apply([], data);

    write(mergedData, `${folderPath}/${outDir}`);

    console.log('Success! 🥳🥳🥳\n');
    console.timeEnd();

    console.log('\nExiting...\n');
  } catch (err) {
    console.log('An error occurred 😞😞😞\n');
    console.timeEnd();

    console.log('\nExiting...\n');
  }
};

parseData();
