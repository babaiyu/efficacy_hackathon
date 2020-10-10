export const TypeRedux = {
  IS_LOGIN: 'IS_LOGIN',
};

export interface Action {
  type: String;
  data?: any;
  message?: any;
}

export interface UserState {
  isLogin: boolean;
}
