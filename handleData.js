import { access, writeFile, readFile } from 'node:fs';
import { join } from 'node:path';
import CryptoJS from 'crypto-js';
import { createEmailContentFile } from './handleEmail.js';

export const handleFileList = (newResultContent, directory, email) => {
  const tempDir = process.env.TEMP
  const resultFileName = join(tempDir, 'Filechecker', `${CryptoJS.MD5(directory).toString()}.txt`);
  console.log(resultFileName);
  process.exit(1);

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