const INITIAL_STATE = {
    address: "",
    error: "",
    personalInfo: [],
    numberOfFields: 0,
    readAllPersonaLogs: false,
    balance: 0,
    validations: 0,
    isRunning: false,
    fieldName: "",
}

export default function persona(state = INITIAL_STATE, action) {

    //console.log('reducer persona/action', action)

    if (action.type == 'GET_PERSONA_BASIC_DATA') {
        //console.log('reducer GET_PERSONA_BASIC_DATA state', state)
        return {
            ...state, personalInfo: action.novoPersonalInfo,
            numberOfFields: action.numberOfFields,
            address: action.address,
            isRunning: false,
            readAllPersonaLogs: true,
            fieldName: action.fieldName,
        }
    }

    if (action.type == 'READ_ALL_PERSONA_LOGS') {
        // console.log('reducer/READ_ALL_PERSONA_LOGS')
        return { ...state, readAllPersonaLogs: true }
    }

    if (action.type == 'WILL_READ_ALL_PERSONA_LOGS') {
        // console.log('reducer/WILL_READ_ALL_PERSONA_LOGS')
        return { ...state, readAllPersonaLogs: false }
    }


    if (action.type == 'RUNNING_METHOD') {
        // console.log('reducer/RUNNING_METHOD')
        return { ...state, isRunning: true }
    }

    if (action.type == 'METHOD_EXECUTED') {
        // console.log('reducer/METHOD_EXECUTED')
        return { ...state, isRunning: false }
    }

    if (action.type == 'ASKED_TO_VALIDATE') {
        console.log('reducer/ASKED_TO_VALIDATE', action)
        return { ...state, isRunning: false, personalInfo: action.personalInfo }
    }

    if (action.type == 'ADD_PERSONA_DATA') {
        // console.log('reducer/ADD_PERSONA_DATA')
        return {
            ...state,
            personalInfo: [action.newField, ...state.personalInfo],
            numberOfFields: state.personalInfo.length + 1,
            isRunning: false
        }
    }

    if (action.type == 'GET_BALANCE') {
        return { ...state, balance: action.balance }
    }

    if (action.type == 'GET_SCORE') {
        return { ...state, validations: action.validations, numberOfFields: action.numberOfFields }
    }

    if (action.type == 'GET_PERSONA_DATA') {
        return { ...state, personalInfo: action.novoPersonalInfo }
    }

    if (action.type == 'GET_PERSONA_ADDRESS') {
        return { ...state, address: action.address }
    }

    if (action.type == 'ERROR_PERSONA_DATA') {
        return { ...state, error: action.error, isRunning: false };
    }

    if (action.type == 'CLEAN_ERROR') {
        // console.log('reducer/WILL_READ_ALL_PERSONA_LOGS')
        return { ...state, error: "" }
    }
    if (action.type == 'GET_NOTIFICATIONS') {
        return { ...state, notifications: action.notifications }
    }
    if (action.type == 'REFRESH_NOTIFICATIONS') {
        console.log('reducer/REFRESH_NOTIFICATIONS/FieldName.....:', action.fieldName)
        return { ...state, notifications: action.notifications.splice(action.notifications.indexOf(action.fieldName), 1) }
    }

    return state;
}