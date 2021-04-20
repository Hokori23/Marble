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
import { isDef } from 'src/utils';
import { Route } from 'vue-router';
import { Store } from 'src/store';
import { CommonStateInterface } from 'src/store/common/state';
import { PathName } from 'src/router/routes';

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
    '$store.state.common.isLogin'(val) {
      if (val) {
        void this.$router.replace(PathName.HOME);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    const isLogin = (Store.store.state.common as CommonStateInterface).isLogin;
    if (isLogin && to.path.startsWith(PathName.SIGN)) {
      next(PathName.HOME);
    } else if (to.path === PathName.SIGN) {
      next(PathName.LOGIN);
    } else {
      next();
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
