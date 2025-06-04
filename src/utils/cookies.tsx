// utils/auth.ts
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY!; // Keep this safe (use env for production)

/**
 * Encrypt the token
 */
export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

/**
 * Decrypt the token
 */
export const decryptToken = (encryptedToken: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};

/**
 * Set encrypted token in cookies
 */
export const setEncryptedToken = (token: string) => {
  const encrypted = encryptToken(token);
  Cookies.set('token', encrypted, {
    expires: 7,
    secure: true,
    sameSite: 'Strict',
  });
};

/**
 * Get decrypted token from cookies
 */
export const getDecryptedToken = (): string | null => {
  const encryptedToken = Cookies.get('token');
  if (!encryptedToken) return null;
  return decryptToken(encryptedToken);
};

/**
 * Remove token
 */
export const removeToken = () => {
  Cookies.remove('token');
};
