import Wallet  from '../../../scripts/core/WalletStorage';
import * as ActionTypes from '../../constants/actionsTypes';
const wallet = new Wallet();

export function restoreVault(password, seed) {
  console.log('actions/wallet/restoreVault/starting');
  return dispatch => {
    wallet.createNewVaultAndRestore(password, seed)
      .then((walletResult) => {
        const walletObj = { type: ActionTypes.SET_ACCOUNTS, address: walletResult.address, mnemonic: walletResult.mnemonic, wallet: walletResult };
        wallet.setOpenedWalletStorage(walletObj);
        console.log('actions/wallet/restoreVault/restored');
        dispatch(walletObj);
      })
      .catch(exception => {
        console.error('restoreVault/error:', exception);
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      })
  }
}

export function checkWalletStorage(dispatch) {
  console.log('action/wallet/checkWalletStorage/starting')
  wallet.getOpenedWalletStorage()
  .then ( (objWalletData) => {
      console.log('action/wallet/checkWalletStorage/objWalletData', objWalletData);
      dispatch(objWalletData);
      dispatch({ type: 'HAS_CHECKED_WALLET_STORAGE' });
  })
  .catch ( (err) => {
      dispatch({ type: 'HAS_CHECKED_WALLET_STORAGE' });
      console.log('actions/checkWalletStorage/failed', err.message);    
  });
}

export function hasWallet() {
  return dispatch => {
    wallet.getChromeStorage().then((content) => {
      if (!content) {
        dispatch({
          type: ActionTypes.HAS_WALLET,
          hasWallet: false
        });  
        return;
      }
      dispatch({
        type: ActionTypes.HAS_WALLET,
        hasWallet: true
      });
    })
    .catch(exception => {
      dispatch({
        type: ActionTypes.SET_ACCOUNTS_ERROR
      });
    })
  }
}

export function openWallet(password) {
  console.log('openWallet/password', password.length);
  return dispatch => {
    wallet.submitPassword(password).then(walletResult => {
      const walletObj = { type: ActionTypes.SET_ACCOUNTS, address: walletResult.address, mnemonic: walletResult.mnemonic, wallet: walletResult };
      console.log('openWallet/success');
      wallet.setOpenedWalletStorage(walletObj);
      dispatch(walletObj);
    })
    .catch(exception => {
      console.error('openWallet/error:', exception);
      dispatch({
        type: ActionTypes.OPEN_WALLET_ERROR
      });
    })
  }
}

export function createNewWallet(password){
  return dispatch=> {
    console.log('actions/wallet/creating new wallet');
    wallet.createNewVault(password)
    .then((walletResult) => {
      const walletObj = { type: ActionTypes.SET_ACCOUNTS, address: walletResult.address, mnemonic: walletResult.mnemonic, wallet: walletResult };
      wallet.setOpenedWalletStorage(walletObj);
      dispatch(walletObj);
    })
    .catch((exception) => {
      console.log('actions/wallet/createNewWallet', exception);
      dispatch({
        type: ActionTypes.SET_ACCOUNTS_ERROR,
      });
    });
  }
}
