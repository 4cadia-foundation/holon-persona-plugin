import SmartContract from '../../../scripts/core/SmartContract';

const smartContract = new SmartContract();
let contract = null;

init();

async function init(){
    debugger;
    await smartContract.smartContractInitialization();
    contract = await smartContract.contract();
}
export function getPersonaData(address = '0xc3d8DFCA4b2387D1d0Bf8A7C4D7B361a26863AAC') {
    return dispatch => {
        return contract.getPersonaData(address, 'email')
            .then(email => {
                const item = [{'label': email[0], 'value': email[1]}];
                dispatch({type: 'GET_PERSONA_DATA', personalInfo: item, address: address});
            })
            .catch (exception =>  {
            dispatch({type: 'ERROR_PERSONA_DATA', error: exception.message});
        });
    }
    };