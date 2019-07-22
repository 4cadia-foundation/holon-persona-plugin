import {ethers} from 'ethers';
import SmartContract from './SmartContract';

export default class Transactor extends SmartContract {

  constructor(){
    super();
    //this._wallet = new ethers.Wallet('C9FC81A1C5E60CD49DF15EB33667A69655468031873AF64930EF7A82A6A61076', this.provider);
  }


  get contractWithSigner () {   
    if (!this._wallet) {
      return null;
    }
    return this.contract.connect(this._wallet);
  }

  get wallet() {
    return this._wallet;
  }

  set wallet(paramWallet) {
    this._wallet = paramWallet;
  }
}
