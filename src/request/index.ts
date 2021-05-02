import axios, { AxiosRequestConfig } from 'axios';
import { Dialog } from 'quasar';
import { REQUEST_WHITE_LIST } from 'src/utils/const';
import { Restful } from './type';
import * as user from './user';
import * as upload from './upload';
import * as team from './team';
import * as document from './document';
import * as project from './project';
import { Store } from 'src/store';
const isWhiteUrl = (url: string) => {
  return !REQUEST_WHITE_LIST.every((reg) => !reg.test(url));
};
export const request = async <T>(config: AxiosRequestConfig) => {
  const { store } = Store;
  const isWhiteUrlFlag = isWhiteUrl(config.url as string);
  try {
    const token = store.state.common.token as string;
    const headers = config.headers || {};
    // 如果本地有token，每个非白名单请求都附带上token
    if (token && !isWhiteUrlFlag) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await axios.request<Restful<T>>({
      ...config,
      headers,
    });
    if (
      (isWhiteUrlFlag && res.data.code !== 200) ||
      (!isWhiteUrlFlag && res.data.code !== 0) // TODO: code非零都弹提示框？
    ) {
      Dialog.create({
        title: '警告',
        message: res.data.message,
      });
    }
    return (res.data as unknown) as T;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response);
    // eslint-disable-next-line no-console
    console.error('网络错误', err);
    if (err?.response?.status === 401 && !isWhiteUrlFlag) {
      Dialog.create({
        title: '警告',
        message: '登陆失效，请重新登陆',
      });
      store.commit('common/logOut');
    } else if (err?.response?.status === 403) {
      Dialog.create({
        title: '警告',
        message: '无权进行此操作',
      });
    } else {
      Dialog.create({
        title: '警告',
        message: `请求失败，状态码：${String(err?.response?.status)}`,
      });
    }
  }
};
export { user, upload, team, document, project };
export default { user, upload, team, document, project };
