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

  setOpenedWalletStorage(value) {
    return new Promise((resolve, reject) => {
      console.log('setOpenedWalletStorage/starting');
      chrome.storage.local.set({ 'wallet_opened': value }, () => {
        console.log('setOpenedWalletStorage/promiss resolved');
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        console.log('setOpenedWalletStorage', value)
        resolve('value saved succesfully');
      })
    })
  }

  getOpenedWalletStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['wallet_opened'], (result) => {
        let error = chrome.runtime.lastError;
        if (error) {
          console.log('getOpenedWalletStorage/error', error)
          reject(error);
        }
        console.log('getOpenedWalletStorage/wallet', result, result.wallet_opened);
        if (!result.wallet_opened || !result.wallet_opened.address || !result.wallet_opened.latestUpdate || result.wallet_opened.address.length < 10) {
          reject({name : "WalletStateNotStoragedError", message : "Wallet State wast Not Stored Yet"});
        }
        console.log('result.wallet_opened', result.wallet_opened);
        console.log('getOpenedWalletStorage/time: ', (Date.now() - result.wallet_opened.latestUpdate))
        if ((Date.now() - result.wallet_opened.latestUpdate) > 120000) {
          this.clearOpenedWalletStorage();
          reject({name : "WalletStateTimeoutError", message : "Wallet State time out"});
        }
        resolve(result.wallet_opened);
      });
    })
  }

  clearOpenedWalletStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(['wallet_opened'], () => {
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        resolve('removed with successfull');
      })
    })
  }

  async createNewVaultAndRestore(seed, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const wallet = new ethers.Wallet.fromMnemonic(seed);

        //console.log('createNewVaultAndRestore/seed', seed);
        //console.log('createNewVaultAndRestore/wallet', wallet);
        const encrypted = await wallet.encrypt(password);
        //console.log('createNewVaultAndRestore/encrypted', encrypted);

        /*LIMPA O STORAGE*/
        const clear = await this.clearStorage();
        /*CRIA NOVO STORAGE*/
        const storage = await this.setChromeStorage(encrypted);
        //console.log('createNewVaultAndRestore/armazenado', storage);
        resolve(wallet);
      } catch (exception) {
        //console.log('createNewVaultAndRestore/exception', exception);
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
        //console.log('submitPassword/got wallet encrypted from store', encrypted);
        console.log('submitPassword/got wallet encrypted from store');
        const wallet = ethers.Wallet.fromEncryptedJson(encrypted, password);
        console.log('submitPassword/wallet decrypted');
        //const wallet = new ethers.Wallet('0x7c8e467bca952a0ff148a782c0146adec24c027a3724377e7d3255035b66f56b')
        //console.log('submitPassword/wallet', wallet);
        resolve(wallet);
      } catch (exception) {
        reject(exception.message);
      }
    })

  }

}

export default WalletStorage;
