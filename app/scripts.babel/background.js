/**
 * Import class
 **/
import Transaction from './core/transaction';

(async () => {

  /*inject modules core*/
  const smartContract = new Transaction();
  const contract = await smartContract.contract();


  let privateKey = '';
  let transaction = await smartContract.transactionContractWithSigner(privateKey, contract,'addInfoCategory', [104, 'Exemplo']);

  console.log(transaction);


})();



