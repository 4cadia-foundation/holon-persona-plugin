import Wallet  from '../../scripts/core/WalletStorage';
import * as ActionTypes from '../constants/actionsTypes';
import {buildToast, ToastTypes} from "../helper/toast";

const wallet = new Wallet();

export function restoreVault(seed, password, dispatch) {
  return wallet.createNewVaultAndRestore(seed, password)
    .then((walletRestored) => {
      buildToast('Wallet restored with successful', {type: ToastTypes.SUCCESS});

      dispatch({
        type: ActionTypes.SET_ACCOUNTS,
        address: walletRestored.address,
        mnemonic: walletRestored.mnemonic,
        wallet: walletRestored,
      });

    })
    .catch(exception => {
      buildToast('Wallet not restored', {type: ToastTypes.ERROR});
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
