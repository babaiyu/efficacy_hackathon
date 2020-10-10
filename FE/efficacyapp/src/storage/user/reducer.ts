import {TypeRedux, Action, UserState as State} from '../types';

const initialState: State = {
  isLogin: false,
};

const userReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case TypeRedux.IS_LOGIN:
      return {
        ...state,
        isLogin: action.data,
      };

    default:
      return state;
  }
};

export default userReducer;
