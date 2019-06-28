import Web3 from 'web3';
import Config from './config/abi';
import Settings from './config/settings';


class InPage {


  /**
   * create instance for smart contrat
   * @param {object} opts - option to initiate a smart contract
  */
  constructor(opts = new Object()){

    this._options = new Object();
    this._options.host = Settings.host || '127.0.0.1' ;
    this._options.port = Settings.port || '8545';
    this._options.provider = Settings.provider || 'https';
    Object.freeze(this._options);

    this._web3Instance = this.instance(this._options);
  }

  /**
  * function for inicializate web3 provider
  * @param {Object} options - options for instance inicializate
  * @return {Object} instance the web3 connection
  * */
  instance(options) {
    try{

      if (!options)
        throw  new Error('option is not defined');

      return new Web3(new Web3.providers.HttpProvider(`${options.provider}://${options.host}:${options.port}`));

    } catch(exception){
      console.error('[Inpage-instance] Error: ' + exception.message);
    }
  }

  /**
  * function for instance ethereum contract
  * @return {Object} contract instance
  * */
  contract() {
    try {
      let register = this._web3Instance.eth.contract(Config.abi);
      return register.at(Config.address);
    } catch (exception) {
      console.error('[Inpage-constract] Error: ' + exception.message)
    }
  }

}

module.exports = InPage;

