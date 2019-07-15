import SmartContract from '../../../scripts/core/SmartContract';

const smartContract = new SmartContract();
init();

async function init () {
    await smartContract.smartContractInitialization();
}

export function getPersonaData(address = '0x1d40DA744b7C14C24C97838B0Ed19CE383a784b9') {
    return dispatch => {
        smartContract.getPersonaData(address, 'email')
        .then(email => {
            const item = {campo: 'email', valor: email};
            dispatch({type: 'GET_PERSONA_DATA', personalInfo: item, address: address});
        })
        .catch(exception => {
            dispatch({type: 'ERROR_PERSONA_DATA', error: exception.message});
        });
    }   
}