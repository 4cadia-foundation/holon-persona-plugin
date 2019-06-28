import InPage from './inpage';

(async () => {

  const inpage = new InPage();
  const web3 = inpage.getInstance();

  let nonce = await inpage.getNonce('0xdA26a8415346642850066f9912594E9b0f2662B2');

  let options = {
    from: '0xdA26a8415346642850066f9912594E9b0f2662B2',
    gasPrice: '20000000000',
    nonce: nonce,
    gas: '4419583',
    to: '0x80D475E1756ef1F2E918417AC4f9ae03E50CE59C',
    value: '',
    data: ''
  };
  debugger;
  web3.eth.signTransaction(options).then((response) => {
    console.log(response);
  });

})();


//privatekey = B46A877F1BD0ABF2F30367AF0C4866B256DF87E5CF6E36AD4F25B7CA7465C661
// const privateKey = new Buffer('B46A877F1BD0ABF2F30367AF0C4866B256DF87E5CF6E36AD4F25B7CA7465C661', 'hex');
//



// const rawTx = {
//   nonce: '0x00',
//   gasPrice: '0x09184e72a000',
//   gasLimit: '0x2710',
//   to: '0x0000000000000000000000000000000000000000',
//   value: '0x00',
//   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
// }



//
// let options = {
//   from: '0xdA26a8415346642850066f9912594E9b0f2662B2',
//   gasPrice: '20000000000',
//   gas: '4419583',
//   to: '0x80D475E1756ef1F2E918417AC4f9ae03E50CE59C',
//   value: '',
//   data: ''
// };
// debugger;
// web3.eth.signTransaction(options).then(console.log);
//
//
//
// // contract.addInfoCategory(1, 'exemplo', {from: '0xdA26a8415346642850066f9912594E9b0f2662B2'}, (error, result) => {
// //
// //   if (!error)
// //     console.log(result);
// //
// // });



chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Olá'});
