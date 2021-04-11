import request from 'src/request';
import { boot } from 'quasar/wrappers';

declare module 'vue/types/vue' {
  interface Vue {
    $request: typeof request;
  }
}

export default boot(({ Vue }) => {
  Vue.prototype.$request = request;
});
