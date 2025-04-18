export const printHelpAndExit = () => {
  console.error(`Usage:\ncheck-files 'path/to/your/directory' 'path/to/directory to save result file' 'searched expression'`);
  console.error('Will find searched expression in all php files of provided directory and save it in file.');
  process.exit(1);
};

export const createOutput = (stdout) => {
  console.log('stdout', stdout);
  const output = [];
  const stdoutArray = stdout.trim().split('\r\n');
  stdoutArray.forEach(file => {
    if (!output.includes(file)) {
      output.push(file);
    };
  });
  return output;
}

export const getIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  }
  catch (error) {
    console.error(error);
  }
}