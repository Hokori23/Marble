<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
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

        <div>Quasar v{{ $q.version }}</div>
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Drawer from 'src/components/Drawer.vue';

const rawMenuItems = [
  {
    title: 'Marble',
    icon: 'home',
    link: PathName.HOME,
  },
  {
    title: '用户中心',
    // caption: 'Community Quasar projects',
    icon: 'account_circle',
    link: PathName.USER_CENTER,
  },
];

import { defineComponent, ref } from '@vue/composition-api';
import { Store } from 'src/store';
import { PathName } from 'src/router/routes';
import { CommonStateInterface } from 'src/store/common/state';

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
