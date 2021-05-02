import { RouteConfig } from 'vue-router';
export enum PathName {
  SIGN = '/sign',
  _LOGIN = 'login',
  LOGIN = '/sign/login',
  _REGISTER = 'register',
  REGISTER = '/sign/register',
  ENTRY = '/',
  HOME = '/home',
  _HOME = 'home',
  TEAM_CENTER = '/team',
  TEAM = '/team/:id',
  TEAM_PROJECT = '/team/project',
  _TEAM_PROJECT = '/team/project/:id',
  TEAM_DOCUMENT = '/team/document',
  _TEAM_DOCUMENT = '/team/document/:id',
  USER_CENTER = '/user',
}

export enum RouteName {
  LOGIN = '登录',
  REGISTER = '注册',
  HOME = '首页',
  TEAM_CENTER = '团队大厅',
  TEAM = '团队',
  TEAM_PROJECT = '团队项目',
  TEAM_DOCUMENT = '团队文档',
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
        component: () => import('pages/Login/index.vue'),
      },
      {
        path: PathName._REGISTER,
        meta: { index: 1 },
        name: RouteName.REGISTER,
        component: () => import('pages/Register/index.vue'),
      },
    ],
  },
  {
    path: PathName.ENTRY,
    redirect: PathName.HOME,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: PathName._HOME,
        name: RouteName.HOME,
        component: () => import('src/pages/Home.vue'),
      },
      {
        path: PathName.TEAM_CENTER,
        name: RouteName.TEAM_CENTER,
        component: () => import('src/pages/TeamCenter/index.vue'),
      },
      {
        path: PathName.TEAM,
        name: RouteName.TEAM,
        component: () => import('src/pages/Team/index.vue'),
      },
      {
        path: PathName._TEAM_PROJECT,
        name: RouteName.TEAM_PROJECT,
        component: () => import('src/pages/Team/TeamProject/index.vue'),
      },
      {
        path: PathName.USER_CENTER,
        name: RouteName.USER_CENTER,
        component: () => import('pages/UserCenter/index.vue'),
      },
      {
        path: PathName._TEAM_DOCUMENT,
        name: RouteName.TEAM_DOCUMENT,
        component: () => import('pages/Team/TeamDocument/index.vue'),
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
