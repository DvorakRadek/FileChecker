import { access, writeFile, readFile, mkdir } from 'node:fs';
import { join } from 'node:path';
import CryptoJS from 'crypto-js';
import { sendEmail } from './handleEmail.js';

export const handleFileList = (newResultContent, directory, email) => {
  access(`${process.env.TEMP}/Filechecker`, (err) => {
    if (err) {
      console.log('Directory does not exist');
      mkdir(`${process.env.TEMP}/Filechecker`, { recursive: true }, (err) => {
        if (err) throw err;
      });
    } else {
      console.log('Directory exists');
      return;
    }
  });
  
  const resultFileName = join(process.env.TEMP, 'Filechecker', `${CryptoJS.MD5(directory).toString()}.txt`);
  
  access(resultFileName, (err) => {
    console.log(`${resultFileName} ${err ? 'does not exist' : 'already exists'}`);

    if (err) {
      writeFile(resultFileName, newResultContent.join('\n'), (err) => {
        if (err) throw err;
      });
      console.log('file created');
      sendEmail(newResultContent, email);
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

        sendEmail(diff, email);
      });
    }
  });
}