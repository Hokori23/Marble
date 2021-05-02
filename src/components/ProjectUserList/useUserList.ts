import { ref } from '@vue/composition-api';
import request from 'src/request';
import { isUndef } from 'src/utils';
import { User } from 'src/request/user';

export default () => {
  const loading = ref(false);
  const users = ref([] as User[]);

  const retrieveUsers = async (id: string) => {
    loading.value = true;
    const res = await request.user.retrieveByProject(id);
    loading.value = false;
    if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
      return;
    }
    users.value = res.data;
  };

  return {
    loading,
    users,
    retrieveUsers,
  };
};
