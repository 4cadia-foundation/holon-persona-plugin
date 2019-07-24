import { ethers } from 'ethers';
import SmartContract from './SmartContract';

export default class Transactor extends SmartContract {

  constructor() {
    super();
  }

  setInternalProvider() {
    this.provider = this._options;
  }

  get contractWithSigner() {
    if (!this._wallet) {
      return null;
    }
    this._wallet = this._wallet.connect(this.provider);
    this._contract = this.contract.connect(this._wallet);
  }

  get wallet() {
    return this._wallet;
  }

  set wallet(paramWallet) {
    this._wallet = paramWallet;
  }
}
