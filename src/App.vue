<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mapState } from 'vuex';
import { StateInterface } from 'src/store';
import { PathName } from 'src/router/routes';

export default defineComponent({
  name: 'App',
  computed: mapState({
    isLogin: (state) => (state as StateInterface).common.isLogin,
  }),
  beforeRouteEnter(to, from, next) {
    console.log(to.path, PathName.SIGN, to.path.startsWith(PathName.SIGN));
    if (this.isLogin && to.path.startsWith(PathName.SIGN)) {
      next(PathName.HOME);
    } else if (to.path === PathName.SIGN) {
      next(PathName.LOGIN);
    } else {
      next();
    }
  },
});
</script>
