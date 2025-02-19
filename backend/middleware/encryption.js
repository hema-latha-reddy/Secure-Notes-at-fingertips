import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/*import crypto from 'crypto';

// Generate a random key for AES encryption
const AES_KEY = crypto.randomBytes(32); // 32 bytes = 256-bit key
const AES_IV = crypto.randomBytes(16); // 16 bytes = IV

// Encrypt function
const encryptData = (data) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, AES_IV);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encryptedData: encrypted, iv: AES_IV.toString('hex') };
};

// Decrypt function
const decryptData = (encryptedData, iv) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, Buffer.from(iv, 'hex'));
  console.log(decipher)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export { encryptData,decryptData};*/

import crypto from 'crypto';

// Use environment variable for AES_KEY, fallback to hardcoded key for development
//const AES_KEY = process.env.AES_KEY;

// Convert the AES_KEY back to Buffer
if (!process.env.AES_KEY) {
  console.error('AES_KEY is not set. Please set it as an environment variable.');
  process.exit(1);
}

const AES_KEY_BUFFER = Buffer.from(process.env.AES_KEY, 'hex');

// Encrypt function
const encryptData = (data) => {
  const AES_IV = crypto.randomBytes(16); // Generate a random IV for each encryption
  const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY_BUFFER, AES_IV);

  //console.log('IV for Encryption:', AES_IV.toString('hex'));
  //console.log('AES_KEY_BUFFER:', AES_KEY_BUFFER.toString('hex'));

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encryptedData: encrypted, iv: AES_IV.toString('hex') };
};

// Decrypt function
const decryptData = (encryptedData, iv) => {
  //console.log("Decrypting Data:", encryptedData);
   // console.log("IV for Decryption:", iv);
  const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY_BUFFER,Buffer.from(iv, 'hex'));
  //console.log(decipher);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
 // console.log('Decrypted Data:', decrypted); 
  decrypted += decipher.final('utf8');
  //console.log('Final Decrypted Data:', decrypted); 
  return decrypted;
};

export { encryptData, decryptData };
