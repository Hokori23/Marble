<template>
  <q-page
    :class="['q-pa-md', isMobileScreen ? 'user-center--mobile' : 'user-center']"
  >
    <q-card flat bordered>
      <q-item>
        <q-item-section avatar>
          <UploadAvatar
            :src="reactivedUserInfo.avatarUrl"
            :loading="avatarUploading"
            @beforeUpload="beforeUpload"
            @onUpload="onUpload"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ reactivedUserInfo.userName }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-btn
            outline
            color="primary"
            label="退出登录"
            @click.stop="handleLogOut"
          />
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section class="column items-center">
        <EditForm
          :userAccount.sync="reactivedUserInfo.userAccount"
          :userName.sync="reactivedUserInfo.userName"
          :gender.sync="reactivedUserInfo.gender"
          :email.sync="reactivedUserInfo.email"
          :onSubmit="onSubmit"
          :onReset="onReset"
          :isChange="isChange"
          :loading="userInfoUploading"
          :disable="avatarUploading"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@vue/composition-api';
import EditForm from 'components/EditForm.vue';
import UploadAvatar from 'components/UploadAvatar.vue';
import { Store } from 'src/store';
import { JsonClone } from 'src/utils';
import { User } from 'src/request/user';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'UserCenter',
  components: {
    EditForm,
    UploadAvatar,
  },
  setup() {
    const isChange = ref(false);
    const isReset = ref(false);
    const avatarUploading = ref(false);
    const userInfoUploading = ref(false);
    const { userInfo } = Store.store.state.common;
    const cloneUserInfo: User = JsonClone(userInfo);
    const reactivedUserInfo = reactive(cloneUserInfo);

    // 用于更改保存按钮disable状态
    watch(
      () => reactivedUserInfo,
      () => {
        if (!isReset.value) {
          isChange.value = true;
        } else {
          isReset.value = false;
        }
      },
      {
        deep: true,
      },
    );

    return {
      isChange,
      isReset,
      avatarUploading,
      userInfoUploading,
      reactivedUserInfo,
    };
  },
  computed: {
    isMobileScreen(): boolean {
      return this.$q.screen.lt.md;
    },
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'common/setUserInfo',
      logOut: 'common/logOut',
    }),
    handleLogOut() {
      this.$q
        .dialog({
          title: '提示',
          message: '确定退出登录？',
        })
        .onOk(this.logOut);
    },
    async onSubmit() {
      const cloneUserInfo = JsonClone(this.reactivedUserInfo);
      this.userInfoUploading = true;
      const res = await this.$request.user.edit(cloneUserInfo);
      this.userInfoUploading = false;
      if (!res || res.code !== 0 || !res.data) {
        this.$q.notify({
          type: 'warning',
          message: '上传头像失败',
        });
      } else {
        this.reactivedUserInfo = res.data;
        this.setUserInfo(res.data);
        this.$q.notify({
          type: 'success',
          message: '保存信息成功',
        });
      }
    },
    beforeUpload() {
      this.avatarUploading = true;
    },
    async onUpload(url: string) {
      const userInfo: User = this.$store.state.common.userInfo;
      const cloneUserInfo = JsonClone(userInfo);
      cloneUserInfo.avatarUrl = url;
      const res = await this.$request.user.edit(cloneUserInfo);
      this.avatarUploading = false;
      if (!res || res.code !== 0 || !res.data) {
        this.$q.notify({
          type: 'warning',
          message: '上传头像失败',
        });
      } else {
        this.reactivedUserInfo.avatarUrl = url;
        this.setUserInfo(res.data);

        this.$q.notify({
          type: 'success',
          message: '上传头像成功',
        });
      }
    },
    onReset() {
      const userInfo: User = this.$store.state.common.userInfo;
      const cloneUserInfo = JsonClone(userInfo);
      Object.keys(this.reactivedUserInfo).forEach((key) => {
        if (key === 'createdAt' || key === 'updatedAt') return;
        this.reactivedUserInfo[key] = cloneUserInfo[key];
      });
      this.isChange = false;
      this.isReset = true;
    },
  },
});
</script>
<style lang="scss" scoped>
.user-center,
.user-center--mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-center {
  form {
    max-width: 80%;
    width: 500px;
  }
  &--mobile form {
    max-width: 80vw;
    width: 80vw;
  }
}
</style>
