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
   * @method setEventToFilter
   * @desc Set an event to filter
   * '0xdf2fb7108dabed1e6a14fa2c8d51f354ab21c8d5d0734ea4828f4637993e4938' = DeliverData
   * '0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf' = NewData
   * '0xe0ed6b8656a7970b4fd31dfdfe4776138c549385ec553edc68a19c88cd075300' = LetMeSeeYourData
   * '0xf6da3522a535c33bdb2bc75b4c5bd4f39df957ed7245d7311ead1ec9594c8547' = ValidationResult
   * '0xd3b557f4e8a38a85c977c23ef0ce13669bfd8516c9efb3faa4053d9f2dfeeda6' = ValidateMe
   * 
   * Devido a bug no ethereumjs-tx só é possível filtrar logs de um evento (topico) por vez
   * */
  setEventToFilter(event) {
    this._filterData.topics[0] = event;
    //console.log('FilterEventsBlockchain/defineEventToFilter/Topic', this._filterData.topics[0]);
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
   * @method getPureTransaction
   * @desc filter transactions blockchain
   * @param {string} transactionHash - transaction hash blockchain
   * @return {Transaction}
   * */
  getPureTransaction(transactionHash) {
    return this.provider.getTransaction(transactionHash).then(data => {
      return data;
    });
  }

    /**
   * @method getTransactionReceipt
   * @desc filter receipt transactions blockchain
   * @param {string} transactionHash - transaction hash blockchain
   * @return {TransactionReceipt}
   * */
  getTransactionReceipt(transactionHash) {
    return this.provider.getTransactionReceipt(transactionHash).then(data => {
      return data;
    });
  }



  /**
   * @method getLogsTransactionHash
   * @desc filter logs blockchain
   * @return {Transaction}
   * */
  getLogsTransactionHash () {
    // console.log('FilterEventsBlockchain/getLogsTransactionHash', this.filterData);
    return this.provider.getLogs(this.filterData).then(data => data.map(item => {
      return item.transactionHash;
    }));
  }

    /**
   * @method getLogs
   * @desc filter logs blockchain
   * @return {Logs}
   * */
  getLogs () {
    return this.provider.getLogs(this.filterData).then(data => data.map(item => {
      return item;
    }));
  }

  getNewDataLogs() {
    return this.contract.filters.NewData(null, null, null, null)
  }
}
