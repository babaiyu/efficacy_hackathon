import {TypeRedux, Action} from '../types';

export const actionIsLogin = (data?: any, message?: string): Action => ({
  type: TypeRedux.IS_LOGIN,
  data,
  message,
});

export const actionIsLogout = (): Action => ({
  type: TypeRedux.IS_LOGOUT,
});
