import {ethers} from 'ethers';
import SmartContract from './SmartContract';

export default class Transactor extends SmartContract {

  constructor(){
    super();
    this._wallet = new ethers.Wallet('FA757D8303BD902FB2E04E96C349023131050E321C04B2C3635839379D5B966B', this.provider);
  }


  async transactionContractWithSigner (contract, method, params){
    try {      
      let contractWithSigner = contract.connect(this._wallet);
      return await contractWithSigner[method].apply(null, params);
    } catch (exception) {
      console.error('[SmartContract] Error:' + exception);
    }
  }

  get contractWithSigner () {    
    return contract.connect(this._wallet);
  }

  get wallet() {
    return this._wallet;
  }
}
