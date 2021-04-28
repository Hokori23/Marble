import { ref } from '@vue/composition-api';
import request from 'src/request';
import { Gender } from 'src/request/user';

export default () => {
  const userAccount = ref('');
  const userName = ref('');
  const password = ref('');
  const gender = ref(Gender.UNKNOWN);
  const email = ref('');
  const captcha = ref('');

  const onReset = () => {
    userAccount.value = userName.value = password.value = email.value = captcha.value =
      '';
    gender.value = Gender.UNKNOWN;
  };

  const onSendCaptcha = async () => {
    const res = await request.user.sendCaptcha({
      email: email.value,
    });
    return res && res.code === 0;
  };

  return {
    userAccount,
    userName,
    password,
    gender,
    email,
    captcha,
    onReset,
    onSendCaptcha,
  };
};
