import { ethers } from 'ethers';
import Transactor from '../../../scripts/core/Transactor';
import FilterEventsBlockchain from '../../../scripts/core/FilterEventsBlockchain';
import store from '../store';
import { address, abi } from '../../../config/abi';
import * as ValidationHelper from '../../helper/validations';
import abiDecoder from 'abi-decoder';
import * as ActionTypes from "../../constants/actionsTypes";

// const wallet = new WalletStorage();

const transactor = new Transactor();
const filterNewData = {
  address: address,
  fromBlock: 4802349,
  toBlock: 'latest',
  topics: ['0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf']
};
const filterContract = new FilterEventsBlockchain(filterNewData);
var validationRequests = [];
var validationRequestCheck = false;
var validations = [];
abiDecoder.addABI(abi);

async function loadValidationRequest() {
  console.log('actions/loadValidationRequest');
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  validationRequests = await filterContract.getValidationRequestLogs(transactor.wallet.address);
  validationRequestCheck = true;
  console.log('actions/loadValidationRequest/validationRequests', validationRequests);
  return validationRequests;
}

function checkWallet() {
  console.log('action/persona/checkingWallet');
  //console.log('action/persona/checkWallet/globalState', store.getState());
  //console.log('action/persona/checkWallet/transactor.wallet', transactor.wallet);
  if (!transactor.wallet) {
    if (store.getState().wallet.ethersWallet) {
      transactor.wallet = store.getState().wallet.ethersWallet;
      transactor.contractWithSigner;
      //console.log('action/persona/checkWallet/transactor.wallet-set', transactor.wallet);
      return true;
    } else {
      return false;
    }
  } else {
    transactor.contractWithSigner;
    return true;
  }
}

export function changeNetwork(networkID) {
  console.log('actions/changeNetwork');
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return async (dispatch) => {
    dispatch({ type: 'RUNNING_METHOD' });
    let options = new Object();
    options.network = networkID;
    if (networkID === 1) {
      options.host = 'cloudflare-eth.com';
      options.port = '8545';
      options.provider = 'https';

    } else if (networkID === 4) {
      options.host = 'rinkeby.caralabs.me' ;
      options.port = '18545';
      options.provider = 'http';
    } else if (networkID === 99) {
      options.host = 'localhost' ;
      options.port = '8545';
      options.provider = 'http';
    }
    transactor.provider = options;
    console.log('actions/changeNetwork/newProvider', transactor);
    // getBalance();
    // getScore();
    // getPersonaData();
    dispatch({ type: 'METHOD_EXECUTED' });
  };
}

export function getBalance() {
  console.log('actions/getBalance');
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return async (dispatch) => {
    const balance = await transactor.wallet.getBalance();
    console.log('actions/getBalance', balance);
    dispatch({ type: 'GET_BALANCE', balance: ethers.utils.formatEther(balance) });
  };
}

export function getScore() {
  console.log('actions/getScore');
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return async (dispatch) => {
    const score = await transactor.contract.score(transactor.wallet.address);
    console.log('actions/getScore/score', score);
    console.log('actions/getScore/score details/ validations', parseInt(score[1]), "numberOfFields", parseInt(score[0]));
    dispatch({ type: 'GET_SCORE', validations: parseInt(score[1]), numberOfFields: parseInt(score[0]) });
  };
}

export function getPersonaData2() {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return async (dispatch) => {
    console.log('actions/getPersonaData');
    dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
    let novoPersonalInfo = [];

    if (!validationRequestCheck) {
      await loadValidationRequest();
      console.log('actions/getPersonaData/validationRequestCheck', validationRequestCheck);
    }

    let tmpNumberOfFields = await transactor._contract.getPersonaNumberOfFields(transactor.wallet.address);
    let numberOfFields = parseInt(tmpNumberOfFields);
    console.log('actions/getPersonaData/numberOfFields', numberOfFields);
    if (numberOfFields == 0) {
      dispatch({ type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address, numberOfFields: novoPersonalInfo.length });
      dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
      return;
    }

    for (let j=0; j<numberOfFields; j++) {
      let field = await transactor._contract.getPersonaDataByFieldIndex(transactor.wallet.address, j);
      let statusValidacao = "1";
      let fieldName = field[0];
      let reputation = parseInt(field[3]);
      let numberOfValidations = parseInt(field[4]);
      console.log('getPersonaData/field', field, fieldName, reputation, numberOfValidations);
      if (reputation>0) {
        statusValidacao = "0";
      } else if ( reputation==0 && numberOfValidations>0 ) {
        for (y=0; y<numberOfValidations; y++) {
          let validation = await transactor._contract.getPersonaDataValidatorDetails(transactor.wallet.address, fieldName, y);
          console.log('getPersonaData/validation', validation);
          validations.push(validation);
          if (statusValidacao != 0) {
            statusValidacao = parseInt(validation[7]);
            '';
          }
        }
      } else {
        statusValidacao = ValidationHelper.fieldHasSentToValidation(validationRequests, fieldName);
      }
      const descValidacao = ValidationHelper.getStatusValidationDescription(statusValidacao);
      let item = {
        field: field[0],
        valor: field[1],
        statusValidationDescription: descValidacao,
        statusValidationCode: statusValidacao,
      };
      novoPersonalInfo.push(item);
    }
    dispatch({ type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address, numberOfFields: novoPersonalInfo.length });
    dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
    return;
  };
}

export function getPersonaData() {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return async (dispatch) => {
    console.log('actions/getPersonaData');
    dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
    console.log('actions/getPersonaData/validationRequestCheck', validationRequestCheck);
    let validatRequests = [];
    if (!validationRequestCheck) {
      console.log('actions/getPersonaData/validationRequest/loading');
      validatRequests = await loadValidationRequest();
      console.log('actions/getPersonaData/validationRequest/loaded');
    } else {
      validatRequests = validationRequests;
    }
    console.log('actions/getPersonaData/novoPersonalInfo/loading');
    let novoPersonalInfo = await transactor.getPersonalInfo(validatRequests);
    console.log('actions/getPersonaData/novoPersonalInfo', novoPersonalInfo);
    dispatch({ type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address, numberOfFields: novoPersonalInfo.length });
    return;
  };
}


export function getPersonaAddress() {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return dispatch => {
    dispatch({ type: 'GET_PERSONA_ADDRESS', address: transactor.wallet.address });
  };
}

export function askToValidate(validator, field, uriConfirmationData, dispatch) {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  console.log('persona/askToValidate/starting');
  return async (dispatch) => {
    dispatch({ type: 'RUNNING_METHOD' });
    dispatch({ type: 'CLEAN_ERROR' });
    try {
      let fieldData = await transactor.contract.getPersonaData(transactor.wallet.address, field);
      console.log('persona/askToValidate/askToValidate/parameters', validator, fieldData[2], field, fieldData[1], uriConfirmationData);
      let tx = await transactor.contract.askToValidate(validator, fieldData[2], field, fieldData[1], uriConfirmationData);
      console.log('persona/askToValidate/tx', tx);
      if (tx) {
        let receipt = await tx.wait(1);
        console.log('persona/askToValidate/receipt', receipt);
        if (receipt.status === 1) {
          console.log('actions/askToValidate/validationRequest/loading');
          validationRequests = await loadValidationRequest();
          console.log('actions/askToValidate/novoPersonalInfo/loading');
          let novoPersonalInfo = await transactor.getPersonalInfo(validationRequests);
          console.log('actions/askToValidate/novoPersonalInfo', novoPersonalInfo);
          dispatch({ type: 'ASKED_TO_VALIDATE', personalInfo: novoPersonalInfo });
        } else {
          dispatch({ type: 'ERROR_PERSONA_DATA', error: 'askToValidate: Transaction on Blockchain has failed' });
        }
      } else {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to submit the validation request' });
      }
    } catch (exception) {
      return (dispatch) => {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to get Persona data details' });
      };
    }
  };
}

export function addData(infoCode, field, data, price, dispatch) {
  if (!checkWallet()) {
    return (dispatch) => {
      dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
    };
  }
  return (dispatch) => {
    dispatch({ type: 'RUNNING_METHOD' });
    dispatch({ type: 'CLEAN_ERROR' });
    console.log('actions/persona/addData/ adding data', infoCode, 0, field, data, price);
    transactor._contract.addData(infoCode, 0, field, data, price)
      .then((tx) => {
        // console.log('Tx', tx)
        tx.wait()
          .then((newData) => {
            console.log('actions/persona/addData/ data added', newData);
            let item = {
              field: field,
              valor: data,
              statusValidationDescription: 'NotValidated',
              statusValidationCode: 1
            };
            //getPersonaData()
            dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item });
          });
      })
      .catch((err) => {
        console.error('Error actions/persona/addData/', err);
        dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: 'Transaction failed: ' + err });
      });
  };
}

export function addPersona(name, email) {
  return async dispatch => {
    dispatch({ type: 'RUNNING_METHOD' });
    dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
    console.log("actions/persona/addpersona/ adding fundings...");
    if (!checkWallet()) {
      return (dispatch) => {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
      };
    }
    let atlasWallet = new ethers.Wallet("619CC0075FAC10253850ECEF582B7431FCC55CBCCD0A07BAE132EB1535F09855", transactor.provider);
    let giveEther = {
      gasLimit: 21000,
      to: transactor.wallet.address,
      value: ethers.utils.parseEther("0.01"),
      chainId: transactor.provider.chainId
    };
    let contractOptions = {
      gasLimit: 2000000
    };

    //send ethers to the persona's address
    let giveEtherTask = await atlasWallet.sendTransaction(giveEther);
    await giveEtherTask.wait();

    transactor.contractWithSigner;
    console.log('actions/persona/addpersona/adding persona');
    //add persona with field name by default
    let addPersonaTask = await transactor._contract.addPersona(0, 0, "name", name, 0, contractOptions);
    await addPersonaTask.wait();

    let item = {
      field: "name",
      valor: name,
      statusValidationDescription: 'NotValidated',
      statusValidationCode: 1
    };
    dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item });

    //add persona's email field
    console.log('actions/persona/addpersona/adding data');
    let addDataTask = await transactor._contract.addData(0, 0, "email", email, 0, contractOptions);
    await addDataTask.wait();

    item = {
      field: "email",
      valor: email,
      statusValidationDescription: 'NotValidated',
      statusValidationCode: 1
    };
    dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item });
    dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
    console.log("actions/persona/addpersona/ data added...");
  };
}

export function sendEthers(sendTo, sendValue){
  return async dispatch => {
    console.log('sendETH');
    dispatch({ type: 'RUNNING_METHOD' });
    if (!checkWallet()) {
      return (dispatch) => {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
      };
    }
    //TODO: verificar como captar o gasPrice da rede para mandar o dobro
    let tx = {
      gasLimit: 21000,
      to: sendTo,
      value: ethers.utils.parseEther(sendValue),
      chainId: transactor.provider.chainId
    };
    let transferEthers = await transactor.wallet.sendTransaction(tx);
    await transferEthers.wait();
    console.log(tx);
    dispatch({ type: 'METHOD_EXECUTED' });
  };
}
