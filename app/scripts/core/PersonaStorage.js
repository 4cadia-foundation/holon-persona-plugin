export default class PersonaStorage {

  setChromeStorage(value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({'persona': value }, () => {
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        console.log('setChromeStorage', value)
        resolve('value save with succesfull');
      })
    })
  }

  getChromeStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['persona'], (result) => {
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        console.log('getChromeStorage', result.persona);
        if (!result.persona || !result.persona.numberOfFields || result.persona.numberOfFields < 1) {
          reject({name : "PersonaStateNotStoragedError", message : "Persona State wast Not Stored Yet"});
        }
        resolve(result.persona);
      });
    })

  }


  clearPersonaStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(['persona'], () => {
        let error = chrome.runtime.lastError;
        if (error) reject(error);
        resolve('removed successfully');
      })
    })
  }
}