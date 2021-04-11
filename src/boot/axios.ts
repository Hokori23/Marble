import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { Store } from 'src/request/index';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue, store }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
  Store.store = store;
});
