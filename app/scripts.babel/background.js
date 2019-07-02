/**
 * Import class
 **/
import Transaction from './core/transaction';

(async () => {

  /*inject modules core*/
  const smartContract = new Transaction();
  const contract = await smartContract.contract();

  debugger;

  let transaction = await smartContract.transactionContractWithSigner('B46A877F1BD0ABF2F30367AF0C4866B256DF87E5CF6E36AD4F25B7CA7465C661', contract,'addInfoCategory', [104, 'Exemplo']);

  console.log(transaction);


})();



