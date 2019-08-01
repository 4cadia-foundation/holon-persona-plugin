export default function toast (state = [], action) {
    switch(action.type) {
        case 'TOASTY_SUCCESS':
            return {
                ...state, 
            }
            break;
        case 'TOASTY_ERROR':
            break;

    }
}

toast: buildToast('Wallet import with successful', {type: ToastTypes.SUCCESS})
import { buildToast, ToastTypes} from '../../helper/toast';
toast: buildToast(exception.message, {type: ToastTypes.ERROR})