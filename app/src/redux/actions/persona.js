import Transactor from '../../../scripts/core/Transactor';

const transactor = new Transactor();

export function getPersonaData() {
    return (dispatch, getState) => {
        transactor.getPersonaData(transactor.wallet.address, 'email')
        .then(email => {
            const item = {campo: 'email', valor: email};
            let newPersonalInfo = getState().personalInfo.push(item);
            dispatch({type: 'GET_PERSONA_BASIC_DATA', personalInfo: newPersonalInfo, address: transactor.wallet.address});
        })
        .catch(exception => {
            dispatch({type: 'ERROR_PERSONA_DATA', error: exception.message});
        });
    }   
}

export function getPersonaAddress() {
    return dispatch => {
        dispatch({type: 'GET_PERSONA_ADDRESS', address: transactor.wallet.address});
    }
}