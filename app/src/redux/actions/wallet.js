import Wallet from '../../../scripts/core/WalletStorage';
import * as ActionTypes from '../../constants/actionsTypes';

const wallet = new Wallet();

export function restoreVault(password, seed, dispatch) {
  console.log('actions/wallet/restoreVault/starting');
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

export const hasWallet = (dispatch) => {
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

export const openWallet = (password, dispatch) => {
  console.log('openWallet/password', password.length);
    wallet.submitPassword(password).then(openedWallet => {
      dispatch({
        type: ActionTypes.SET_ACCOUNTS,
        address: openedWallet.address,
        wallet: openedWallet,
        mnemonic: openedWallet.mnemonic,
      });
    })
    .catch(exception => {
      dispatch({
        type: ActionTypes.OPEN_WALLET_ERROR
      });
    })
}

export function createNewWallet(password){
  return dispatch=> {
    console.log('actions/wallet/creating new wallet');
    wallet.createNewVault(password)
    .then((createdWallet) => {
      dispatch({
        type: ActionTypes.SET_ACCOUNTS,
        address: createdWallet.address,
        wallet: createdWallet,
        mnemonic: createdWallet.mnemonic,
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
