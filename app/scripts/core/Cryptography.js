import * as EthCrypto from 'eth-crypto';
import * as Passworder from 'browser-passworder';
import Ecies from 'ecies-parity';

/**
 * @class Cryptography
 * @description Class for manager cryptographyc with Elliptic curve using ecies library
 **/
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
      let encryptedData = await Ecies.encrypt(publicKey,message);
      return encryptedData;
    } catch (exception) {
      console.error('[Crypto - encrypt]' + exception);
    }
  }

  /**
   * @method encryptWithPublicKeyEcies
   * @description Method for encrypted message with public key using ecies
   * @param {String} privateKey - privateKey
   * @param {String} message - text in string for encript
   * @return {String} return a text encript
   * */
  static async encryptWithPublicKeyEcies(privateKey, message){
    try {
      let buffer = Buffer.from(privateKey, 'hex');
      let publicKey = Ecies.getPublic(buffer);
      return await Ecies.encrypt(publicKey, Buffer.from(message));
    } catch (exception) {
      console.error('[Crypto - encryptWithPublicKeyEcies]' + exception);
    }
  }


  /**
   * @method decryptedWithPrivateKeyEcies
   * @description Method for decrypt message with private key using ecies
   * @param {String} privateKey - privateKey
   * @param {String} message - text encrypted for decrypt
   * @return {String} return a text decrypted
   * */
  static async decryptedWithPrivateKeyEcies(privateKey, message){
    try {
      let buffer = Buffer.from(privateKey, 'hex');
      let serialisedCipher = Buffer.from(message, 'hex');
      return await Ecies.decrypt(buffer, serialisedCipher);
    } catch (exception) {
      console.error('[Crypto - decryptedWithPrivateKeyEcies]' + exception);
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
      return  EthCrypto.decryptWithPrivateKey(privateKey,encrypted);
    }catch(exception){
      console.error('[Crypto - decrypt]' + exception);
    }
  }


  static encryptWithPassworder(password, secrets){
    return Passworder.encrypt(password, secrets).then((blob) => {
      return blob;
    }).catch( error => {
      return error;
    });
  }


  static decryptWithPassworder(password, blob){
    return Passworder.decrypt(password, blob);
  }

}
