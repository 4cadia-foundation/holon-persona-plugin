import * as Type from '../constants/toastTypes';

export const ToastTypes = Type;
export const buildToast = (message, type = Type.DEFAULT, options) => ({
  message,
  type,
  options,
});

export default (message, type = Type.DEFAULT, options) => ({
  type: Type.SHOW_TOAST,
  toast: buildToast(message, type, options),
});
