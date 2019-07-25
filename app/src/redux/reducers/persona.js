const INITIAL_STATE = {
    address: "",
    error: "",
    personalInfo: [],
    numberOfFields: 0,
    readAllPersonaLogs: false,
    balance: 0,
    isRunning: false
}

export default function persona (state = INITIAL_STATE, action) {

    //console.log('reducer persona/action', action)

    if (action.type == 'GET_PERSONA_BASIC_DATA') {    
        //console.log('reducer GET_PERSONA_BASIC_DATA state', state)
        return {...state, personalInfo: action.novoPersonalInfo, 
            numberOfFields: action.novoPersonalInfo.length+1, 
            address: action.address,
        }
    }

    if (action.type == 'READ_ALL_PERSONA_LOGS') {
        // console.log('reducer/READ_ALL_PERSONA_LOGS')
        return {...state, readAllPersonaLogs: true}
    }

    if (action.type == 'WILL_READ_ALL_PERSONA_LOGS') {
        // console.log('reducer/WILL_READ_ALL_PERSONA_LOGS')
        return {...state, readAllPersonaLogs: false}
    }

    
    if (action.type == 'RUNNING_METHOD') {
        // console.log('reducer/RUNNING_METHOD')
        return {...state, isRunning: true}
    }

    if (action.type == 'ADD_PERSONA_DATA') {
        // console.log('reducer/ADD_PERSONA_DATA')
        return {...state, 
            personalInfo: [action.newField, ...state.personalInfo], 
            numberOfFields: state.personalInfo.length+1,
            isRunning: false
        }
    }

    if (action.type == 'GET_BALANCE') {
        return {...state, balance: action.balance}
    }

    if (action.type == 'GET_PERSONA_DATA') {
        return{...state, personalInfo: action.novoPersonalInfo}
    }
    
    if (action.type == 'GET_PERSONA_ADDRESS') {
        return { ...state, address: action.address }
    }
    
    if (action.type == 'ERROR_PERSONA_DATA') {
        return { ...state, error: action.error };
    }
    
    return state;
}