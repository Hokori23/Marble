import { RouteConfig } from 'vue-router';
export enum PathName {
  SIGN = '/sign',
  _LOGIN = 'login',
  LOGIN = '/sign/login',
  _REGISTER = 'register',
  REGISTER = '/sign/register',
  HOME = '/',
  _HOME = '',
}
const routes: RouteConfig[] = [
  {
    path: PathName.SIGN,
    component: () => import('layouts/SignLayout.vue'),
    children: [
      {
        path: PathName._LOGIN,
        meta: { index: 0 },
        component: () => import('src/pages/Login.vue'),
      },
      {
        path: PathName._REGISTER,
        meta: { index: 1 },
        component: () => import('src/pages/Register.vue'),
      },
    ],
  },
  {
    path: PathName.HOME,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: PathName._HOME, component: () => import('pages/Index.vue') },
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
