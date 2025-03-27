#!/usr/bin/env node

import { exec } from 'child_process';
import { printHelpAndExit, createOutput } from './helpers.js';
import { handleFileList } from './handleData.js';
import { localConfig } from './config-local.js';

const checkFiles = () => {
  // const directory = process.argv[2];
  // const searchingExpression = process.argv[3];
  // const email = process.argv[4];
  // const command = `cd ${directory} && grep -i -lr --include=*.php ${searchingExpression}`;

  // test settings:
  const directory = localConfig.directory;
  const email = localConfig.email;
  const command = localConfig.command;

  // if (process.argv.length < 5) {
  //   printHelpAndExit();
  // }

  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    if (stdout === '') {
      console.log('No files found');
      return;
    }
    const output = createOutput(stdout);
    handleFileList(output, directory, email);
  });
}

// if (process.argv[2] === '--help' || !process.argv[2]) {
//   printHelpAndExit();
// }
 
checkFiles();