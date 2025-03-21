export const printHelpAndExit = () => {
  console.error('Invalid number of parameters!');
  console.error(`Usage: check-files 'path/to/your/directory' 'searching expression' 'email'`);
  console.error('Will find searching expression in all php files in the directory and send them to email');
  process.exit(1);
};

export const getNameOfParentDirectory = (path) => {
  const pathArray = path.split('/');
  return pathArray.at(-1);
}

export const arrayFromString = (string) => {
  return string.split(' ');
}