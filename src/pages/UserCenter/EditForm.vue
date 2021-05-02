<template>
  <q-form
    ref="editForm"
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
      @input="$emit('update:userAccount', $event)"
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
      @input="$emit('update:userName', $event)"
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
      @input="$emit('update:email', $event)"
    />
    <q-select
      filled
      :value="displayGender"
      :options="genderOptions"
      :dense="isMobileScreen"
      label="性别"
      @input="$emit('update:gender', $event.value)"
    />
    <div class="row justify-evenly">
      <q-btn
        label="保存修改"
        type="submit"
        color="primary"
        :disable="!isChange || disable"
        :loading="loading"
      />
      <q-btn
        label="重置"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
        :disable="!isChange || loading || disable"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { genderOptions } from 'src/request/user';
import { PathName } from 'src/router/routes';
import { isEmail } from 'src/utils/index';
export default defineComponent({
  name: 'EditForm',
  props: {
    userAccount: {
      type: String,
      required: true,
    },
    userName: {
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
    onSubmit: {
      type: Function,
      required: true,
    },
    onReset: {
      type: Function,
      required: true,
    },
    isChange: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      PathName,
      isEmail,
      genderOptions,
    };
  },
  computed: {
    isMobileScreen(): boolean {
      return this.$q.screen.lt.md;
    },
    displayGender(): string {
      return this.genderOptions.filter((v) => {
        return v.value === this.gender;
      })[0].label;
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
