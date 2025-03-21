import { access, writeFile, readFile } from 'node:fs';
import { getNameOfParentDirectory } from './helpers.js';

export const handleFileList = (newFiles, directory, email) => {
  const fileName = `${getNameOfParentDirectory(directory)}-suspicious-files.txt`;

  access(fileName, (err) => {
    console.log(`${fileName} ${err ? 'does not exist' : 'already exists'}`);
    if (err) {
      writeFile(fileName, newFiles, (err) => {
        if (err) throw err;
      });
      console.log('file created');
      // more logic what to do if file does not exist
    } else {
      readFile(fileName, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log('data: ', data.trim().split('\r\n'));
        });
      // more logic what to do if file exists
    }
  });
}