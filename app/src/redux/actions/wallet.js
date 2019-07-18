import Wallet  from '../../../scripts/core/WalletStorage';
import { buildToast, ToastTypes } from '../../helper/toast';
import * as ActionTypes from '../../constants/actionsTypes';

const wallet = new Wallet();

export function restoreVault(password, seed) {
  return dispatch => {
    wallet.createNewVaultAndRestore(password, seed)
      .then(vault => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          accounts: vault.keyrings[0].accounts,
          toast: buildToast('Wallet import with successful', ToastTypes.SUCCESS)
        });
      })
      .catch(exception => {
        dispatch({
          type: ActionTypes.SET_ACCOUNTS_ERROR,
          toast: buildToast(exception.message, ToastTypes.ERROR)
        });
      })
  }
}
