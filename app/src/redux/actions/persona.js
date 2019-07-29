import { ethers } from 'ethers';
import Transactor from '../../../scripts/core/Transactor';
import FilterEventsBlockchain from '../../../scripts/core/FilterEventsBlockchain';
import store from '../store';
import { address, abi } from '../../../config/abi';
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
abiDecoder.addABI(abi);

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
        }
    }
    return (async (dispatch) => {
        dispatch({ type: 'RUNNING_METHOD'});        
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
        getBalance();
        getScore();
        getPersonaData();
        dispatch({ type: 'METHOD_EXECUTED'});
    });
}

export function getBalance() {
    console.log('actions/getBalance');
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
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
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
    }
    return (async (dispatch) => {
        const score = await transactor.contract.score(transactor.wallet.address);
        console.log('actions/getScore/score', score);
        console.log('actions/getScore/score details/ validations', parseInt(score[1]), "numberOfFields", parseInt(score[0]));
        dispatch({ type: 'GET_SCORE', validations: parseInt(score[1]), numberOfFields: parseInt(score[0]) });        
    });
}

export function getPersonaInfo() {
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
    }
    console.log('actions/getPersonaInfo');
    return (async (dispatch) => {
        dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
        let novoPersonalInfo = [];
    });
}

//TODO: Refazer esta funcao
export function getPersonaData() {
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
    }
    console.log('actions/getPersonaData/starting');
    
    return (async (dispatch) => {
        dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
        let novoPersonalInfo = [];
        let tmpNumberOfFields = await transactor._contract.getPersonaNumberOfFields(transactor.wallet.address);
        let numberOfFields = parseInt(tmpNumberOfFields);
        console.log('actions/getPersonaData/numberOfFields', numberOfFields);
        if (numberOfFields == 0) {
            dispatch({ type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address, numberOfFields: novoPersonalInfo.length });
            dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
            return
        }

        //console.log('action/persona/getPersonaData/transactor.wallet-set', transactor.wallet);
        let txHashes = await filterContract.getLogsTransactionHash()
        if (!txHashes || txHashes.length < 1) {
            // console.log('action/getPersonaData/getLogsTransactionHash/Nao achou logs', txHashes);
            getPersonaAddress();
            return;
        }

        //Filter NewData logs only from this Persona
        let newDataHashes = [];
        for (let i=0; i<txHashes.length; i++) {
            let receipt = await filterContract.getTransactionReceipt(txHashes[i]);
            //console.log('action/getPersonaData/receipt', receipt);
            const decodedReceipt = abiDecoder.decodeLogs(receipt.logs);
            //console.log('action/getPersonaData/decodedReceipt', decodedReceipt[0]);
            if (decodedReceipt[0].events[0].value.toUpperCase() == transactor.wallet.address.toUpperCase()) {
                console.log('action/getPersonaData/newDataLog');
                newDataHashes.push({hash: txHashes[i], receipt: decodedReceipt[0]});
            } 
        }        

        //get logs of validations
        filterContract.setEventToFilter('0xf6da3522a535c33bdb2bc75b4c5bd4f39df957ed7245d7311ead1ec9594c8547');
        let validatedHashes = await filterContract.getLogsTransactionHash();

        let validationRequests = []
        filterContract.setEventToFilter('0xd3b557f4e8a38a85c977c23ef0ce13669bfd8516c9efb3faa4053d9f2dfeeda6');
        let askValidationHashes = await filterContract.getLogsTransactionHash();
        //console.log('actions/getPersonaData/filterContract.VALIDATEME_EVENT', filterContract.VALIDATEME_EVENT)
        //console.log('actions/getPersonaData/askValidationHashes', askValidationHashes)
        for (let i=0; i<askValidationHashes.length; i++) {
            let receiptValidationHash = await filterContract.getTransactionReceipt(askValidationHashes[i]);
            //console.log('actions/getPersonaData/receiptValidationHash', receiptValidationHash);
            let receiptValidationHashDecoded = abiDecoder.decodeLogs(receiptValidationHash.logs)
            receiptValidationHashDecoded = receiptValidationHashDecoded[0];
            //console.log('actions/getPersonaData/askValidationHashes/decoded', receiptValidationHashDecoded)
            if (receiptValidationHashDecoded.events[0].value.toUpperCase() == transactor.wallet.address.toUpperCase()) {
                validationRequests.push(receiptValidationHashDecoded.events)
                //console.log('actions/getPersonaData/validationRequests/events',receiptValidationHashDecoded.events);
                //console.log('actions/getPersonaData/validationRequests/parse', receiptValidationHashDecoded.events[3].value, ethers.utils.id("email"), ethers.utils.id("Birth data"), ethers.utils.id("name"));
            }
        }
        console.log('actions/getPersonaData/validationRequests', validationRequests);

        let numberOfTxHashesProcessed = 0;
                
        newDataHashes.map(async (hashObj) => {
            console.log('action/getPersonaData/hashObj', hashObj);
            numberOfTxHashesProcessed++;
            let statusValidacao = '1';
            let descValidacao = '';
            let tx = await filterContract.getPureTransaction(hashObj.hash);
            let item = {}
            //console.log('tx', tx);
            if (tx) {
                const decodedTx = abiDecoder.decodeMethod(tx.data);
                //console.log('actions/tx.decode', decodedTx);
                //console.log(decodedTx.params[2].value, decodedTx.params[3].value);
                for (let i=0; i<validatedHashes.length; i++) {
                    let validatedReceipt = await filterContract.getTransactionReceipt(validatedHashes[i]);
                    //console.log('action/getPersonaData/validatedReceipt', validatedReceipt);
                    const validatedDecodedReceipt = abiDecoder.decodeLogs(validatedReceipt.logs);
                    //console.log('action/getPersonaData/validatedDecodedReceipt', validatedDecodedReceipt[0]);
                    // console.log('action/getPersonaData/statusValidacao', statusValidacao);
                    if ((decodedTx.params[2].value == validatedDecodedReceipt[0].events[2].value) &&
                        (validatedDecodedReceipt[0].events[0].value.toUpperCase() == transactor.wallet.address.toUpperCase())
                    ) {
                        statusValidacao = validatedDecodedReceipt[0].events[3].value;
                    //Check for pending validations
                    } else {
                        for (let i=0; i<validationRequests.length; i++) {
                            //console.log('actions/getPersonaData/validationRequests/check', decodedTx.params[2].value, validationRequests[i][3].value, ethers.utils.id(decodedTx.params[2].value));
                            if (ethers.utils.id(decodedTx.params[2].value) == validationRequests[i][3].value) {
                                statusValidacao = "3";
                                break;
                            }
                        }
                    }
                }                        
                //Validated = 0, NotValidated = 1, CannotEvaluate = 2, pending = 3
                if (statusValidacao == "0") {
                    descValidacao = "Validated";
                } else if (statusValidacao == "1") {
                    descValidacao = "NotValidated";
                } else if (statusValidacao == "2") {
                    descValidacao = "CannotEvaluate";
                } else if (statusValidacao == "3") {
                    descValidacao = "Pending";
                }
                item = {
                    field: decodedTx.params[2].value,
                    valor: decodedTx.params[3].value,
                    statusValidationDescription: descValidacao,
                    statusValidationCode: statusValidacao,
                };
                novoPersonalInfo.push(item);
            }
            // console.log('actions/novoPersonalInfo', novoPersonalInfo);
            // console.log('actions/numberOfTxHashesProcessed',numberOfTxHashesProcessed)
            // console.log('actions/txHashes.length',txHashes.length)
            if (numberOfTxHashesProcessed == newDataHashes.length) {
                if (novoPersonalInfo.length === 0) {
                    console.log("nao tem registro no SC ainda");                                
                }
                dispatch({ type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address, numberOfFields: novoPersonalInfo.length });
                dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
                return;
            }
        });                
    });
}

export function getPersonaAddress() {
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
    }
    return dispatch => {
        dispatch({ type: 'GET_PERSONA_ADDRESS', address: transactor.wallet.address });
    }
}

export function askToValidate(validator, field, uriConfirmationData, dispatch) {
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
    }
    console.log('persona/askToValidate/starting')
    return async (dispatch) => {
        dispatch({ type: 'RUNNING_METHOD' })
        try {
            let fieldData = await transactor.contract.getPersonaData(transactor.wallet.address, field)
            console.log('persona/askToValidate/askToValidate/parameters', validator, fieldData[2], field, fieldData[1], uriConfirmationData)
            let tx = await transactor.contract.askToValidate(validator, fieldData[2], field, fieldData[1], uriConfirmationData) 
            console.log('persona/askToValidate/tx', tx)
            if (tx) {
                let receipt = await tx.wait(1)
                console.log('persona/askToValidate/receipt', receipt)
                if (receipt.status === 1) {
                    dispatch({ type: 'ASKED_TO_VALIDATE' })
                } else {
                    dispatch({ type: 'ERROR_PERSONA_DATA', error: 'askToValidate: Transaction on Blockchain has failed'});
                }
            } else {
                dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to submit the validation request'});
            }
        } catch (exception) {
            return (dispatch) => {
                dispatch({ type: 'ERROR_PERSONA_DATA', error: 'It was not possible to get Persona data details'});
            }
        }
    }
}

export function addData(infoCode, field, data, price, dispatch) {
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
    }
    return (dispatch) => {
        dispatch({ type: 'RUNNING_METHOD' });
        transactor.contractWithSigner;
        transactor._contract.addData(infoCode, 0, field, data, price)
            .then((tx) => {
                // console.log('Tx', tx)
                tx.wait()
                    .then((newData) => {
                        // console.log('newData', newData)
                        let item = {
                            field: field,
                            valor: data,
                            statusValidationDescription: 'NotValidated',
                            statusValidationCode: 1
                        };
                        getPersonaData()
                        dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item })
                    })
            })
            .catch((err) => {
                console.error('addData', err)
                dispatch({ type: ActionTypes.ERROR_PERSONA_DATA, error: 'Transaction failed: ' + err });
            });
    }
}

export function addPersona(name, email) {
    return async dispatch => {
        dispatch({ type: 'RUNNING_METHOD' });
        dispatch({ type: 'WILL_READ_ALL_PERSONA_LOGS' });
        //console.log("actions/persona/addpersona/ adding data...");
        if (!checkWallet()) {
            return (dispatch) => {
                dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
            }
        }
        let atlasWallet = new ethers.Wallet("619CC0075FAC10253850ECEF582B7431FCC55CBCCD0A07BAE132EB1535F09855", transactor.provider);
        let giveEther = {
            gasLimit: 21000,
            to: transactor.wallet.address,
            value: ethers.utils.parseEther("0.01"),
            chainId: transactor.provider.chainId
        }
        let contractOptions = {
            gasLimit: 2000000
        };

        //send ethers to the persona's address
        let giveEtherTask = await atlasWallet.sendTransaction(giveEther);
        await giveEtherTask.wait();

        transactor.contractWithSigner;

        //add persona with field name by default
        let addPersonaTask = await transactor._contract.addPersona(0, 0, "name", name, 0, contractOptions);
        await addPersonaTask.wait();

        let item = {
            field: "name",
            valor: name,
            statusValidationDescription: 'NotValidated',
            statusValidationCode: 1
        };
        dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item })

        //add persona's email field
        let addDataTask = await transactor._contract.addData(0, 0, "email", email, 0, contractOptions);
        await addDataTask.wait();

        item = {
            field: "email",
            valor: email,
            statusValidationDescription: 'NotValidated',
            statusValidationCode: 1
        };
        dispatch({ type: ActionTypes.ADD_PERSONA_DATA, newField: item })
        dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
        //console.log("actions/persona/addpersona/ data added...");
    }
}