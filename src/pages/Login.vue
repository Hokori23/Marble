<template>
  <q-page class="column items-center page q-pa-md q-pt-none">
    <header>
      <h3 class="non-selectable text-center text-secondary">
        Marble
      </h3>
      <h5 class="non-selectable text-center">
        登录
      </h5>
    </header>
    <LoginForm
      :onSubmit="onSubmit"
      :onReset="onReset"
      :userAccount.sync="userAccount"
      :password.sync="password"
      :isLoading="isLoading"
    />
  </q-page>
</template>
<script lang="ts">
import { mapMutations } from 'vuex';
import { defineComponent } from '@vue/composition-api';
import { isDef } from 'src/utils';
import { PathName } from 'src/router/routes';
import LoginForm from 'components/LoginForm.vue';

export default defineComponent({
  components: {
    LoginForm,
  },
  data() {
    return {
      userAccount: '',
      password: '',
      PathName: PathName,
      isLoading: false,
    };
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'common/setUserInfo',
      setToken: 'common/setToken',
      logIn: 'common/logIn',
    }),
    onReset() {
      this.userAccount = this.password = '';
    },
    async onSubmit() {
      const { userAccount, password } = this.$data;
      this.isLoading = true;
      const res = await this.$request.user.login({ userAccount, password });
      this.isLoading = false;
      if (isDef(res) && res.code === 0) {
        const { message, data } = res;
        if (isDef(data)) {
          this.setToken(data.token);
          this.setUserInfo(data);
          this.$q
            .dialog({
              title: '提示',
              message,
            })
            .onDismiss(() => {
              this.logIn();
            });
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.sign {
  &--form {
    min-width: 300px;
  }
}
</style>
