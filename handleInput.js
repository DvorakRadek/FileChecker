import { input } from '@inquirer/prompts'
import { validateEmail } from './validation.js';
// import { emailConfig, localConfig } from './config-local.js';

const path = await input({
  message: 'Enter the path to the folder you want to check:',
  required: true,
  // default: localConfig.directory
});

const expression = await input({
  message: 'Enter the expression you want to search for:',
  required: true,
  // default: localConfig.searchedExpression
});

const email = await input({
  message: 'Enter your email address:',
  required: true,
  // default: emailConfig.to,
  validate: (value) => validateEmail(value),
});

const gmail = await input({
  message: 'Enter your gmail sender address: (optional for MacOS/Linux)',
  // default: emailConfig.to
});

const password = await input({
  message: 'Enter your gmail app password: (optional for MacOS/Linux)',
  // default: emailConfig.pass
});

const inputOptions = {
  path,
  expression,
  email,
  gmail,
  password,
}

export default inputOptions;