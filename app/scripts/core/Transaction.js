import {ethers} from 'ethers';
import SmartContract from './SmartContract';

export default class Transaction extends SmartContract {

  constructor(){
    super();
  }


  async transactionContractWithSigner (privateKey, contract, method, params){
    try {
      let wallet = new ethers.Wallet(privateKey, this.provider);
      let contractWithSigner = contract.connect(wallet);
      return await contractWithSigner[method].apply(null, params);
    } catch (exception) {
      console.error('[SmartContract] Error:' + exception);
    }
  }

}
