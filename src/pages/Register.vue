<template>
  <q-page class="column items-center page q-pa-md">
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
import { Gender } from 'src/request/user';

export default defineComponent({
  components: {
    RegisterForm,
  },
  setup() {
    return { PathName };
  },
  data() {
    return {
      userAccount: '',
      userName: '',
      password: '',
      gender: Gender.UNKNOWN,
      email: '',
      captcha: '',
    };
  },
  methods: {
    onReset() {
      this.userAccount = this.userName = this.password = this.email = this.captcha =
        '';
      this.gender = Gender.UNKNOWN;
    },
    onSubmit() {
      console.log(this.userAccount, this.password);
    },
    async onSendCaptcha() {
      const { code } = await this.$request.user.sendCaptcha({
        email: this.email,
      });
      return code === 0;
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
