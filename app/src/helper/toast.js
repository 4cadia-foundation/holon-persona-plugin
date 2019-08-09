import * as Type from '../constants/toastTypes';
import { toast } from 'react-toastify';

export const ToastTypes = Type.TYPE;
export const buildToast = (message, options) => toast(message, options);
