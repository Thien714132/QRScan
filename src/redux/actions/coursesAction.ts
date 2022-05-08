import { EnumWriteAnAnswer } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setCourse = (course: any) => {
    const set = createActions(EnumWriteAnAnswer.SET_COURSE, {
        course
      });
      store.dispatch(set);
}

export const deleteCourse = () => {
    const remove = createActions(EnumWriteAnAnswer.DELETE_COURSE, null);
      store.dispatch(remove);
}