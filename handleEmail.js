import { access, readFile, writeFile, rm } from 'fs';
import { join } from 'node:path';

export const createEmailContent = (files) => {
  return `New suspicious files found:\n${files.join('\n')}`;
}

const emailContentFile = join(process.env.TEMP, 'Filechecker', 'email-content.txt');

export const createEmailContentFile = (fileContent) => {
  access(emailContentFile, (err) => {
    if (err) {
      writeFile(emailContentFile, fileContent.join('\n'), (err) => {
        if (err) throw err;
      });
      console.log('email content file created');
    } else {
      readFile(emailContentFile, 'utf-8', (err, data) => {
        if (err) throw err;

        const emailContent = data.split('\n');
        const diff = fileContent.filter(file => !emailContent.includes(file));
        if (diff.length === 0) {
          return;
        }
        emailContent.push(...diff);
        
        writeFile(emailContentFile, emailContent.join('\n'), (err) => {
          if (err) throw err;
        });
        console.log('email content file updated');
      });
    }
  })
}

export const deleteEmailContentFile = () => {
  access(emailContentFile, (err) => {
    if (err) {
      console.log('email content file does not exist');
    } else {
      rm(emailContentFile, (err) => {
        if (err) throw err;
      });
      console.log('email content file deleted');
    }
  })
}