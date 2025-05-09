#!/usr/bin/env node

import { exec } from 'child_process';
import { createOutput } from './helpers.js';
import { handleFileList } from './handleData.js';
import { validateInput } from './validation.js';

const checkFiles = () => {
  validateInput(process.argv);
  const [, , directory, targetDirectory, fileExtension, searchedExpressions] = process.argv;
  const command = `cd ${directory} && grep -i -E -lr --include=*.${fileExtension} "${searchedExpressions}"`;

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
    handleFileList(output, directory, targetDirectory, searchedExpressions);
  });
}
 
checkFiles();