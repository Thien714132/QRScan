import { EnumWriteAnAnswer } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setHistory = (history: any) => {
    const set = createActions(EnumWriteAnAnswer.SET_HISTORY, {
        history
      });
      store.dispatch(set);
}

export const deleteHistory = () => {
    const remove = createActions(EnumWriteAnAnswer.DELETE_HISTORY, null);
      store.dispatch(remove);
}