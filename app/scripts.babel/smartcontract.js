// import Config from './config/abi';
import Settings from './config/settings';
import NETWORK from './enums/network';
import {ethers} from 'ethers';
import axios from 'axios';

class SmartContract {


  /**
   * create instance for smart contrat
   * @param {object} opts - option to initiate a smart contract
  */
  constructor(opts = new Object()) {

    this._options = new Object();
    this._options.host = Settings.host || '127.0.0.1' ;
    this._options.port = Settings.port || '8545';
    this._options.provider = Settings.provider || 'https';
    this._options.network = Settings.network || NETWORK.RINKEBYTESTNETWORK;


    Object.freeze(this._options);

    this._instance = this._initialize(this._options);


  }

  /**
  * function for inicializate
  * @param {Object} options - options for instance inicializate
  * @return {Object} instance the web3 connection
  **/
  _initialize(options) {
    try {
      if (!options)
        throw  new Error('option is not defined');
        return new ethers.providers.JsonRpcProvider(`${options.provider}://${options.host}:${options.port}`);

    } catch(exception) {
      console.error('[Inpage-instance] Error: ' + exception.message);
    }
  }

  /**
   * function for getInstance
   * @return {Object} contract instance
   * */
  get instance() {
    return this._instance;
  }

  /**
  * function for instance ethereum contract
  * @return {Object} contract instance
  * */
  async contract () {
    try {
      let {address, abi} = await this._config();
      return new ethers.Contract(address, abi, this._instance);
    } catch (exception) {

      console.error('[Inpage-constract] Error: ' + exception.message)
    }
  }

  async _config () {
    return await axios.get('./config/abi.json')
      .then((response) => {
        return response.data;
        // return callback(response.data);
      })
      .catch((exception) => {
        console.error('[SmartContract] Error: ' + exception);
      });
  }


}

module.exports = SmartContract;

