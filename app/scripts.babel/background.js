import Transaction from './core/transaction';

(async () => {

  const smartContract = new Transaction();
  const contract = await smartContract.contract();
  const privateKey = '';

  //exemplo
  let transaction = await smartContract.transactionContractWithSigner(privateKey, contract,'addInfoCategory', [105, 'Exemplo4']);

  console.log(transaction);

})();

