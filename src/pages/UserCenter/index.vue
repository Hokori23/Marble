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
            @beforeUpload="beforeAvatarUpload"
            @onUpload="handleAvatarUpload"
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
          ref="editForm"
          :userAccount.sync="reactivedUserInfo.userAccount"
          :userName.sync="reactivedUserInfo.userName"
          :gender.sync="reactivedUserInfo.gender"
          :email.sync="reactivedUserInfo.email"
          :onSubmit="handleSubmit"
          :onReset="handleReset"
          :isChange="isChange"
          :loading="userInfoUploading"
          :disable="avatarUploading"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import EditForm from 'src/pages/UserCenter/EditForm.vue';
import UploadAvatar from 'src/pages/UserCenter/UploadAvatar.vue';
import { JsonClone, isUndef } from 'src/utils';
import { mapMutations } from 'vuex';
import useAvatar from './useAvatar';
import useUserInfo from './useUserInfo';

export default defineComponent({
  name: 'UserCenter',
  components: {
    EditForm,
    UploadAvatar,
  },
  setup() {
    const { avatarUploading, beforeAvatarUpload, onAvatarUpload } = useAvatar();
    const {
      isChange,
      isReset,
      userInfoUploading,
      reactivedUserInfo,
      onReset,
      onSubmit,
    } = useUserInfo();

    return {
      avatarUploading,
      beforeAvatarUpload,
      onAvatarUpload,
      isChange,
      isReset,
      onReset,
      onSubmit,
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
    handleReset() {
      this.onReset(this.$store.state.common.userInfo);
    },
    async handleSubmit() {
      const res = await this.onSubmit(this.reactivedUserInfo);
      if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
        this.$q.notify({
          type: 'warning',
          message: '上传头像失败',
        });
      } else {
        this.reactivedUserInfo = JsonClone(res.data);
        this.$forceUpdate(); // TODO: 解决输入框值不更新问题
        this.setUserInfo(res.data);
        this.$q.notify({
          type: 'success',
          message: '保存信息成功',
        });
      }
    },
    async handleAvatarUpload(url: string) {
      const res = await this.onAvatarUpload(
        this.$store.state.common.userInfo,
        url,
      );
      if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
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
