import Wallet from '../../../scripts/core/WalletStorage';
import * as ActionTypes from '../../constants/actionsTypes';

const wallet = new Wallet();

export function restoreVault(password, seed) {
  console.log('actions/wallet/restoreVault/starting');
  return dispatch => {
    wallet.createNewVaultAndRestore(password, seed)
      .then((createdWallet) => {
        console.log('actions/wallet/restoreVault/restored');
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: createdWallet.address,
          mnemonic: createdWallet.mnemonic,
          wallet: createdWallet       
        });
      })
      .catch(exception => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      })
  }
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
    wallet.submitPassword(password).then(wallet => {
      dispatch({
        type: ActionTypes.SET_ACCOUNTS,
        address: wallet.address,
        wallet: wallet,
        mnemonic: wallet.mnemonic,
      });
    })
    .catch(exception => {
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
    .then((wallet) => {
      dispatch({
        type: ActionTypes.SET_ACCOUNTS,
        address: wallet.address,
        wallet: wallet,
        mnemonic: wallet.mnemonic,       
      });
    })
    .catch((exception) => {
      console.log('actions/wallet/createNewWallet', exception);
      dispatch({
        type: ActionTypes.SET_ACCOUNTS_ERROR,
      });
    });
  }
}
