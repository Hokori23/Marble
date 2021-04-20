import { User } from 'src/request/user';
import { JsonClone } from 'src/utils';
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from 'src/utils/const';

export interface CommonStateInterface {
  userInfo: Partial<User>;
  token: string;
  isLogin: boolean;
}
export const DefaultCommonState: CommonStateInterface = {
  userInfo: {},
  token: '',
  isLogin: false,
};

// initial state
(() => {
  const userInfo = localStorage.getItem(USER_INFO_NAME);
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  if (userInfo && token) {
    try {
      DefaultCommonState.userInfo = JSON.parse(userInfo);
      DefaultCommonState.token = token;
      DefaultCommonState.isLogin = true;
    } catch (error) {}
  }
})();

function state(): CommonStateInterface {
  return JsonClone(DefaultCommonState);
}

export default state;
