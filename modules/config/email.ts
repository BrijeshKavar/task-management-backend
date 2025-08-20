export default {
  // eslint-disable-next-line quotes
  defaultFrom: "'Ashish Patel' <ashish@techuz.com>",
  mailObject: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  },
  queCronSeconds: 20
};
