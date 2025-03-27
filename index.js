#!/usr/bin/env node

import cron from 'node-cron';
import { exec } from 'child_process';
import { printHelpAndExit, createOutput } from './helpers.js';
import { handleFileList } from './handleData.js';

const checkFiles = () => {
  // const directory = process.argv[2];
  // const searchingExpression = process.argv[3];
  // const email = process.argv[4];
  // const command = `cd ${directory} && grep -i -lr --include=*.php ${searchingExpression}`;

  // test settings
  const directory = 'C:/Users/Radek/Desktop/Práce/Projekty/P3D'
  const searchingExpression = 'row';
  const command = `powershell -Command "Set-Location -Path '${directory}'; Get-ChildItem -Recurse -Include *.tsx | Select-String -Pattern '${searchingExpression}' | Select-Object -ExpandProperty Path"`;
  const email = 'test@test.com';

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

const scheduleCheckFiles = cron.schedule('0 13 * * *', () => {
    checkFiles();
  });

const scheduleSendEmail = cron.schedule('0 14 * * *', () => {
  sendEmail();
});

if (process.argv[2] === '--help' || !process.argv[2]) {
  printHelpAndExit();
} else if (process.argv[2] === '--stop' && process.argv[3] === 'all') {
  scheduleCheckFiles.stop();
  scheduleSendEmail.stop();
  process.exit(0);
} else {
  scheduleCheckFiles.start();
  scheduleSendEmail.start();
}

// TBD: split into multiple jobs - different folders, different expressions, different emails
// --stop specific job or --stop all