import Wallet from '../../../scripts/core/WalletStorage';
import * as ActionTypes from '../../constants/actionsTypes';
import { buildToast, ToastTypes } from '../../helper/toast';

const wallet = new Wallet();

export function restoreVault(password, seed) {
  console.log('actions/wallet/restoreVault/starting');
  return (dispatch) => {
    wallet.createNewVaultAndRestore(password, seed)
      .then((wallet) => {
        console.log('actions/wallet/restoreVault/restored');
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: wallet.address,
          mnemonic: wallet.mnemonic,
          wallet,
        });
      })
      .catch((exception) => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      });
  };
}

export function hasWallet() {
  return (dispatch) => {
    wallet.getChromeStorage().then((content) => {
      if (!content) {
        dispatch({
          type: ActionTypes.HAS_WALLET,
          hasWallet: false,
        });
        return;
      }
      dispatch({
        type: ActionTypes.HAS_WALLET,
        hasWallet: true,
      });
    })
      .catch((exception) => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      });
  };
}

export function openWallet(password) {
  console.log('openWallet/password', password.length);
  return (async (dispatch) => {
    dispatch({ type: ActionTypes.OPEN_WALLET });
    await wallet.submitPassword(password)
      .then((wallet) => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: wallet.address,
          wallet,
          mnemonic: wallet.mnemonic,
        });
      })
      .catch((exception) => {
        dispatch({ type: ActionTypes.OPEN_WALLET_ERROR, error: exception });
        dispatch({ type: 'TOAST_ERROR', toast: buildToast('Incorrect password! Try again.', { type: ToastTypes.ERROR }) });
      });
  });
}

export function createNewWallet(password) {
  return (dispatch) => {
    console.log('actions/wallet/creating new wallet');
    wallet.createNewVault(password)
      .then((wallet) => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: wallet.address,
          wallet,
          mnemonic: wallet.mnemonic,
        });
      })
      .catch((exception) => {
        console.log('actions/wallet/createNewWallet', exception);
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      });
  };
}
