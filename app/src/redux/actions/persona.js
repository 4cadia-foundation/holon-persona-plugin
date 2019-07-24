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
    fromBlock: 4754554,
    toBlock: 'latest',
    topics: ['0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf']
};
const filterContract = new FilterEventsBlockchain(filterNewData);
abiDecoder.addABI(abi);

function checkWallet() {
    //console.log('action/persona/checkWallet/globalState', store.getState());
    //console.log('action/persona/checkWallet/transactor.wallet', transactor.wallet);
    if (!transactor.wallet) {
        if (store.getState().wallet.ethersWallet) {
            transactor.wallet = store.getState().wallet.ethersWallet;
            console.log('action/persona/checkWallet/transactor.wallet-set', transactor.wallet);
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

//TODO: Refazer esta funcao
export function getPersonaData() {
    if (!checkWallet()) {
        return (dispatch) => {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Wallet was not set' });
        }
    }

    return (dispatch) => {
        let novoPersonalInfo = [];
        if (transactor.wallet.address) {
            console.log('action/persona/getPersonaData/transactor.wallet-set', transactor.wallet);
            filterContract.getLogsTransactionHash()
                .then((txHashes) => {
                    if (!txHashes || txHashes.length < 1) {
                        // console.log('action/getPersonaData/getLogsTransactionHash/Nao achou logs', txHashes);
                        getPersonaAddress();
                        return;
                    }
                    let numberOfTxHashesProcessed = 0;
                    //TODO: Criar um filter   
                    txHashes.map(async (hash) => {
                        console.log('action/getPersonaData/hash', hash);
                        let receipt = await filterContract.getTransactionReceipt(hash);
                        const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
                        //console.log('action/getPersonaData/decodedLogs', decodedLogs);
                        if (decodedLogs[0].events[0].value.toUpperCase() == transactor.wallet.address.toUpperCase()) {
                            let tx = await filterContract.getPureTransaction(hash);
                            //console.log('tx', tx);
                            filterContract.setEventToFilter('0xf6da3522a535c33bdb2bc75b4c5bd4f39df957ed7245d7311ead1ec9594c8547');
                            if (tx) {
                                const decodedTx = abiDecoder.decodeMethod(tx.data);
                                // console.log('actions/tx.decode', decodedTx);
                                //console.log(decodedTx.params[2].value, decodedTx.params[3].value);                        
                                let validatedHash = await filterContract.getLogsTransactionHash();
                                //console.log('action/getPersonaData/validatedHash', validatedHash[0]);

                                let validatedReceipt = await filterContract.getTransactionReceipt(validatedHash[0]);
                                //console.log('action/getPersonaData/validatedReceipt', validatedReceipt);
                                const validatedDecodedReceipt = abiDecoder.decodeLogs(validatedReceipt.logs);
                                //console.log('action/getPersonaData/validatedDecodedReceipt', validatedDecodedReceipt[0]);
                                // console.log('action/getPersonaData/statusValidacao', statusValidacao);
                                let statusValidacao = '1';
                                let descValidacao = '';
                                if ((decodedTx.params[2].value == validatedDecodedReceipt[0].events[2].value) &&
                                    (validatedDecodedReceipt[0].events[0].value.toUpperCase() == transactor.wallet.address.toUpperCase())
                                ) {
                                    statusValidacao = validatedDecodedReceipt[0].events[3].value;
                                    //Validated = 0, NotValidated = 1, CannotEvaluate = 2
                                    if (statusValidacao == "0") {
                                        descValidacao = "Validated";
                                    } else if (statusValidacao == "1") {
                                        descValidacao = "NotValidated";
                                    } else if (statusValidacao == "2") {
                                        descValidacao = "CannotEvaluate";
                                    }
                                    let item = {
                                        field: decodedTx.params[2].value,
                                        valor: decodedTx.params[3].value,
                                        statusValidationDescription: descValidacao,
                                        statusValidationCode: statusValidacao,
                                    };
                                    novoPersonalInfo.push(item);
                                    if (novoPersonalInfo.length >= 2) {
                                        // console.log('actions/novoPersonalInfo', novoPersonalInfo);
                                        dispatch({ type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address });
                                    }
                                }
                                let item = {
                                    field: decodedTx.params[2].value,
                                    valor: decodedTx.params[3].value,
                                    statusValidationDescription: descValidacao,
                                    statusValidationCode: statusValidacao,
                                };
                                novoPersonalInfo.push(item);
                                //console.log('action/getPersonaData/novoPersonalInfo', novoPersonalInfo);
                            }
                        }
                        if (novoPersonalInfo.length >= 2) {
                            //console.log('action/persona/txhashmap/novoPersonalInfo', novoPersonalInfo);
                            dispatch({ type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address });
                        }
                        numberOfTxHashesProcessed++;
                        if (numberOfTxHashesProcessed == txHashes.length) {
                            if (novoPersonalInfo.length === 0) {
                                console.log("nao tem registro no SC ainda");
                                getPersonaAddress();
                            }
                            dispatch({ type: 'READ_ALL_PERSONA_LOGS' });
                        }
                    });
                })
                .catch(err => console.error(err));
        } else {
            dispatch({ type: 'ERROR_PERSONA_DATA', error: 'Data was not found in Blockchain' });
        }
    }
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
    }
}