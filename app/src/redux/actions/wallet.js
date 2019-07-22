import Wallet  from '../../../scripts/core/WalletStorage';
import * as ActionTypes from '../../constants/actionsTypes';
const wallet = new Wallet();

export function restoreVault(password, seed) {
  return dispatch => {
    wallet.createNewVaultAndRestore(password, seed)
      .then((wallet) => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: wallet.address,
          wallet: wallet       
        });
      })
      .catch(exception => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
        });
      })
  }
}

export function openWallet(password) {
  return dispatch => {
    wallet.submitPassword(password).then(wallet => {
      dispatch({
        type: ActionTypes.OPEN_WALLET,
        address: wallet.address,
        wallet: wallet
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
  debugger;
  return dispatch=> {
    wallet.createNewWallet(password)
    .then(vault => {
      dispatch({
        type: ActionTypes.SET_WALLET_CREATE,
        accounts: vault.keyrings[0].accounts,
        toast: buildToast('Wallet create with successful', {type: ToastTypes.SUCCESS})
      });
    })
    .catch(exception => {
      dispatch({
        type: ActionTypes.SET_ACCOUNTS_ERROR,
        toast: buildToast(exception.message, {type: ToastTypes.ERROR})
      });
    })
  }
}
