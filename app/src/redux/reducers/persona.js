const INITIAL_STATE = {
    address: "",
    error: "",
    personalInfo: [],
}

export default function persona (state= INITIAL_STATE, action){
    
    if (action.type == 'GET_PERSONA_DATA'){
        console.log('persona do reducer', action.personalInfo);
        return {...state, personalInfo: action.personalInfo, address: action.address}
    }

    if (action.type == 'GET_PERSONA_ADDRESS') {
        return {...state, error: action.error};
    }

    return state;
}