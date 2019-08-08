import {Transaction} from 'ethereumjs-tx';
import abiDecoder from 'abi-decoder';
import { abi, address } from '../../config/abi';

export default class FilterEventsBlockchain {

  constructor() {
    this._transactor = null;
    const filterNewData = {
      address: address,
      fromBlock: 4852633,
      toBlock: 'latest',
      topics: [],
    };
    this.filterData = filterNewData;
    this.contractDecoder = abiDecoder
    this.contractDecoder.addABI(abi);
  }

  set transactor(_transactor) {
    this._transactor = _transactor;
  }

  get transactor() {
    return this._transactor;
  }

  get provider() {
    return this._transactor._wallet.provider;
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
   * event NewData(address indexed persona, DataCategory dataCategory, uint infoCategory, string field);
     event ValidateMe(address indexed requester, address indexed validator, DataCategory dataCategory, string field, string data, string uriConfirmationData);
     event ValidationResult(address indexed persona, address indexed validator, string field, ValidationChoices result);
     event LetMeSeeYourData(address indexed requester, address indexed persona, string field);
     event DeliverData(bool accepted, address indexed persona, address indexed consumer, DataCategory dataCategory, string field, string data);
   * 
   * Devido a bug no ethereumjs-tx só é possível filtrar logs de um evento (topico) por vez
   * */
  setEventToFilter(eventName) {
    // this._filterData.topics[0] = ethers.utils.id('validateme(address indexed,address indexed,datacategory,string,string,string)')
    // console.log('FilterEventsBlockchain/defineEventToFilter/validateme1', this._filterData.topics[0], '0xd3b557f4e8a38a85c977c23ef0ce13669bfd8516c9efb3faa4053d9f2dfeeda6');
    if (eventName.toLowerCase() === 'newdata') {
      this._filterData.topics[0] = '0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf';
      //this._filterData.topics[0] = ethers.utils.id('NewData(address indexed persona,DataCategory dataCategory,uint infoCategory,string field)')
    } else if (eventName.toLowerCase() === 'validateme') {
      this._filterData.topics[0] = '0xd3b557f4e8a38a85c977c23ef0ce13669bfd8516c9efb3faa4053d9f2dfeeda6';
      //this._filterData.topics[0] = ethers.utils.id('validateme(address indexed,address indexed,datacategory,string,string,string)')
    } else if (eventName.toLowerCase() === 'validationresult') {
      this._filterData.topics[0] = '0xf6da3522a535c33bdb2bc75b4c5bd4f39df957ed7245d7311ead1ec9594c8547';
      //this._filterData.topics[0] = ethers.utils.id('ValidationResult(address indexed persona, address indexed validator, string field, ValidationChoices result)')
    } else if (eventName.toLowerCase() === 'letmeseeyourdata') {
      this._filterData.topics[0] = '0xe0ed6b8656a7970b4fd31dfdfe4776138c549385ec553edc68a19c88cd075300';
      // this._filterData.topics[0] = ethers.utils.id('LetMeSeeYourData(address indexed requester, address indexed persona, string field)')
    } else if (eventName.toLowerCase() === 'deliverdata') {
      this._filterData.topics[0] = '0xdf2fb7108dabed1e6a14fa2c8d51f354ab21c8d5d0734ea4828f4637993e4938';
      //this._filterData.topics[0] = ethers.utils.id('DeliverData(bool accepted, address indexed persona, address indexed consumer, DataCategory dataCategory, string field, string data)')
    }
    //this._filterData.topics[0] = event;
    // console.log('FilterEventsBlockchain/defineEventToFilter/Topic', eventName, this._filterData.topics[0]);
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
        let generatedAddress = ('0x'+ transaction.getSenderAddress().toString('hex'));
        if (generatedAddress.toLocaleLowerCase() == src.toLocaleLowerCase()){
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


  async getValidationRequestLogs(personaAddress) {
    //get logs of validation requests
    let validationRequests = []
    this.setEventToFilter('validateme');
    let askValidationHashes = await this.getLogsTransactionHash();
    //console.log('actions/getPersonaData/filterContract.VALIDATEME_EVENT', filterContract.VALIDATEME_EVENT)
    //console.log('actions/getPersonaData/askValidationHashes', askValidationHashes)
    for (let i=0; i<askValidationHashes.length; i++) {
        let receiptValidationHash = await this.getTransactionReceipt(askValidationHashes[i]);
        //console.log('actions/getPersonaData/receiptValidationHash', receiptValidationHash);
        let receiptValidationHashDecoded = this.contractDecoder.decodeLogs(receiptValidationHash.logs)
        receiptValidationHashDecoded = receiptValidationHashDecoded[0];
        //console.log('actions/getPersonaData/askValidationHashes/decoded', receiptValidationHashDecoded, personaAddress)
        //console.log('actions/getPersonaData/askValidationHashes/decoded', receiptValidationHashDecoded.events[0].value.toUpperCase(), personaAddress.toUpperCase(), receiptValidationHashDecoded.events[0].value.toUpperCase() === personaAddress.toUpperCase())
        if (receiptValidationHashDecoded.events[0].value.toUpperCase() === personaAddress.toUpperCase()) {
            validationRequests.push(receiptValidationHashDecoded.events)
            // console.log('actions/getPersonaData/validationRequests/events',receiptValidationHashDecoded.events);
            //console.log('actions/getPersonaData/validationRequests/parse', receiptValidationHashDecoded.events[3].value, ethers.utils.id("email"), ethers.utils.id("Birth data"), ethers.utils.id("name"));
        }
    }
    // console.log('FilterEventsBlockchain/validationRequests', validationRequests);
    return validationRequests;
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
