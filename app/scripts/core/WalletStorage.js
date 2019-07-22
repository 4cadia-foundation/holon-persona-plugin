import KeyringController from 'eth-keyring-controller';
import SimpleKeyring from 'eth-simple-keyring';
import Cryptography from './Cryptography';
import { ethers } from 'ethers';

class WalletStorage {

  constructor() {
    this.keyringController = new KeyringController({
      keyringTypes: [SimpleKeyring],
      initState: {}.KeyringController,
        encryptor: undefined
    });

  }


  setChromeStorage(value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({'key': value}, () => {
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
          if(error) reject(error);
          resolve(result.key);
        });
    })

  }


  clearStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.clear(() =>{
          let error = chrome.runtime.lastError;
          if(error) reject(error);
          resolve('removed with successfull');
        })
    })
  }


  async createNewVaultAndRestore(seed, password) {
    return new Promise(async (resolve, reject) =>{
      try {
        /*TAREFA TECNICA NA PROXIMA SPRINT*/
        const vault = await this.keyringController.createNewVaultAndRestore(password, seed);
        const primaryKeyring = this.keyringController.getKeyringsByType('HD Key Tree')[0];

        /*PEGA CHAVE PUBLICA E PRIVADA*/
        const privateKey = primaryKeyring.wallets[0]._privKey.toString('hex');
        const publicKey = primaryKeyring.wallets[0]._pubKey.toString('hex');

        const encrypted = await Cryptography.encryptWithPassworder(password, {privateKey: privateKey, publicKey: publicKey});

        /*LIMPA O STORAGE*/
        const clear = await this.clearStorage();
        /*CRIA NOVO STORAGE*/
        const storage = await this.setChromeStorage(encrypted);
        const wallet = new ethers.Wallet(privateKey);
        resolve(wallet);
      }catch (exception) {
        console.log('createNewVaultAndRestore/exception', exception);
        reject(exception.message);
      }
    })


  }


  async submitPassword(password) {
    return new Promise(async (resolve, reject) => {
      try {
        const encrypted = await this.getChromeStorage();
        const decripted = await Cryptography.decryptWithPassworder(password, encrypted);
        const wallet = ethers.Wallet(decripted.privateKey);
        resolve(wallet);
      }catch (exception) {
        reject(exception.message);
      }
    })

  }

}

export default WalletStorage;
