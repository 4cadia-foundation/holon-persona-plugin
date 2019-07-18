import {toast} from 'react-toastify';

const toastMiddleware = () => (next) => (action) => {
  if(action.toast) {
    toast(action.toast.message, action.toast.options);
  }
  return next(action);
}
export default toastMiddleware;
