import { JsonClone } from 'src/utils';
import { ACCESS_TOKEN_NAME, USER_INFO_NAME } from 'src/utils/const';
import { MutationTree } from 'vuex';
import { CommonStateInterface, DefaultCommonState } from './state';

const mutation: MutationTree<CommonStateInterface> = {
  setUserInfo(state: CommonStateInterface, newUserInfo) {
    localStorage.setItem(USER_INFO_NAME, JSON.stringify(newUserInfo));
    state.userInfo = newUserInfo;
  },
  setToken(state: CommonStateInterface, token) {
    localStorage.setItem(ACCESS_TOKEN_NAME, token);
    state.token = token;
  },
  logIn(state: CommonStateInterface) {
    state.isLogin = true;
  },
  logOut(state: CommonStateInterface) {
    console.log('logout');
    localStorage.removeItem(USER_INFO_NAME);
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    state.userInfo = JsonClone(DefaultCommonState.userInfo);
    state.token = DefaultCommonState.token;
    state.isLogin = DefaultCommonState.isLogin;
  },
};

export default mutation;
