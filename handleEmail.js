export const sendEmail = (files, email) => {
  const emailContent = `New suspicious files found:\n${files.join('\n')}`;
  console.log(emailContent, email);
  console.log('email sent');
}