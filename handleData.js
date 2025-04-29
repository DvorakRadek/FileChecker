import { access, writeFile, readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import CryptoJS from 'crypto-js';

export const handleFileList = async (newResultContent, directory, targetDirectory, searchedExpressions) => {
  const targetDir = join(targetDirectory, 'Filechecker_results', CryptoJS.MD5(directory).toString());
  const slugifiedExpressions = searchedExpressions.replaceAll("|", "-");
  const dateString = new Date().toISOString().substring(0, 10);

  try {
    await access(targetDir);
    console.log('Directory exists');
  } catch (err) {
    console.log('Directory does not exist, creating...');
    await mkdir(targetDir, { recursive: true });
    console.log('Directory created');
  }
  
  const resultFileName = join(targetDir, `${slugifiedExpressions}.txt`);
  
  try {
    await access(resultFileName);
    console.log(`${resultFileName} already exists`);

    const data = await readFile(resultFileName, 'utf-8');
    const previousResultContent = data ? new Set(data.split('\n')) : new Set();
    const diff = newResultContent.filter(file => !previousResultContent.has(file));

    if (diff.length === 0) {
      console.log('No new files found');
      return;
    }

    await writeFile(resultFileName, newResultContent.join('\n'));
    console.log('file updated');
    
    const diffFileName = join(targetDir, `diff-${slugifiedExpressions}-${dateString}.txt`);
    await writeFile(diffFileName, diff.join('\n'));
    console.log('diff file created');

  } catch {
    console.log(`${resultFileName} does not exist, creating...`);
    await writeFile(resultFileName, newResultContent.join('\n'));
    console.log('file created');
  }
}