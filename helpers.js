import { type } from 'node:os';

export const createOutput = (stdout) => {
  const output = [];
  const stdoutArray = stdout.trim().split('\r\n');
  stdoutArray.forEach(file => {
    if (!output.includes(file)) {
      output.push(file);
    };
  });
  return output;
}

export const getIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  }
  catch (error) {
    console.error(error);
  }
}

const getOperatingSystem = () => {
  const osType = type();
  if (osType === 'Darwin' || osType === 'Linux') {
    return 'Unix';
  }
  return osType;
}

export const operatingSystem = getOperatingSystem();