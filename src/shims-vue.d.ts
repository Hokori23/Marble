// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

/**
 * 配置Vue-Router Type
 * #<https://blog.csdn.net/airdark_long/article/details/105027350>
 */
declare module '*.vue' {
  import VueRouter, { Route } from 'vue-router';
  interface Vue {
    $router: VueRouter;
    $route: Route;
  }
}
