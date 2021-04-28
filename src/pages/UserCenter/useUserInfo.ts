import { User } from 'src/request/user';
import { JsonClone } from 'src/utils';
import { Store } from 'src/store';
import { reactive, ref, watch } from '@vue/composition-api';
import request from 'src/request';

export default () => {
  const { userInfo } = Store.store.state.common;
  const cloneUserInfo: User = JsonClone(userInfo);
  const reactivedUserInfo = reactive(cloneUserInfo);
  const isChange = ref(false);
  const isReset = ref(false);
  const userInfoUploading = ref(false);

  const onReset = (userInfo: User) => {
    const cloneUserInfo = JsonClone(userInfo);
    Object.keys(reactivedUserInfo).forEach((key) => {
      if (key === 'createdAt' || key === 'updatedAt') return;
      reactivedUserInfo[key] = cloneUserInfo[key];
    });
    isChange.value = false;
    isReset.value = true;
  };

  const onSubmit = async (userInfo: User) => {
    const cloneUserInfo = JsonClone(userInfo);
    userInfoUploading.value = true;
    const res = await request.user.edit(cloneUserInfo);
    userInfoUploading.value = false;

    return res;
  };

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
    onReset,
    onSubmit,
    userInfoUploading,
    reactivedUserInfo,
  };
};
