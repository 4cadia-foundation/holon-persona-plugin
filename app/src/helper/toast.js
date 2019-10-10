import * as Type from '../constants/toastTypes';

export const ToastTypes = Type.TYPE;
export const buildToast = (message, options) => ({
  message,
  options,
});

export default (message, options) => ({
  type: 'SHOW_TOAST',
  toast: buildToast(message, options),
});
