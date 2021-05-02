import { ref } from '@vue/composition-api';
import { Notify } from 'quasar';
import request from 'src/request';
import { ProjectWithTeam } from 'src/request/project';
import { isUndef } from 'src/utils';
export default () => {
  const project = ref({} as ProjectWithTeam);
  const loading = ref(false);
  const retrieveProject = async (id: string) => {
    loading.value = true;
    const res = await request.project.retrieveById(id);
    loading.value = false;
    if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
      Notify.create({
        type: 'warning',
        message: '查询团队失败',
      });
      return;
    }
    project.value = res.data;
  };
  return { project, loading, retrieveProject };
};
