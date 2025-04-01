import { access } from 'node:fs/promises';
import { printHelpAndExit } from './helpers.js';

export const validateInput = async (inputs) => {
  if (inputs[2] === '--help' || inputs.length < 5) {
    printHelpAndExit();
  }
  
  try {
    await access(inputs[2]);
  } catch (err) {
    console.log('Directory does not exist');
    process.exit(1);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputs[4])) {
    console.log('Invalid email format');
    process.exit(1);
  }
}