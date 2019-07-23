const INITIAL_STATE = {
    address: "",
    error: "",
    personalInfo: [],
    numberOfFields: 0,
    isRunning: false
}

export default function persona (state = INITIAL_STATE, action) {
    if (action.type == 'GET_PERSONA_BASIC_DATA') {
        return {...state, personalInfo: action.novoPersonalInfo, 
            numberOfFields: action.novoPersonalInfo.length+1, 
            address: action.address,
            isRunning: false
        }
    }
    
    if (action.type == 'RUNNING_METHOD') {
        console.log('reducer/RUNNING_METHOD')
        return {...state, isRunning: true}
    }

    if (action.type == 'ADD_PERSONA_DATA') {
        console.log('reducer/ADD_PERSONA_DATA')
        return {...state, 
            personalInfo: [action.newField, ...state.personalInfo], 
            numberOfFields: state.personalInfo.length+1,
            isRunning: false
        }
    }
    if (action.type == 'GET_PERSONA_ADDRESS') {
        return{...state, address: action.address}
    }
    if (action.type == 'ERROR_PERSONA_DATA') {
        return{...state, error: action.error};
    }
    return state;
}