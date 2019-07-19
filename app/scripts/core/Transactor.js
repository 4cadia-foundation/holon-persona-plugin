import {ethers} from 'ethers';
import SmartContract from './SmartContract';

export default class Transactor extends SmartContract {

  constructor(){
    super();
    this._wallet = new ethers.Wallet('FA757D8303BD902FB2E04E96C349023131050E321C04B2C3635839379D5B966B', this.provider);
  }


  get contractWithSigner () {    
    return this.contract.connect(this._wallet);
  }

  get wallet() {
    return this._wallet;
  }
}
