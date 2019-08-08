import Wallet  from '../../../scripts/core/WalletStorage';
import * as ActionTypes from '../../constants/actionsTypes';
const wallet = new Wallet();

export function restoreVault(password, seed) {
  console.log('actions/wallet/restoreVault/starting');
  return dispatch => {
    wallet.createNewVaultAndRestore(password, seed)
      .then((wallet) => {
        console.log('actions/wallet/restoreVault/restored');
        dispatch({
          type: ActionTypes.SET_ACCOUNTS,
          address: wallet.address,
          mnemonic: wallet.mnemonic,
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
  console.log('passou por aqui')
  console.log('openWallet/password', password.length);
  return dispatch => {
    dispatch({type: 'ENABLE_LOADING', message: 'Openning wallet'})
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
    dispatch({type: 'DISABLE_LOADING'})
    console.log('finalizou')
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
