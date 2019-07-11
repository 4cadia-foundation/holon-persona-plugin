import SmartContract from '../../../scripts/core/SmartContract';

const smartContract = new SmartContract();
let contract = null;

init();

async function init() {
    console.log('init do persona actions');
    await smartContract.smartContractInitialization();
    contract = await smartContract.contract();
}

export function getPersonaData(address = '0xc3d8DFCA4b2387D1d0Bf8A7C4D7B361a26863AAC') {
    return dispatch => {
        return contract.getPersonaData(address, 'email')
            .then(result => {
                const list = [{field: result[0], data: result[1]}];
                console.log('action get result data', list);
                dispatch({type: 'GET_PERSONA_DATA', personalInfo: list, address: address })
            })
            .catch(excepction => {
                dispatch({type: 'ERROR_PERSONA_DATA', error: excepction.message})
            });
    }
};