const INITIAL_STATE = {
  enableNavBar: false
};

export default function navigation (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ENABLE_NAVBAR':
    return { ...state, enableNavBar: action.enableNavBar };
    break;
  default:
    return state;
  }
}
