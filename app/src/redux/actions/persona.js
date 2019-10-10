/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { ethers } from 'ethers';
import abiDecoder from 'abi-decoder';
import Transactor from '../../../scripts/core/Transactor';
import store from '../store';
import { abi } from '../../../config/abi';
import * as ActionTypes from '../../constants/actionsTypes';
import { buildToast, ToastTypes } from '../../helper/toast';

const transactor = new Transactor();
abiDecoder.addABI(abi);

function checkWallet() {
  // console.log('action/persona/checkingWallet');
  if (!transactor.wallet) {
    if (store.getState().wallet.ethersWallet) {
      transactor.wallet = store.getState().wallet.ethersWallet;
      transactor.contractWithSigner;
      return true;
    }
    return false;
  }
  transactor.contractWithSigner;
  return true;
}

export function changeNetwork(networkID) {
  // console.log('actions/changeNetwork');
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  try {
    return (async (dispatch) => {
      dispatch({ type: 'RUNNING_METHOD' });
      const options = {};
      options.network = networkID;
      if (networkID === 1) {
        options.host = 'cloudflare-eth.com';
        options.port = '8545';
        options.provider = 'https';
      } else if (networkID === 4) {
        options.host = 'rinkeby.caralabs.me';
        options.port = '18545';
        options.provider = 'http';
      } else if (networkID === 99) {
        options.host = 'localhost';
        options.port = '8545';
        options.provider = 'http';
      }
      transactor.provider = options;
      // console.log('actions/changeNetwork/newProvider', transactor);
      dispatch({ type: 'METHOD_EXECUTED' });
    });
  // eslint-disable-next-line no-unreachable
  } catch (err) {
    dispatch({ type: 'TOASTY_ERROR', toast: buildToast('We not get change network. Try again later.', { type: ToastTypes.ERROR }) });
  }
}

export function getBalance() {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return (async (dispatch) => {
    const balance = await transactor.wallet.getBalance();
    // console.log('actions/getBalance', balance);
    dispatch({ type: 'GET_BALANCE', balance: ethers.utils.formatEther(balance) });
  });
}

export function getScore() {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return (async (dispatch) => {
    const score = await transactor.contract.score(transactor.wallet.address);
    dispatch({ type: 'GET_SCORE', validations: parseInt(score[1], 10), numberOfFields: parseInt(score[0], 10) });
  });
}

export function getPersonaData() {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  try {
    return (async (dispatch) => {
      // console.log('actions/getPersonaData');
      dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
      const novoPersonalInfo = await transactor.getPersonalInfo();
      // console.log('actions/getPersonaData/novoPersonalInfo', novoPersonalInfo);
      dispatch({
        type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo, address: transactor.wallet.address, numberOfFields: novoPersonalInfo.length,
      });
    });
  // eslint-disable-next-line no-unreachable
  } catch (err) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Get persona data failed' });
      dispatch({ type: 'TOAST_ERROR', toast: buildToast('We were unable to receive your data. Try again in a few minutes.', { type: ToastTypes.ERROR }) });
    };
  }
}

export function askToValidate(validator, field, uriConfirmationData) {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return async (dispatch) => {
    dispatch({ type: 'RUNNING_METHOD' });
    dispatch({ type: 'CLEAN_ERROR' });
    try {
      const txParams = {
        gasLimit: 3000000,
        value: ethers.utils.parseUnits('10000', 'wei'),
      };
      const tx = await transactor.contract.askToValidate(
        validator, field, uriConfirmationData, txParams,
      );
      if (tx) {
        const receipt = await tx.wait();
        // console.log('persona/askToValidate/receipt', receipt);
        if (receipt.status === 1) {
          const novoPersonalInfo = await transactor.getPersonalInfo();
          dispatch({ type: 'ASKED_TO_VALIDATE', personalInfo: novoPersonalInfo });
          dispatch({ type: 'TOAST_SUCCESS', toast: buildToast('Info send to validation!', { type: ToastTypes.SUCCESS }) });
        } else {
          dispatch({ type: 'ERROR_PERSONA_DATA', error: 'askToValidate: Transaction on Blockchain has failed' });
          dispatch({ type: 'TOAST_ERROR', toast: buildToast('Transaction on Blockchain has failed. Try again in a few minutes', { type: ToastTypes.ERROR }) });
        }
      } else {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to submit the validation request' });
        dispatch({ type: 'TOAST_ERROR', toast: buildToast('It was not possible to submit the validation request. Try again in a few minutes', { type: ToastTypes.ERROR }) });
      }
    } catch (exception) {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to get Persona data details' });
      dispatch({ type: 'TOAST_ERROR', toast: buildToast('It was not possible to get Persona data details. Try again in a few minutes', { type: ToastTypes.ERROR }) });
    }
  };
}

export function addData(infoCode, field, data, price) {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return (dispatch) => {
    dispatch({ type: 'RUNNING_METHOD' });
    dispatch({ type: 'CLEAN_ERROR' });
    // console.log('actions/persona/addData/ adding data', infoCode, 0, field, data, price);
    transactor._contract.addData(infoCode, 0, field, data, price)
      .then((tx) => {
        tx.wait()
          .then((newData) => {
            // console.log('actions/persona/addData/ data added', newData);
            const item = {
              field,
              valor: data,
              statusValidationDescription: 'NotValidated',
              statusValidationCode: 1,
            };
            // getPersonaData()
            dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item });
            dispatch({ type: 'TOAST_SUCCESS', toast: buildToast('Information added successfully!', { type: ToastTypes.SUCCESS }) });
          });
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: `Transaction failed: ${err}` });
        dispatch({ type: 'TOAST_ERROR', toast: buildToast('Transaction not executed. Try again later.', { type: ToastTypes.ERROR }) });
      });
  };
}

export async function addPersona(name, email) {
  // return async (dispatch) => {
  dispatch({ type: 'RUNNING_METHOD' });
  dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
  if (!checkWallet()) {
    return () => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }

  try {
    const atlasWallet = new ethers.Wallet('619CC0075FAC10253850ECEF582B7431FCC55CBCCD0A07BAE132EB1535F09855', transactor.provider);
    const giveEther = {
      gasLimit: 21000,
      to: transactor.wallet.address,
      value: ethers.utils.parseEther('0.01'),
      chainId: transactor.provider.chainId,
    };
    // send ethers to the persona's address
    const giveEtherTask = await atlasWallet.sendTransaction(giveEther);
    await giveEtherTask.wait();
  } catch (err) {
    dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: `Add funding: transaction failed${err}` });
    dispatch({ type: 'TOAST_ERROR', toast: buildToast('Fundings was not transfered to your wallet. Try again later.', { type: ToastTypes.ERROR }) });
  }

  try {
    const contractOptions = { gasLimit: 4000000 };
    // eslint-disable-next-line no-unused-expressions
    transactor.contractWithSigner;
    // add persona with field name by default
    const addPersonaTask = await transactor._contract.addPersona(1, 0, 'name', name, 0, contractOptions);
    await addPersonaTask.wait();

    let item = {
      field: 'name',
      valor: name,
      statusValidationDescription: 'NotValidated',
      statusValidationCode: 1,
    };
    dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item });

    // add persona's email field
    const addDataTask = await transactor._contract.addData(1, 0, 'email', email, 0, contractOptions);
    await addDataTask.wait();

    item = {
      field: 'email',
      valor: email,
      statusValidationDescription: 'NotValidated',
      statusValidationCode: 1,
    };
    dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item });
    dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
  } catch (err) {
    dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: `Add first data (name and email): failed${err}` });
    dispatch({ type: 'TOAST_ERROR', toast: buildToast('It was not possible create your Holon ID. Try again later.', { type: ToastTypes.ERROR }) });
  }
  return null;
}

export async function sendEthers(sendTo, sendValue) {
  // return (dispatch) => {
  dispatch({ type: 'RUNNING_METHOD' });
  if (!checkWallet()) {
    return () => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }

  try {
    const tx = {
      gasLimit: 21000,
      to: sendTo,
      value: ethers.utils.parseEther(sendValue),
      chainId: transactor.provider.chainId,
    };
    const transferEthers = await transactor.wallet.sendTransaction(tx);
    await transferEthers.wait();
    dispatch({ type: 'METHOD_EXECUTED' });
    dispatch({ type: 'TOAST_SUCCESS', toast: buildToast('Ether send sucessfully', { type: ToastTypes.SUCCESS }) });
  } catch (err) {
    dispatch({ type: 'TOAST_ERROR', toast: buildToast('We had a problem to make your transaction. Try again later.', { type: ToastTypes.ERROR }) });
  }
  return null;
}

export function GetPersonaNotifications() {
  return (async (dispatch) => {
    const personaNotifications = [];
    const notifications = await transactor.contract.GetRequestedFields();
    for (let notfIndex = 0; notfIndex < notifications[0].length; notfIndex++) {
      personaNotifications.push({
        requesterAddress: notifications[0][notfIndex],
        requesterName: notifications[1][notfIndex],
        field: notifications[2][notfIndex],
      });
    }
    dispatch({ type: 'GET_NOTIFICATIONS', notifications: personaNotifications });
  });
}

export async function deliverDecryptedData(decision, receiver, fieldName) {
  // return (async (dispatch) => {
  if (!checkWallet()) {
    return () => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }

  dispatch({ type: 'CLEAN_ERROR' });
  dispatch({ type: 'RUNNING_METHOD' });

  try {
    const tx = await transactor.contract.deliverDecryptedData(decision, receiver, fieldName);
    if (tx) {
      const receipt = await tx.wait(1);
      if (receipt.status === 1) {
        const personaNotifications = [];
        const notifications = await transactor.contract.GetRequestedFields();
        for (let notfIndex = 0; notfIndex < notifications[0].length; notfIndex++) {
          personaNotifications.push({
            requesterAddress: notifications[0][notfIndex],
            requesterName: notifications[1][notfIndex],
            field: notifications[2][notfIndex],
          });
        }
        dispatch({ type: 'GET_NOTIFICATIONS', notifications: personaNotifications });
        dispatch({ type: 'METHOD_EXECUTED' });
      } else {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'askToValidate: Transaction on Blockchain has failed' });
      }
    } else {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to submit the validation request' });
    }
  } catch (exception) {
    return () => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to get Persona data details' });
    };
  }
  return null;
}

export function allowNotification(receiver, fieldName) {
  return (dispatch) => this.deliverDecryptedData(true, receiver, fieldName)
    .then(
      () => {
        dispatch({
          type: 'TOASTY_SUCCESS',
          toast: buildToast('Data shared successfully!', { type: ToastTypes.SUCCESS }),
        });
      },
    )
    .catch(

      () => {
        dispatch({
          type: 'TOASTY_ERROR',
          toast: buildToast('Operation not executed. Try again later.', { type: ToastTypes.ERROR }),
        });
      },
    );
}

export function declineNotification(receiver, fieldName) {
  return (dispatch) => this.deliverDecryptedData(false, receiver, fieldName)
    .then(
      () => {
        dispatch({
          type: 'TOASTY_SUCCESS',
          toast: buildToast('Done! We will let the consumer know about your decision', { type: ToastTypes.SUCCESS }),
        });
      },
    )
    .catch(
      () => {
        dispatch({
          type: 'TOASTY_ERROR',
          toast: buildToast('Operation not executed. Try again later.', { type: ToastTypes.ERROR }),
        });
      },
    );
}