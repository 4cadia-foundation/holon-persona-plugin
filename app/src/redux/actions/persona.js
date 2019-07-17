import Transactor from '../../../scripts/core/Transactor';
import FilterEventsBlockchain from '../../../scripts/core/FilterEventsBlockchain';

import { address, abi } from '../../../config/abi';
import abiDecoder from 'abi-decoder';

const transactor = new Transactor();
const filterNewData = { 
    address: address,
    fromBlock: 4664439,
    toBlock: 'latest',
    topics: [ '0x1456b31d407e7c26146bc3a52f821b249e30d8c118995dcf93a95543e3fd8bcf' ]
  };
const filterContract = new FilterEventsBlockchain(filterNewData);
abiDecoder.addABI(abi);


export function getPersonaData() {
    return (dispatch) => {
        let novoPersonalInfo = [];
        filterContract.getLogsTransactionHash()
        .then((txHashes) => {
            txHashes.map(async (hash) => {
                let receipt = await filterContract.getTransactionReceipt(hash)
                const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
                if (decodedLogs[0].events[0].value == "0xf035261f87132fcd3c37730f8a07982b8d7d1330") {
                    let tx = await filterContract.getPureTransaction(hash)
                    const decodedTx = abiDecoder.decodeMethod(tx.data);
                    // console.log('actions/tx.decode', decodedTx);
                    //console.log(decodedTx.params[2].value, decodedTx.params[3].value);
                    let item = { 
                        field: decodedTx.params[2].value,
                        valor: decodedTx.params[3].value
                    };
                    novoPersonalInfo.push(item);
                    if (novoPersonalInfo.length == 2) {
                        // console.log('actions/novoPersonalInfo', novoPersonalInfo);
                        dispatch({type: 'GET_PERSONA_BASIC_DATA', novoPersonalInfo: novoPersonalInfo, address: transactor.wallet.address});
                    }
                } 
            });
        })
        .catch(err => console.error(err));        
    }   
}

export function getPersonaAddress() {
    return dispatch => {
        dispatch({type: 'GET_PERSONA_ADDRESS', address: transactor.wallet.address});
    }  
}