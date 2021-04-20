import { RouteConfig } from 'vue-router';
export enum PathName {
  SIGN = '/sign',
  _LOGIN = 'login',
  LOGIN = '/sign/login',
  _REGISTER = 'register',
  REGISTER = '/sign/register',
  HOME = '/home',
  _HOME = 'home',
  ENTRY = '/',
  USER_CENTER = '/user',
}

export enum RouteName {
  LOGIN = '登录',
  REGISTER = '注册',
  HOME = '首页',
  USER_CENTER = '用户中心',
}

const routes: RouteConfig[] = [
  {
    path: PathName.SIGN,
    component: () => import('layouts/SignLayout.vue'),
    children: [
      {
        path: PathName._LOGIN,
        meta: { index: 0 },
        name: RouteName.LOGIN,
        component: () => import('pages/Login.vue'),
      },
      {
        path: PathName._REGISTER,
        meta: { index: 1 },
        name: RouteName.REGISTER,
        component: () => import('pages/Register.vue'),
      },
    ],
  },
  {
    path: PathName.ENTRY,
    redirect: PathName.HOME,
    name: RouteName.HOME,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: PathName._HOME,
        name: RouteName.HOME,
        component: () => import('src/pages/Home.vue'),
      },
      {
        path: PathName.USER_CENTER,
        name: RouteName.USER_CENTER,
        component: () => import('pages/UserCenter.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
