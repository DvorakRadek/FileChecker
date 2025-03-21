import { access, readFile, writeFile, rm } from 'fs';

export const createEmailContent = (files) => {
  return `New suspicious files found:\n${files.join('\n')}`;
}

export const createEmailContentFile = (fileContent) => {
  access('email-content.txt', (err) => {
    if (err) {
      writeFile('email-content.txt', fileContent.join('\n'), (err) => {
        if (err) throw err;
      });
      console.log('email content file created');
    } else {
      readFile('email-content.txt', 'utf-8', (err, data) => {
        if (err) throw err;

        const emailContent = data.split('\n');
        const diff = fileContent.filter(file => !emailContent.includes(file));
        if (diff.length === 0) {
          return;
        }
        emailContent.push(...diff);
        
        writeFile('email-content.txt', emailContent.join('\n'), (err) => {
          if (err) throw err;
        });
        console.log('email content file updated');
      });
    }
  })
}

export const deleteEmailContentFile = () => {
  access('email-content.txt', (err) => {
    if (err) {
      console.log('email content file does not exist');
    } else {
      rm('email-content.txt', (err) => {
        if (err) throw err;
      });
      console.log('email content file deleted');
    }
  })
}