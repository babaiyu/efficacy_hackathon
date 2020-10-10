import {TypeRedux, Action, UserState as State} from '../types';

const initialState: State = {
  isLogin: false,
  dataUser: {},
};

const userReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case TypeRedux.IS_LOGIN:
      return {
        ...state,
        isLogin: true,
        dataUser: action.data,
      };

    case TypeRedux.IS_LOGOUT:
      return {
        ...state,
        isLogin: false,
        dataUser: {},
      };

    default:
      return state;
  }
};

export default userReducer;
