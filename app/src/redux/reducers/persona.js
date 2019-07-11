const INITIAL_STATE = {
    address: "",
    error: "",
    personalInfo: [],
}

export default function persona (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'GET_PERSONA_DATA':
            return{...state, personalInfo : action.personalInfo, address: action.address};
        break;
        case 'GET_PERSONA_ADDRESS':
            return{...state, error: action.error};
        break;
        default:
            return state;
    } 
}