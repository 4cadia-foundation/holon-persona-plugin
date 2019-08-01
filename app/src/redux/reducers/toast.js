export default function toast (state = [], action) {
    switch(action.type) {
        case 'TOASTY_SUCCESS':
            return {
                ...state, type: ToastTypes.SUCCESS
            }
            break;
        case 'TOASTY_ERROR':
            return {
                ...state, type: ToastTypes.ERROR
            }
            break;

    }
    return state;
}