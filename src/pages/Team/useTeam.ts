import { ref } from '@vue/composition-api';
import { TeamWithUsers } from 'src/request/team';
import request from 'src/request';
import { Notify } from 'quasar';
import { isUndef } from 'src/utils';

export default () => {
  const team = ref({} as TeamWithUsers);
  const teamIsLoading = ref(false);
  const retrieveTeam = async (id: string) => {
    teamIsLoading.value = true;
    const res = await request.team.retrieveById(id);
    teamIsLoading.value = false;
    if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
      Notify.create({
        type: 'warning',
        message: '查询团队失败',
      });
      return;
    }
    team.value = res.data;
  };
  return { team, teamIsLoading, retrieveTeam };
};
