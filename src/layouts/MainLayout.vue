<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="non-selectable">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

        <div>Marble - v1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8 non-selectable">
          Marble
        </q-item-label>
        <Drawer v-for="link in menuItems" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive :max="10">
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Drawer from 'src/components/Drawer.vue';

import { defineComponent, ref } from '@vue/composition-api';
import { Store } from 'src/store';
import { PathName, RouteName } from 'src/router/routes';
import { CommonStateInterface } from 'src/store/common/state';

const rawMenuItems = [
  {
    title: RouteName.HOME,
    icon: 'home',
    link: PathName.HOME,
  },
  {
    title: RouteName.TEAM_CENTER,
    icon: 'groups',
    link: PathName.TEAM_CENTER,
  },
  {
    title: RouteName.USER_CENTER,
    icon: 'account_circle',
    link: PathName.USER_CENTER,
  },
];

export default defineComponent({
  name: 'MainLayout',
  components: { Drawer },
  setup() {
    const leftDrawerOpen = ref(false);
    const menuItems = ref(rawMenuItems);

    return { leftDrawerOpen, menuItems };
  },
  computed: {
    title() {
      return this.$route.name;
    },
  },
  watch: {
    '$store.state.common.isLogin': {
      handler(v) {
        if (!v) {
          void this.$router.replace(PathName.LOGIN);
        }
      },
      immediate: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    const isLogin = (Store.store.state.common as CommonStateInterface).isLogin;
    if (!isLogin) {
      next(PathName.LOGIN);
    } else {
      next();
    }
  },
});
</script>
