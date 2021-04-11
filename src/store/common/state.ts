import { User } from 'src/request/user';
import { JsonClone } from 'src/utils';

export interface CommonStateInterface {
  userInfo: Partial<User>;
  token: string;
  isLogin: boolean;
}
export const DefaultCommonState = {
  userInfo: {},
  token: '',
  isLogin: false,
};
function state(): CommonStateInterface {
  return JsonClone(DefaultCommonState);
}

export default state;
