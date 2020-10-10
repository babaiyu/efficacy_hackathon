import {TypeRedux, Action} from '../types';

export const actionIsLogin = (data?: any, message?: string): Action => ({
  type: TypeRedux.IS_LOGIN,
  data,
  message,
});
