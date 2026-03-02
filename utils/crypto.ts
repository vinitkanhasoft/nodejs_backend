import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateUUID = (): string => {
  return crypto.randomUUID();
};

export const hashString = (value: string, algorithm: string = 'sha256'): string => {
  return crypto.createHash(algorithm).update(value).digest('hex');
};

export const hashPassword = async (password: string, saltRounds: number = 10): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateApiKey = (): string => {
  const prefix = 'ak_';
  const randomPart = crypto.randomBytes(24).toString('base64').replace(/[+/=]/g, '').substring(0, 32);
  return prefix + randomPart;
};

export const generateSessionToken = (): string => {
  return crypto.randomBytes(32).toString('base64');
};

export const createHMAC = (data: string, secret: string, algorithm: string = 'sha256'): string => {
  return crypto.createHmac(algorithm, secret).update(data).digest('hex');
};

export const verifyHMAC = (data: string, signature: string, secret: string, algorithm: string = 'sha256'): boolean => {
  const expectedSignature = createHMAC(data, secret, algorithm);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
};

export const encryptData = (data: string, key: string, algorithm: string = 'aes-256-cbc'): { encrypted: string; iv: string } => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encrypted,
    iv: iv.toString('hex')
  };
};

export const decryptData = (encryptedData: { encrypted: string; iv: string }, key: string, algorithm: string = 'aes-256-cbc'): string => {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(encryptedData.iv, 'hex'));
  
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

export const generateSecureRandom = (min: number, max: number): number => {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  // const maxUint = Math.pow(256, bytesNeeded) - 1;
  const randomBytes = crypto.randomBytes(bytesNeeded);
  const randomValue = randomBytes.reduce((acc, byte) => acc * 256 + byte, 0);
  
  return min + (randomValue % range);
};

export const createHashedId = (data: string, length: number = 8): string => {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash.substring(0, length);
};

export const generateTOTPSecret = (): string => {
  return crypto.randomBytes(20).toString('base64').replace(/[=/]/g, '');
};

export const verifyTOTP = (token: string, secret: string, window: number = 1): boolean => {
  const timeStep = Math.floor(Date.now() / 1000 / 30);
  
  for (let i = -window; i <= window; i++) {
    const time = timeStep + i;
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64BE(BigInt(time), 0);
    
    const hmac = crypto.createHmac('sha1', Buffer.from(secret, 'base64'));
    hmac.update(buffer);
    const hash = hmac.digest();
    
    const offset = hash[hash.length - 1] & 0x0f;
    const code = (
      ((hash[offset] & 0x07) << 24) |
      ((hash[offset + 1] & 0xff) << 16) |
      ((hash[offset + 2] & 0xff) << 8) |
      (hash[offset + 3] & 0xff)
    ) % 1000000;
    
    if (code.toString().padStart(6, '0') === token) {
      return true;
    }
  }
  
  return false;
};