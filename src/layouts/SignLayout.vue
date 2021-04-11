<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="column items-center sign-layout">
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { PathName } from 'src/router/routes';
import { isDef } from 'src/utils';
import { Route } from 'vue-router';

export default defineComponent({
  name: 'SignLayout',
  data() {
    return {
      transitionName: '',
    };
  },
  watch: {
    $route(to: Route, from: Route) {
      if (isDef(to.meta?.index) && isDef(from.meta?.index)) {
        if (to.meta.index > from.meta.index) {
          this.transitionName = 'slide-left';
        } else if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right';
        }
        return;
      }
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth > fromDepth ? 'slide-left' : 'slide-right';
    },
  },
  created() {
    const { $route, $router } = this;
    if ($route.path === PathName.SIGN) {
      void $router.replace(PathName.LOGIN);
    }
  },
});
</script>
<style lang="scss" scoped>
.sign {
  &-layout {
    height: 100%;
    width: 100%;
  }
}
</style>
