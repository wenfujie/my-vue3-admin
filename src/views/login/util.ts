import JSEncrypt from 'jsencrypt';

export function encodePassword(password: string): string {
  const publicKey = `-----BEGIN PUBLIC KEY-----
  xxxxxxx
  -----END PUBLIC KEY-----`;

  // rsa加密
  const encryptor = new JSEncrypt();

  encryptor.setPublicKey(publicKey);

  return encryptor.encrypt(password) as string;
}
