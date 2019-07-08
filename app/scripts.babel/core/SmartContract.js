import Settings from '../../config/settings';
import NETWORK from '../enums/Network';
import {ethers} from 'ethers';
import Config from './Config';

class SmartContract {

  /**
   * create instance for smart contrat
   * @param {object} opts - option to initiate a smart contract
  */
  constructor(opts = new Object()) {

    this._instance = null;
    this._provider = null;
    this._options = new Object();
    this._options.host = Settings.host || '127.0.0.1' ;
    this._options.port = Settings.port || '8545';
    this._options.provider = Settings.provider || 'https';
    this._options.network = Settings.network || NETWORK.RINKEBYTESTNETWORK;
    this._address = null;
    this._abi = null;
    Object.freeze(this._options);
    this.provider = this._options;

  }

  async smartContractInitialization () {
    let {address, abi} = await Config.loadConfigJSON('./config/abi.json');
    this._address = address;
    this._abi = abi;
  }


  set provider (options) {
    try {
      if (!options)
        throw  new Error('option is not defined');
      this._provider = new ethers.providers.JsonRpcProvider(`${options.provider}://${options.host}:${options.port}`);

    } catch(exception) {
      console.error('[Inpage-instance] Error: ' + exception.message);
    }
  }

  /**
   * function for get provider
   * @return {Object} provider instance
   * */
  get provider() {
    return this._provider;
  }



  async contract () {
    try {
      return new ethers.Contract(this._address, this._abi, this.provider);
    } catch (exception) {
      console.error('[Inpage-constract] Error: ' + exception.message);
    }
  }


}

module.exports = SmartContract;

