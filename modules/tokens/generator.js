require('dotenv').config({ path: '../../.env' });
const { generateKeyPair } = require('crypto');
const fs = require('fs');

generateKeyPair(
  'rsa',
  {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: process.env.JWT_PASSPHRASE || 'top-secret'
    }
  },
  async (err, publicKey, privateKey) => {
    if (err) {
      throw err;
    }
    fs.appendFile(
      `${__dirname}/jwt/private-Key.key`,
      privateKey,
      function (err) {
        if (err) throw err;
        fs.appendFile(
          `${__dirname}/jwt/public-Key.pub`,
          publicKey,
          function (err) {
            if (err) throw err;
            console.info('Keys are generated');
          }
        );
      }
    );
    // Handle errors and use the generated key pair.
  }
);
