import * as EthCrypto from 'eth-crypto';
import * as Passworder from 'browser-passworder';


/**
 * @class Cryptography
 * @description Class for manager cryptographyc with Elliptic curve using ecies library
 * */
export default class Cryptography {
  /**
   * @method encrypt
   * @description Method for encripted message with public key
   * @param {String} publicKey - public key
   * @param {String} message - message for encrypt
   * @return {Object} return a object with message encrypted
   * */
  static async encrypt(publicKey, message) {
    try {
      return await EthCrypto.encryptWithPublicKey(publicKey, message);
    } catch (exception) {
      console.error(`[Crypto - encrypt]${exception}`);
    }
  }

  /**
   * @method decrypt
   * @description Method for decrypt message with private key
   * @param {String} privateKey - privateKey
   * @param {String} encrypted - text encrypted for decrypt
   * @return {String} return a text decrypted
   * */
  static async decrypt(privateKey, encrypted) {
    try {
      return EthCrypto.decryptWithPrivateKey(privateKey, encrypted);
    } catch (exception) {
      console.error(`[Crypto - decrypt]${exception}`);
    }
  }


  static encryptWithPassworder(password, secrets) {
    return Passworder.encrypt(password, secrets).then((blob) => blob).catch((error) => error);
  }


  static decryptWithPassworder(password, blob) {
    return Passworder.decrypt(password, blob);
  }
}
