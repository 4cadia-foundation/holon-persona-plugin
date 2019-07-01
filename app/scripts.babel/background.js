import SmartContract from './smartcontract';


//instanciando as informações que são utilizadas nas página
const smartContract = new SmartContract();
const contract = smartContract.contract;


chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Olá'});


