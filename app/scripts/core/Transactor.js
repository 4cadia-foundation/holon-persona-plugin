import {ethers} from 'ethers';
import SmartContract from './SmartContract';

export default class Transactor extends SmartContract {

  constructor(){
    super();
    this._wallet = new ethers.Wallet('4f711082ece7191a111ab86bc46ba93ba0b0c34c2b5f7d6d585a1e8f3832e576', this.provider);
  }

  get contractWithSigner () {    
    return this.contract.connect(this._wallet);
  }

  get wallet() {
    return this._wallet;
  }
}
