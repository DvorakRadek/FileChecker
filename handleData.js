import { access, writeFile, readFile } from 'node:fs';
import { getNameOfParentDirectory } from './helpers.js';
import { createEmailContentFile } from './handleEmail.js';

export const handleFileList = (newResultContent, directory, email) => {
  const resultFileName = `${getNameOfParentDirectory(directory)}-suspicious-files.txt`;

  access(resultFileName, (err) => {
    console.log(`${resultFileName} ${err ? 'does not exist' : 'already exists'}`);
    if (err) {
      writeFile(resultFileName, newResultContent.join('\n'), (err) => {
        if (err) throw err;
      });
      console.log('file created');
      createEmailContentFile(newResultContent);
      // send email
    } else {
      readFile(resultFileName, 'utf-8', (err, data) => {
        if (err) throw err;

        const previousResultContent = data.split('\n');
        const diff = newResultContent.filter(file => !previousResultContent.includes(file));

        if (diff.length === 0) {
          console.log('No new files found');
          return;
        }

        writeFile(resultFileName, newResultContent.join('\n'), (err) => {
          if (err) throw err;
          console.log('file updated');
        });

        createEmailContentFile(diff);
        // send email
      });
    }
  });
}