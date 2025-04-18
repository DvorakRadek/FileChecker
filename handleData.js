export const handleFileList = async (newResultContent, directory, tragetDirectory) => {
  const targetDir = join(tragetDirectory, 'Filechecker_results', CryptoJS.MD5(directory).toString());

  try {
    await access(targetDir);
    console.log('Directory exists');
  } catch (err) {
    console.log('Directory does not exist, creating...');
    await mkdir(targetDir, { recursive: true });
    console.log('Directory created');
  }

  const resultFileName = join(targetDir, `${CryptoJS.MD5(directory).toString()}.txt`);

  try {
    await access(resultFileName);
    console.log(`${resultFileName} already exists`);

    const data = await readFile(resultFileName, 'utf-8');
    const previousResultContent = new Set(data.split('\n'));
    const diff = newResultContent.filter(file => !previousResultContent.has(file));

    if (diff.length === 0) {
      console.log('No new files found');
      return;
    }

    const diffFileName = join(targetDir, `diff-${new Date().toISOString()}.txt`);

    await writeFile(resultFileName, newResultContent.join('\n'));
    await writeFile(diffFileName, diff.join('\n'));
    console.log('file updated');

    // await sendEmail(diff, email);
  } catch {
    console.log(`${resultFileName} does not exist, creating...`);
    await writeFile(resultFileName, newResultContent.join('\n'));
    console.log('file created');

    // await sendEmail(newResultContent, email);
  }
};