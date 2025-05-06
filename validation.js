import { access } from 'node:fs/promises';
import { printHelpAndExit } from './helpers.js';

export const validateInput = async (inputs) => {
  if (inputs[2] === '--help' || inputs.length < 6) {
    printHelpAndExit();
  }
  
  try {
    await access(inputs[2]);
  } catch (err) {
    console.log(`Directory ${inputs[2]} does not exist`);
    process.exit(1);
  }
}