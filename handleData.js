import { access, writeFile, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import CryptoJS from 'crypto-js';
// import { sendEmail } from './handleEmail.js';

export const handleFileList = async (newResultContent, directory, tragetDirectory) => {
  // Create terget directory if it does not exist - named by MD5 hash of the searched directory
  const targetDir = join(tragetDirectory, 'Filechecker_results', CryptoJS.MD5(directory).toString());

  try {
    await access(targetDir);
    console.log('Directory exists');
  } catch (err) {
    console.log('Directory does not exist, creating...');
    await mkdir(targetDir, { recursive: true });
    console.log('Directory created');
  }
  
  // Create result file name - named by MD5 hash of the searched directory - made in first run
  const resultFileName = join(targetDir, `${CryptoJS.MD5(directory).toString()}.txt`);
  
  try {
    await access(resultFileName);
    console.log(`${resultFileName} already exists`);

    const data = await readFile(resultFileName, 'utf-8');
    const previousResultContent = data.split('\n');
    console.log('previousResultContent', previousResultContent);
    console.log('newResultContent', newResultContent);
    const diff = newResultContent.filter(file => !previousResultContent.includes(file));
    console.log('diff', diff);

    if (diff.length === 0) {
      console.log('No new files found');
      return;
    }

    // In case of new files, append them to the result file and create diff file named by current date
    await writeFile(resultFileName, newResultContent.join('\n'));
    console.log('file updated');
    
    const diffFileName = join(targetDir, `diff-${new Date().toISOString()}.txt`);
    await writeFile(diffFileName, diff.join('\n'));
    console.log('diff file created');

    // await sendEmail(diff, email);
  } catch {
    console.log(`${resultFileName} does not exist, creating...`);
    await writeFile(resultFileName, newResultContent.join('\n'));
    console.log('file created');

    // await sendEmail(newResultContent, email);
  }
}