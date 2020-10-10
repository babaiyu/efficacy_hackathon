export const TypeRedux = {
  IS_LOGIN: 'IS_LOGIN',
  IS_LOGOUT: 'IS_LOGOUT',
};

export interface Action {
  type: String;
  data?: any;
  message?: any;
}

export interface UserState {
  isLogin: boolean;
  dataUser: any;
}
