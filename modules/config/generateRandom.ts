const generateRandomString = (len: number, onlyNumber: boolean, onlyCapital: boolean) => {
  const length = len || 12;
  let passwd = '';
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  if (onlyCapital) {
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }
  if (onlyNumber) {
    chars = '0123456789';
  }
  for (let i = 1; i <= length; i++) {
    const c = Math.floor(Math.random() * chars.length);
    passwd += chars.charAt(c).toString();
  }
  return passwd;
};

const uniqueString = () => (new Date().getTime().toString(36) + new Date().getUTCMilliseconds()).toUpperCase();

const generateRandomNum = (length: number) => {
  let counter = 0;
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  const uniqueNum = Math.floor(min + Math.random() * (max - min + 1)) + counter;
  counter += 1;
  return uniqueNum;
};

export default {
  generateRandomString,
  uniqueString,
  generateRandomNum
};
