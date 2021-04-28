import { computed, onActivated, ref, watch } from '@vue/composition-api';
import { TeamWithUsers } from 'src/request/team';
import request from 'src/request';
import { isUndef } from 'src/utils';
import { Notify } from 'quasar';

export default () => {
  const page = ref(1);
  const capacity = ref(5);
  const total = ref(0);
  const maxPage = computed(() => {
    return Math.ceil(total.value / capacity.value);
  });
  const teams = ref([] as TeamWithUsers[]);

  const isLoading = ref(false);

  const retrieveJoined = async () => {
    isLoading.value = true;
    const res = await request.team.retrieveJoined(page.value, capacity.value);
    isLoading.value = false;
    if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
      Notify.create({
        type: 'warning',
        message: '查询团队失败',
      });
      return;
    }
    const data = res.data;
    total.value = data.total;
    teams.value = data.teams;
  };
  watch(page, retrieveJoined);

  onActivated(retrieveJoined);
  return {
    page,
    capacity,
    total,
    maxPage,
    teams,
    isLoading,
    retrieveJoined,
  };
};
