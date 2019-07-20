import Wallet  from '../../../scripts/core/WalletStorage';
import { buildToast, ToastTypes} from '../../helper/toast';
import * as ActionTypes from '../../constants/actionsTypes';

const wallet = new Wallet();

export function restoreVault(password, seed) {
  return dispatch => {
    wallet.createNewVaultAndRestore(password, seed)
      .then(vault => {
        debugger;
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          accounts: vault.keyrings[0].accounts,
          toast: buildToast('Wallet import with successful', {type: ToastTypes.SUCCESS})
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

export function openWallet(password) {
  return dispatch => {
    wallet.submitPassword(password).then(wallet => {
      dispatch({
        type: ActionTypes.OPEN_WALLET,
        wallet: wallet,
        toast: buildToast('Open wallet with successful', {type: ToastTypes.SUCCESS})
      });
    })
      .catch(exception => {
        dispatch({
          type: ActionTypes.OPEN_WALLET_ERROR,
          toast: buildToast(exception.message, {type: ToastTypes.ERROR})
        });
      })
  }
}
