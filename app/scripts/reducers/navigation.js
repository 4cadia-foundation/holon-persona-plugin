const INITIAL_STATE = {
  enableNavBar: false
}

export default function navigation (state = INITIAL_STATE, action) {
  if (action.type == 'ENABLE_NAVBAR'){
    return { ...state, enableNavBar: action.enableNavBar };
  } 
  return state;
}