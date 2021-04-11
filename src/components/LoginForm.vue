<template>
  <q-form
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
    <div class="text-center no-border">
      <q-btn :ripple="false" flat outline unelevated :to="PathName.REGISTER">
        还没有账号？前往注册
      </q-btn>
    </div>

    <div class="row justify-evenly">
      <q-btn label="登录" type="submit" color="primary" />
      <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { PathName } from 'src/router/routes';

export default defineComponent({
  name: 'LoginForm',
  props: {
    userAccount: {
      type: String,
      required: true,
    },
    password: {
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
  },
  setup() {
    return { PathName };
  },
  computed: {
    isMobileScreen(): boolean {
      return this.$q.screen.lt.md;
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
