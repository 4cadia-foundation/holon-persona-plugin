import { ethers } from 'ethers';
import Transactor from './Transactor';

class WalletStorage {

  setChromeStorage(value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ 'key': value }, () => {
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        resolve('value save with succesfull');
      })
    })
  }


  getChromeStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['key'], (result) => {
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        resolve(result.key);
      });
    })

  }


  clearStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        resolve('removed with successfull');
      })
    })
  }


  async createNewVaultAndRestore(seed, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let transactor = new Transactor();
        const wallet = new ethers.Wallet.fromMnemonic(seed);

        //console.log('createNewVaultAndRestore/seed', seed);
        //console.log('createNewVaultAndRestore/wallet', wallet);
        const encrypted = await wallet.encrypt(password);
        console.log('createNewVaultAndRestore/encrypted', encrypted);

        /*LIMPA O STORAGE*/
        const clear = await this.clearStorage();
        /*CRIA NOVO STORAGE*/
        const storage = await this.setChromeStorage(encrypted);
        console.log('createNewVaultAndRestore/armazenado', storage);
        resolve(wallet);
      } catch (exception) {
        console.log('createNewVaultAndRestore/exception', exception);
        reject(exception.message);
      }
    })
  }

  async createNewVault(password) {
    try {
      const wallet = ethers.Wallet.createRandom();
      const randomMnemonic = wallet.mnemonic;
      //console.log('createNewVault/randomMnemonic', randomMnemonic);
      return this.createNewVaultAndRestore(randomMnemonic, password);
    } catch (exception) {
      console.log('createNewVault/exception', exception);
      return exception;
    }
  }


  async submitPassword(password) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('submitPassword');
        const encrypted = await this.getChromeStorage();
        if (!encrypted) {
          reject("wallet was not found in storage");
          return
        }
        //console.log('submitPassword/encrypted', encrypted);
        const wallet = ethers.Wallet.fromEncryptedJson(encrypted, password);
        // console.log('submitPassword/wallet', wallet);
        resolve(wallet);
      } catch (exception) {
        reject(exception.message);
      }
    })

  }

}

export default WalletStorage;
