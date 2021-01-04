const readAllFiles = require('./csv/read');
const write = require('./csv/write');

const parseData = async () => {
  console.time('Compute Time');
  try {
    const folderPath =
      process.env.NODE_ENV === 'production'
        ? '/Users/ahmedkhan/Downloads'
        : process.cwd();

    const inDir = 'data';
    const outDir = 'bin';

    const data = await readAllFiles(`${folderPath}/${inDir}`);
    const mergedData = [].concat.apply([], data);

    write(mergedData, `${folderPath}/${outDir}`);

    console.log('Success! 🥳🥳🥳\n');
  } catch (err) {
    console.log('An error occurred 😞😞😞\n');
  }
  console.timeEnd('Compute Time');
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Compute Memory: ${Math.round(used * 100) / 100}MB`);
  console.log('\nExiting...\n');
};

parseData();
