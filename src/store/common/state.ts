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

function state(): CommonStateInterface {
  // initial state
  const userInfo = localStorage.getItem(USER_INFO_NAME);
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  const cloneDefaultCommonState = JsonClone(DefaultCommonState);
  if (userInfo && token) {
    try {
      cloneDefaultCommonState.userInfo = JSON.parse(userInfo);
      cloneDefaultCommonState.token = token;
      cloneDefaultCommonState.isLogin = true;
    } catch (error) {}
  }
  return JsonClone(cloneDefaultCommonState);
}

export default state;
