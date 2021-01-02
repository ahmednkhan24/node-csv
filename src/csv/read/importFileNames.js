const fileStream = require('fs');
const EventEmitter = require('events').EventEmitter;

module.exports = (dirName) => {
  const filesEventEmitter = new EventEmitter();
  const fileNames = [];

  fileStream.readdir(dirName, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => fileNames.push(file));

    filesEventEmitter.emit('done');
  });

  return new Promise((resolve, reject) => {
    filesEventEmitter.on('done', () => resolve(fileNames));
    filesEventEmitter.on('error', reject);
  });
};
