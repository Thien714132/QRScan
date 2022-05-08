import { EnumWriteAnAnswer } from "./actionTypes";

const initValue = {
    course: {},
};

const course = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumWriteAnAnswer.SET_COURSE: 
    return {
      ...state,
      course: action.course
    }
    case EnumWriteAnAnswer.DELETE_COURSE: 
    return {
      ...state,
      course: null,
    }
    default:
      return state;
  }
};

export default course;
