import { access } from 'node:fs';
import { printHelpAndExit } from './helpers.js';

export const validateInput = (inputs) => {
  if (inputs[2] === '--help' || inputs.length < 5) {
    printHelpAndExit();
  }
  
  access(inputs[2], (err) => {
    if (err) {
      console.log('Directory does not exist');
      process.exit(1);
    }
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputs[4])) {
    console.log('Invalid email format');
    process.exit(1);
  }
}