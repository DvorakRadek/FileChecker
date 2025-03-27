export const printHelpAndExit = () => {
  console.error(`Usage:\ncheck-files 'path/to/your/directory' 'searched expression' 'email'\tor\tcheck-files --stop all`);
  console.error('Will find searched expression in all php files of provided directory and send them to email. Will be executed every day until stopped with --stop flag.');
  process.exit(1);
};

export const createOutput = (stdout) => {
  const output = [];
  const stdoutArray = stdout.trim().split('\r\n');
  stdoutArray.forEach(file => {
    if (!output.includes(file)) {
      output.push(file);
    };
  });
  return output;
}