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
