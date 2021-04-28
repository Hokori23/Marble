import { ref } from '@vue/composition-api';
import request from 'src/request';
import { User } from 'src/request/user';
import { JsonClone } from 'src/utils';

export default () => {
  const avatarUploading = ref(false);

  const beforeAvatarUpload = () => {
    avatarUploading.value = true;
  };

  const onAvatarUpload = async (userInfo: User, url: string) => {
    const cloneUserInfo = JsonClone(userInfo);
    cloneUserInfo.avatarUrl = url;
    const res = await request.user.edit(cloneUserInfo);
    avatarUploading.value = false;
    return res;
  };

  return { avatarUploading, beforeAvatarUpload, onAvatarUpload };
};
