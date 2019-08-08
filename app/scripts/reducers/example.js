const INITIAL_STATE = {
  lastId: 0
};

export default function example(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'EXAMPLE':
      return  {...state, lastId: action.lastId};
      break;
    default:
      return state;
  }
}
