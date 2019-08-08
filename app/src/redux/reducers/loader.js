const INITIAL_STATE = {
    message: '',
    visible: false
};

export default function loading(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ENABLE_LOADING':
            return {...state, message: this.state.message, visible: true};
            break;
        case 'DISABLE_LOADING':
            return {...state, visible: false};
            break;
        default:
            return state;
    }
}