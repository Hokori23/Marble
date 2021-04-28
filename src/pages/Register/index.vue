<template>
  <q-page class="column items-center page q-pa-md q-pt-none">
    <header>
      <h3 class="non-selectable text-center text-secondary q-mb-none">
        Marble
      </h3>
      <div class="sub-header row items-center non-selectable">
        <div class="sub-header--left">
          <q-btn
            v-go-back="PathName.LOGIN"
            flat
            dense
            round
            color="primary"
            icon="arrow_back"
          />
        </div>
        <h5>
          注册
        </h5>
        <div class="sub-header--left"></div>
      </div>
    </header>
    <RegisterForm
      :onSubmit="onSubmit"
      :onReset="onReset"
      :onSendCaptcha="onSendCaptcha"
      :userAccount.sync="userAccount"
      :userName.sync="userName"
      :password.sync="password"
      :gender.sync="gender"
      :email.sync="email"
      :captcha.sync="captcha"
    />
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { PathName } from 'src/router/routes';
import RegisterForm from 'src/components/RegisterForm.vue';
import { Notify } from 'quasar';
import { isUndef } from 'src/utils';
import useRegister from './useRegister';

export default defineComponent({
  name: 'Register',
  components: {
    RegisterForm,
  },
  setup() {
    const {
      userAccount,
      userName,
      password,
      gender,
      email,
      captcha,
      onReset,
      onSendCaptcha,
    } = useRegister();
    return {
      userAccount,
      userName,
      password,
      gender,
      email,
      captcha,
      onReset,
      onSendCaptcha,
      PathName,
    };
  },
  methods: {
    async onSubmit() {
      const { userAccount, password } = this.$data;
      const res = await this.$request.user.register({ userAccount, password });
      if (isUndef(res) || res.code !== 0) {
        Notify.create({
          type: 'warning',
          message: res.message,
        });
        return;
      }
      Notify.create({
        type: 'info',
        message: '注册成功',
      });
      void this.$router.push(PathName.LOGIN);
    },
  },
});
</script>

<style lang="scss" scoped>
.sub-header {
  &--left,
  &--right {
    flex: auto;
  }
}
</style>
