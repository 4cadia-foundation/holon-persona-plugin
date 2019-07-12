const INITIAL_STATE = {
    address: "",
    error: "",
    personalInfo: []

}

export default function persona (state = INITIAL_STATE, action) {
    if (action.type == 'GET_PERSONA_BASIC_DATA') {
        return{...state, personalInfo: action.personalInfo, address: action.address}
    }
    if (action.type == 'ERROR_PERSONA_DATA') {
        return{...state, error: action.error};
    }
    return state;
}