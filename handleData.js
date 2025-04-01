import { access, writeFile, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import CryptoJS from 'crypto-js';
import { sendEmail } from './handleEmail.js';

export const handleFileList = async (newResultContent, directory, email) => {
  const tempDir = join(tmpdir(), 'Filechecker');

  try {
    await access(tempDir);
    console.log('Directory exists');
  } catch (err) {
    console.log('Directory does not exist, creating...');
    await mkdir(tempDir, { recursive: true });
    console.log('Directory created');
  }
  
  const resultFileName = join(tempDir, `${CryptoJS.MD5(directory).toString()}.txt`);
  
  try {
    await access(resultFileName);
    console.log(`${resultFileName} already exists`);

    const data = await readFile(resultFileName, 'utf-8');
    const previousResultContent = data.split('\n');
    const diff = newResultContent.filter(file => !previousResultContent.includes(file));

    if (diff.length === 0) {
      console.log('No new files found');
      return;
    }

    await writeFile(resultFileName, newResultContent.join('\n'));
    console.log('file updated');

    await sendEmail(diff, email);
  } catch {
    console.log(`${resultFileName} does not exist, creating...`);
    await writeFile(resultFileName, newResultContent.join('\n'));
    console.log('file created');

    await sendEmail(newResultContent, email);
  }
}