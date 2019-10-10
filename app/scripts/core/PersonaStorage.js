export default class PersonaStorage {
  setChromeStorage(value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ persona: value }, () => {
        const error = chrome.runtime.lastError;
        if (error) reject(error);
        resolve('value save with succesfull');
      });
    });
  }


  getChromeStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('persona', (result) => {
        const error = chrome.runtime.lastError;
        if (error) reject(error);
        if (!result.numberOfFields || result.numberOfFields < 1) reject({ name: 'PersonaStateNotStoragedError', message: 'Persona State wast Not Storaged Yet' });
        resolve(result);
      });
    });
  }


  clearPersonaStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(['persona'], () => {
        const error = chrome.runtime.lastError;
        if (error) reject(error);
        resolve('removed successfully');
      });
    });
  }
}