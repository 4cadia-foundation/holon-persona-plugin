import Config from './config';
import SmartContract from './smartcontract';
import {Transaction} from 'ethereumjs-tx';
import * as Utils from 'ethereumjs-util';
import Cryptography from './cryptography';
// import * as EthCrypto from 'eth-crypto';


class FilterEventsBlockChain extends SmartContract {

  constructor(filterData) {
    super();
    this._filterData = {
      address: this._address,
      fromBlock: 4664439,
      toBlock: 'latest',
      topics: [ '0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf' ]
    };
  }

  get filterData (){
    return this._filterData;
  }

  async filterInitialization(){
    await this.smartContractInitialization();
  }

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

  getTransaction(transactionHash) {
    return this.provider.getTransaction(transactionHash).then(data => {
      return new Transaction(data.raw, {chain: 4, hardfork: 'petersburg'});
    });
  }


  getLogsTransactionHash () {
    return this.provider.getLogs(this.filterData).then(data => data.map(item => {
      return item.transactionHash;
    }));


    // debugger;
    // let logs = await this.provider.getLogs(this.filterData);
    //
    // logs.filter(blockTransaction => {
    //
    //     let tx = this.provider.getTransaction(blockTransaction.transactionHash);
    //
    //     const transaction = new Transaction(tx.raw);
    //     const txAddress = ('0x'+ transaction.getSenderAddress().toString('hex'));
    //     return txAddress === addressFiltered;
    // })
    // debugger;



    // this.provider.getLogs(filter).then((result) => {
    //   result.filter(tx => {
    //     return

       // this.provider.getTransaction(item.transactionHash).then(transactionBlockchain => {
       //
       //    const transaction = new Transaction(transactionBlockchain.raw);
       //    let address = ('0x'+ transaction.getSenderAddress().toString('hex'));
       //
       //
       //
       //    // if ( address.toLocaleLowerCase() == '0x1c5fBDf725C093c52A8464d226d7cf68c2605Ec0'.toLocaleLowerCase()){
       //    //
       //    //   let publicKey = transaction.getSenderPublicKey();
       //    //   console.log(`public key ${publicKey.length} bytes of random data: ${publicKey.toString('hex')}`);
       //    //
       //    //
       //    //   let privateKey = '37CB7B1DEF9DC0F219DB7D0A0D14E2F1E25609FE2CFE31C8DA6DA70EAFB43E2F';
       //    //
       //    //   const alice = EthCrypto.createIdentity();
       //    //   console.log(`public key ${alice.publicKey.length} bytes of random data: ${alice.publicKey}`);
       //    //   Cryptography.encrypt(publicKey, 'example');
       //    //
       //    //
       //    //   // EthCrypto.encryptWithPublicKey(
       //    //   //   publicKey.toString('hex'), // encrypt with alice's publicKey
       //    //   //   'Voce nao vai passar'
       //    //   // ).then(encrypted => {
       //    //   //   debugger
       //    //   //   console.log(encrypted);
       //    //   //
       //    //   //   EthCrypto.decryptWithPrivateKey(
       //    //   //     privateKey,
       //    //   //     encrypted
       //    //   //   ).then(
       //    //   //     result => {
       //    //   //       debugger;
       //    //   //       console.log('decript' result);
       //    //   //     }
       //    //   //   );
       //    //   //
       //    //   //
       //    //   // });
       //    //
       //    // }
       //
       //  });


      // })
    // });


  }
}

module.exports = FilterEventsBlockChain;