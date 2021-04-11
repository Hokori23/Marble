<template>
  <q-form
    ref="registerForm"
    :class="[isMobileScreen ? 'q-gutter-sm' : 'q-gutter-md sign--form']"
    @submit="onSubmit"
    @reset="onReset"
  >
    <q-input
      filled
      label="账号 *"
      lazy-rules
      :dense="isMobileScreen"
      :rules="[
        (val) => /^.{5,20}$/.test(val) || '账号长度应为5至20字符',
        (val) => /^\w+$/.test(val) || '账号只能由字母、数字、下划线组成',
      ]"
      :value="userAccount"
      @change="$emit('update:userAccount', $event.target.value)"
    />

    <q-input
      auto-complete="username"
      filled
      label="用户名 *"
      lazy-rules
      :dense="isMobileScreen"
      :rules="[
        (val) => /^.{2,20}$/.test(val) || '用户名长度应为2至20字符',
        (val) => /^\w+$/.test(val) || '用户名只能由字母、数字、下划线组成',
      ]"
      :value="userName"
      @change="$emit('update:userName', $event.target.value)"
    />

    <q-input
      autocomplete="current-password"
      filled
      type="password"
      label="密码 *"
      lazy-rules
      :dense="isMobileScreen"
      :rules="[
        (val) => /^.{5,20}$/.test(val) || '密码长度应为5至20字符',
        (val) => /^\w+$/.test(val) || '密码只能由字母、数字、下划线组成',
      ]"
      :value="password"
      @change="$emit('update:password', $event.target.value)"
    />

    <q-input
      v-model="confirmPassword"
      filled
      type="password"
      label="确认密码 *"
      lazy-rules
      :dense="isMobileScreen"
      :rules="[
        (val) => (val !== '' && val !== null) || '请输入密码以确认',
        (val) => val === password || '两次输入密码不一样',
      ]"
    />

    <q-input
      filled
      type="email"
      label="邮箱 *"
      lazy-rules
      :dense="isMobileScreen"
      :rules="[
        (val) => (val !== '' && val !== null) || '邮箱不能为空',
        (val) => isEmail(val) || '邮箱格式错误',
      ]"
      :value="email"
      @change="$emit('update:email', $event.target.value)"
    />

    <q-input
      filled
      label="验证码 *"
      lazy-rules
      :dense="isMobileScreen"
      :rules="[(val) => (val !== '' && val !== null) || '验证码不能为空']"
      :value="captcha"
      @change="$emit('update:captcha', $event.target.value)"
    >
      <template v-slot:after>
        <q-btn
          unelevated
          color="primary"
          :disable="timer !== -1"
          :loading="isSendingCaptcha"
          @click="handleSendCaptcha"
        >
          {{ captchaText }}
        </q-btn>
      </template>
    </q-input>

    <div class="row justify-evenly">
      <q-btn label="注册" type="submit" color="primary" />
      <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from '@vue/composition-api';
import { PathName } from 'src/router/routes';
import { isEmail } from 'src/utils/index';

interface FormComponent extends Vue {
  validate: (shouldFocus?: boolean[]) => Promise<boolean>;
  getValidationComponents: () => FormComponent[];
}
export default defineComponent({
  name: 'RegisterForm',
  props: {
    userAccount: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    captcha: {
      type: String,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    onReset: {
      type: Function,
      required: true,
    },
    onSendCaptcha: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const timer = ref(-1);
    const time = ref(-1);
    const isSendingCaptcha = ref(false);
    const coldDownTime = 30;
    const confirmPassword = ref('');
    onBeforeUnmount(() => {
      if (timer.value !== -1) clearTimeout(timer.value); // 清理计时器
    });
    return {
      PathName,
      isEmail,
      timer,
      time,
      isSendingCaptcha,
      coldDownTime,
      confirmPassword,
    };
  },
  computed: {
    isMobileScreen(): boolean {
      return this.$q.screen.lt.md;
    },
    captchaText(): string {
      if (this.timer === -1) return '发送';
      return `${this.time} 秒`;
    },
  },
  methods: {
    async handleSendCaptcha() {
      // 验证表单
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const formItems = (this.$refs['registerForm'] as FormComponent)
        .getValidationComponents()
        .slice(0, -1);
      const validPromises = formItems.map((formItem) => formItem.validate());
      if (!(await Promise.all(validPromises)).every((v) => v)) return;

      // 发送验证码
      const onSendCaptcha = this.onSendCaptcha as () => Promise<boolean>;
      this.isSendingCaptcha = true;
      const flag = await onSendCaptcha();
      this.isSendingCaptcha = false;
      if (!flag) {
        this.$q.notify({
          type: 'negative',
          message: '发送邮箱验证码失败',
        });
        return;
      }

      this.$q.notify({
        type: 'info',
        message: '发送邮箱验证码成功',
      });

      // 开始倒计时
      const recur = (time: number) => {
        this.time = time;
        if (time >= 0) {
          this.timer = (setTimeout(() => {
            this.time = time;
            recur(time - 1);
          }, 1000) as unknown) as number;
        } else {
          this.timer = -1;
        }
      };
      recur(this.coldDownTime);
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
