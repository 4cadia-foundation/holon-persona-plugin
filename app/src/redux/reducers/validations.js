const INITIAL_STATE = {
  publicKey: "",
  activeDocument: {},
  modules: [
    {
      id: 1,
      type: 'RG',
      status: 'Aproved'
    },
    {
      id: 2,
      type: 'CPF',
      status: 'Waiting Aprovation'
    }
  ]
};
  
export default function validations(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'SET_MODULE_ACTIVE':
      return {...state, activeDocument: action.doc}
    break;
    case 'SET_PUBLIC_KEY':
        return {...state, publicKey: action.publicKey}
    break;
    default:
      return state;
  }
}