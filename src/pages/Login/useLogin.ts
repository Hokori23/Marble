import { ref } from '@vue/composition-api';
import request from 'src/request';

export default () => {
  const userAccount = ref('');
  const password = ref('');
  const isLoading = ref(false);

  const onReset = () => {
    userAccount.value = password.value = '';
  };

  const onSubmit = async () => {
    isLoading.value = true;
    const res = await request.user.login({
      userAccount: userAccount.value,
      password: password.value,
    });
    isLoading.value = false;
    return res;
  };

  return { userAccount, password, isLoading, onReset, onSubmit };
};
