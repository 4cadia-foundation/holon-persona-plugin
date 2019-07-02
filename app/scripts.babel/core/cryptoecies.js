import ecies from 'ecies-parity';

/**
 * @class CryptoEcies
 * @description Class for manager cryptographyc with Elliptic curve using ecies library
 **/
class CryptoEcies {

  /**
   * @method encrypt
   * @description Method for encripted message with public key
   * @param {String} publicKey - public key
   * @param {String} message - message for encrypt
   * @return {Object} return a object with message encrypted
   * */
  static async encrypt(publicKey, message) {
    try {
      return await ecies.encrypt(publicKey, Buffer.from(message));
    } catch (exception) {
      console.error('[Crypto - decrypt]' + exception);
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
      return ecies.decrypt(privateKey, encrypted).then(plaintext => plaintext.toString());
    }catch(exception){
      console.error('[Crypto - decrypt]' + exception);
    }
  }

}

module.exports = CryptoEcies;