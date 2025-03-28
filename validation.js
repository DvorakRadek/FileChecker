import { access } from 'node:fs';

export const validatePath = (path) => {
  access(path, (err) => {
    if (err) {
      console.log(`Directory ${path} does not exist`);
      process.exit(1);
    }
    console.log(`Directory ${path} exists`);
  });
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  return true;
}