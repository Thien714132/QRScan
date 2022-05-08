import { EnumWriteAnAnswer } from "./actionTypes";

const initValue = {
  history: null,
};

const history = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumWriteAnAnswer.SET_HISTORY: 
    return {
      ...state,
      history: action.history
    }
    case EnumWriteAnAnswer.DELETE_HISTORY: 
    return {
      ...state,
      history: null,
    }
    default:
      return state;
  }
};

export default history;
