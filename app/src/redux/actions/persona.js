import { ethers } from 'ethers';
import Transactor from '../../../scripts/core/Transactor';
import FilterEventsBlockchain from '../../../scripts/core/FilterEventsBlockchain';
import store from '../store';
import { abi } from '../../../config/abi';
import * as ValidationHelper from '../../helper/validations';
import abiDecoder from 'abi-decoder';
import * as ActionTypes from "../../constants/actionsTypes";
import { buildToast, ToastTypes } from '../../helper/toast';
import EventsService from '../../../scripts/core/application/service/EventsService';

const transactor = new Transactor();
const filterContract = new FilterEventsBlockchain();
filterContract.setEventToFilter('newdata');
var validationRequests = [];
var validationRequestCheck = false;
var validations = [];
abiDecoder.addABI(abi);

async function loadValidationRequest() {
    console.log('actions/loadValidationRequest');
    if (!checkWallet()) {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    validationRequests = await filterContract.getValidationRequestLogs(transactor.wallet.address)
    validationRequestCheck = true;
    console.log('actions/loadValidationRequest/validationRequests', validationRequests);
    return validationRequests
}

function checkWallet() {
    console.log('action/persona/checkingWallet');
    //console.log('action/persona/checkWallet/globalState', store.getState());
    //console.log('action/persona/checkWallet/transactor.wallet', transactor.wallet);
    if (!transactor.wallet) {
        if (store.getState().wallet.ethersWallet) {
            transactor.wallet = store.getState().wallet.ethersWallet;
            transactor.contractWithSigner;
            filterContract.transactor = transactor;
            console.log('action/persona/checkWallet/transactor.wallet-set', transactor);
            console.log('action/persona/checkWallet/filterContract transactor-set', filterContract);
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
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    try {
        return (async (dispatch) => {
            dispatch({ type: 'RUNNING_METHOD' });
            let options = new Object();
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
            console.log('actions/changeNetwork/newProvider', transactor);
            // getBalance();
            // getScore();
            // getPersonaData();
            dispatch({ type: 'METHOD_EXECUTED' });
        });
    }
    catch (err) {
        console.error('Error actions/persona/changeNetwork: ', err)
        dispatch({ type: 'TOASTY_ERROR', toast: buildToast('We not get change network. Try again later.', {type: ToastTypes.ERROR})})
    }
}

export function getBalance() {
    console.log('actions/getBalance');
    if (!checkWallet()) {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    return (async (dispatch) => {
        const balance = await transactor.wallet.getBalance();
        console.log('actions/getBalance', balance);
        dispatch({ type: 'GET_BALANCE', balance: ethers.utils.formatEther(balance) });
    });
}

export function getScore() {
    console.log('actions/getScore');
    if (!checkWallet()) {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    return (async (dispatch) => {
        const score = await transactor.contract.score(transactor.wallet.address);
        console.log('actions/getScore/score', score);
        console.log('actions/getScore/score details/ validations', parseInt(score[1]), "numberOfFields", parseInt(score[0]));
        dispatch({ type: 'GET_SCORE', validations: parseInt(score[1]), numberOfFields: parseInt(score[0]) });
    });
}

export function getPersonaData2() {
    if (!checkWallet()) {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    return (async (dispatch) => {
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
            return
        }

        for (let j = 0; j < numberOfFields; j++) {
            let field = await transactor._contract.getPersonaDataByFieldIndex(transactor.wallet.address, j);
            let statusValidacao = "1";
            let fieldName = field[0];
            let reputation = parseInt(field[3]);
            let numberOfValidations = parseInt(field[4]);
            console.log('getPersonaData/field', field, fieldName, reputation, numberOfValidations);
            if (reputation > 0) {
                statusValidacao = "0";
            } else if ((reputation == 0) && (numberOfValidations > 0)) {
                for (let y = 0; y < numberOfValidations; y++) {
                    let validation = await transactor._contract.getPersonaDataValidatorDetails(transactor.wallet.address, fieldName, y);
                    console.log('getPersonaData/validation', validation);
                    validations.push(validation);
                    if (statusValidacao != 0) {
                        statusValidacao = parseInt(validation[7]);
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
    });
}

export function getPersonaData() {
    if (!checkWallet()) {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    try {
        return (async (dispatch) => {
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
        });
    }
    catch(err) {
        console.error('actions/getPersonaData/err', err);
        return (dispatch) => {
            dispatch({type: 'ERROR_PERSONA_DATA', error: 'Get persona data failed'});
            dispatch({type: 'TOAST_ERROR', toast: buildToast('We were unable to receive your data. Try again in a few minutes.', {type: ToastTypes.ERROR})})
        }
    }
}

export function askToValidate(validator, field, uriConfirmationData) {
    if (!checkWallet()) {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    console.log('persona/askToValidate/starting')
    return async (dispatch) => {
        dispatch({ type: 'RUNNING_METHOD' })
        dispatch({ type: 'CLEAN_ERROR' });
        try {
            let fieldData = await transactor.contract.getPersonaData(transactor.wallet.address, field)
            console.log('persona/askToValidate/askToValidate/parameters', validator, fieldData[2], field, fieldData[1], uriConfirmationData)
            let tx = await transactor.contract.askToValidate(validator, fieldData[2], field, fieldData[1], uriConfirmationData)
            console.log('persona/askToValidate/tx', tx)
            if (tx) {
                let receipt = await tx.wait(1)
                console.log('persona/askToValidate/receipt', receipt)
                if (receipt.status === 1) {
                    console.log('actions/askToValidate/validationRequest/loading');
                    validationRequests = await loadValidationRequest();
                    console.log('actions/askToValidate/novoPersonalInfo/loading');
                    let novoPersonalInfo = await transactor.getPersonalInfo(validationRequests);
                    console.log('actions/askToValidate/novoPersonalInfo', novoPersonalInfo);
                    dispatch({ type: 'ASKED_TO_VALIDATE', personalInfo: novoPersonalInfo });
                    dispatch({type: 'TOAST_SUCCESS', toast: buildToast('Info send to validation!', {type: ToastTypes.SUCCESS})});
                } else {
                    dispatch({ type: 'ERROR_PERSONA_DATA', error: 'askToValidate: Transaction on Blockchain has failed' });
                    dispatch({type: 'TOAST_ERROR', toast: buildToast('Transaction on Blockchain has failed. Try again in a few minutes', {type: ToastTypes.ERROR})})
                }
            } else {
                dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to submit the validation request' });
                dispatch({type: 'TOAST_ERROR', toast: buildToast('It was not possible to submit the validation request. Try again in a few minutes', {type: ToastTypes.ERROR})})

            }
        } 
        catch (exception) {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to get Persona data details' });
            dispatch({type: 'TOAST_ERROR', toast: buildToast('It was not possible to get Persona data details. Try again in a few minutes', {type: ToastTypes.ERROR})})
        }
    }
}

export function addData(infoCode, field, data, price) {
    if (!checkWallet()) {
        dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        return
    }
    return (dispatch) => {
        dispatch({ type: 'RUNNING_METHOD' });
        dispatch({ type: 'CLEAN_ERROR' });
        console.log('actions/persona/addData/ adding data', infoCode, 0, field, data, price)
        transactor._contract.addData(infoCode, 0, field, data, price)
            .then((tx) => {
                tx.wait()
                    .then((newData) => {
                        console.log('actions/persona/addData/ data added', newData)
                        let item = {
                            field: field,
                            valor: data,
                            statusValidationDescription: 'NotValidated',
                            statusValidationCode: 1
                        };
                        //getPersonaData()
                        dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item })
                        dispatch({type: 'TOAST_SUCCESS', toast: buildToast('Information added successfully!', {type: ToastTypes.SUCCESS})})
                    })
            })
            .catch((err) => {
                console.error('Error actions/persona/addData/', err)
                dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: 'Transaction failed: ' + err });
                dispatch({ type: 'TOAST_ERROR', toast: buildToast('Transaction not executed. Try again later.', {type: ToastTypes.ERROR})})
            });
    }
}

export function addPersona(name, email) {
    return async dispatch => {
        dispatch({ type: 'RUNNING_METHOD' });
        dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
        console.log("actions/persona/addpersona/ adding fundings...");
        if (!checkWallet()) {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
            return
        }
        try {
            let atlasWallet = new ethers.Wallet("619CC0075FAC10253850ECEF582B7431FCC55CBCCD0A07BAE132EB1535F09855", transactor.provider);
            let giveEther = {
                gasLimit: 21000,
                to: transactor.wallet.address,
                value: ethers.utils.parseEther("0.01"),
                chainId: transactor.provider.chainId
            }
            //send ethers to the persona's address
            let giveEtherTask = await atlasWallet.sendTransaction(giveEther);
            await giveEtherTask.wait();
        }
        catch (err) {
            console.error('Error actions/persona/addPersona/sendEth', err)
            dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: 'Add funding: transaction failed' + err });
            dispatch({ type: 'TOAST_ERROR', toast: buildToast('Fundings was not transfered to your wallet. Try again later.', {type: ToastTypes.ERROR})})
        }
        
        try {
            let contractOptions = { gasLimit: 4000000 };
            transactor.contractWithSigner;
            console.log('actions/persona/addpersona/adding persona')
            //add persona with field name by default
            let addPersonaTask = await transactor._contract.addPersona(1, 0, "name", name, 0, contractOptions);
            await addPersonaTask.wait();

            let item = {
                field: "name",
                valor: name,
                statusValidationDescription: 'NotValidated',
                statusValidationCode: 1
            };
            dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item })

            //add persona's email field
            console.log('actions/persona/addpersona/adding data')
            let addDataTask = await transactor._contract.addData(1, 0, "email", email, 0, contractOptions);
            await addDataTask.wait();

            item = {
                field: "email",
                valor: email,
                statusValidationDescription: 'NotValidated',
                statusValidationCode: 1
            };
            dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item })
            dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
            console.log("actions/persona/addpersona/ data added...");
        }
        catch (err) {
            console.error('Error actions/persona/addPersona/addFirstData', err)
            dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: 'Add first data (name and email): failed' + err });
            dispatch({ type: 'TOAST_ERROR', toast: buildToast('It was not possible create your Holon ID. Try again later.', {type: ToastTypes.ERROR})})
        }
    }
}

export function sendEthers(sendTo, sendValue) {
    return async dispatch => {
        dispatch({ type: 'RUNNING_METHOD' });
        if (!checkWallet()) {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
            return
        }
        try {
            //TODO: verificar como captar o gasPrice da rede para mandar o dobro
            let tx = {
                gasLimit: 21000,
                to: sendTo,
                value: ethers.utils.parseEther(sendValue),
                chainId: transactor.provider.chainId
            }
            let transferEthers = await transactor.wallet.sendTransaction(tx);
            await transferEthers.wait();
            // console.log(tx);
            dispatch({ type: 'METHOD_EXECUTED' });
            dispatch({type: 'TOAST_SUCCESS', toast: buildToast('Ether send sucessfully', {type: ToastTypes.SUCCESS})});
        }
        catch(err) {
            console.error('actions/persona/sendEthers: ', err);
                 dispatch({type: 'TOAST_ERROR', toast: buildToast('We had a problem to make your transaction. Try again later.', {type: ToastTypes.ERROR})});
        }
    }
}

export function GetPersonaNotifications() {
    return (async (dispatch) => {
        let eventsService = new EventsService(transactor._wallet.provider);
        let eventFilter = [null, ethers.utils.hexZeroPad(transactor._wallet.address, 32)];
        let eventData = await eventsService.GetLetSeeYourDataEvent(eventFilter);
        let personaNotifications = [];

        if (!eventData || eventData.length == 0)
            return dispatch({ type: 'GET_NOTIFICATIONS', notifications: personaNotifications });

        for (let eventIndex = 0; eventIndex < eventData.length; eventIndex++) {
            let requesterDataName = await transactor.contract.getPersonaData(eventData[eventIndex].requester, "name");
            let requesterDataField = await transactor.contract.getPersonaData(eventData[eventIndex].requester, eventData[eventIndex].field);
            personaNotifications.push({
                requesterName: requesterDataName[1],
                requesterAddress: eventData[eventIndex].requester,
                field: eventData[eventIndex].field,
                data: requesterDataField[1],
                dataCategory: requesterDataField[2],
            });
        }
        dispatch({ type: 'GET_NOTIFICATIONS', notifications: personaNotifications });
    });
}
export function deliverDecryptedData(decision, receiver, dataCategory, fieldName, data) {
    return async dispatch => {
        console.log('deliverDecryptedData/starting')
        if (!checkWallet()) {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
            return
        }
        dispatch({ type: 'CLEAN_ERROR' });
        dispatch({ type: 'RUNNING_METHOD' });
        try {
            let tx = await transactor.contract.deliverDecryptedData(decision, receiver, dataCategory, fieldName, data);
            if (tx) {
                let receipt = await tx.wait(1)
                console.log('persona/deliverDecryptedData/receipt', receipt)
                if (receipt.status === 1) {
                    dispatch({ type: 'METHOD_EXECUTED' });
                } else {
                    dispatch({ type: 'ERROR_PERSONA_DATA', error: 'askToValidate: Transaction on Blockchain has failed' });
                }
            } else {
                dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to submit the validation request' });
            }
        } catch (exception) {
            console.error('deliverDecryptedData', exception);
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to get Persona data details' });
            return 
        }
    }
}
export function allowNotification(receiver, dataCategory, fieldName, data) {
    return dispatch => {
        return this.deliverDecryptedData(true, receiver, dataCategory, fieldName, data)
            .then(
                (success) => {
                    dispatch({
                        type: 'TOASTY_SUCCESS',
                        toast: buildToast('Data shared successfully!', { type: ToastTypes.SUCCESS })
                    })
                }
            )
            .catch(
                (exception) => {
                    dispatch({
                        type: 'TOASTY_ERROR',
                        toast: buildToast('Operation not executed. Try again later.', { type: ToastTypes.ERROR })
                    })
                }
            )
    }
}

export function declineNotification(receiver, dataCategory, fieldName, data) {
    return dispatch => {
        return this.deliverDecryptedData(false, receiver, dataCategory, fieldName, data)
            .then(
                (success) => {
                    dispatch({
                        type: 'TOASTY_SUCCESS',
                        toast: buildToast('Done! We will let the consumer know about your decision', { type: ToastTypes.SUCCESS })
                    })
                }
            )
            .catch(
                (exception) => {
                    dispatch({
                        type: 'TOASTY_ERROR',
                        toast: buildToast('Operation not executed. Try again later.', { type: ToastTypes.ERROR })
                    })
                }
            )
    }
}