#!/usr/bin/env node

import { exec } from 'child_process';
import { createOutput } from './helpers.js';
import { handleFileList } from './handleData.js';
import input from './handleInput.js';
import { validatePath } from './validation.js';
import { operatingSystem } from './helpers.js';

const checkFiles = () => {
  validatePath(input.path);

  const command = {
    Windows_NT: `powershell -Command "Set-Location -Path ${input.path}; Get-ChildItem -Recurse -Include *.php | Select-String -Pattern ${input.expression} | Select-Object -ExpandProperty Path"`,
    Unix: `cd ${input.path} && grep -i -lr --include=*.php ${input.expression}`,
  }

  exec(command[operatingSystem], (error, stdout, stderr) => {
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
    handleFileList(output, input);
  });
}
 
checkFiles();