import SmartContract from './SmartContract';
import {Transaction} from 'ethereumjs-tx';

export  default class FilterEventsBlockchain extends SmartContract {


  constructor(filter) {
    super();

    this.filterData = filter;
  }

  /**
   * @method filterData
   * @desc Set basic data for filter events block chain ethereum
   * @param {Object} filter - object with param for filter blockchain
   *
   * @example
   * filterData ({ address: this._address,
      fromBlock: 4664439,
      toBlock: 'latest',
      topics: [ '0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf' ]
    })
   *
   * */
  set filterData (filter){
    if (!filter.address)
      filter.address = this._address;

    this._filterData = filter;
  }

  /**
   * @method filterData
   * @return filterData
   * */
  get filterData (){
    return this._filterData;
  }


  /**
   * @method getSenderPublicKey
   * @desc filter logs blockchain
   * @return {Promise}
   * */
  async getSenderPublicKey(src) {
    let listTransactionHash = await this.getLogsTransactionHash();
    let publicKey = null;
    for(let index = 0; index < listTransactionHash.length; index++){
        let transaction = await this.getTransaction(listTransactionHash[index]);
        let address = ('0x'+ transaction.getSenderAddress().toString('hex'));
        if (address.toLocaleLowerCase() == src.toLocaleLowerCase()){
          publicKey = transaction.getSenderPublicKey();
          break
        }
    }
    return publicKey;
  }

  /**
   * @method getTransaction
   * @desc filter transactions blockchain
   * @param {string} transactionHash - transaction hash blockchain
   * @return {Transaction}
   * */
  getTransaction(transactionHash) {
    return this.provider.getTransaction(transactionHash).then(data => {
      return new Transaction(data.raw, {chain: 4, hardfork: 'petersburg'});
    });
  }


  /**
   * @method getLogsTransactionHash
   * @desc filter logs blockchain
   * @return {Transaction}
   * */
  getLogsTransactionHash () {
    return this.provider.getLogs(this.filterData).then(data => data.map(item => {
      return item.transactionHash;
    }));
  }
}
