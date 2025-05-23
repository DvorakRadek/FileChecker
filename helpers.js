export const printHelpAndExit = () => {
  console.error(`Usage:\ncheck-files 'path/to/your/directory' 'path/to/directory to save the result file' 'file extension of files to search' 'searched expressions eg. "expression1|expression2"`);
  console.log('Will find searched expression in files with provided extension in the directory and save it in result file. If executed as a cron job, it will create a diff file with new files found since the last run.');
  console.log('Example:');
  console.log('%c check-files\t/path/to/directory\t/path/to/result/directory\tphp\t"expression1|expression2"', 'color:green;');
  process.exit(1);
};

export const createOutput = (stdout) => {
  const output = [];
  const stdoutArray = stdout.trim().split('\n');
  stdoutArray.forEach(file => {
    if (!output.includes(file)) {
      output.push(file);
    };
  });
  return output;
}