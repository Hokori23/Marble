import { computed, ref, watch } from '@vue/composition-api';
import { Project, ProjectType } from 'src/request/project';
import request from 'src/request';
import { isUndef } from 'src/utils';

export default () => {
  const loading = ref(false);
  const projects = ref([] as Project[]);
  const page = ref(1);
  const capacity = ref(5);
  const total = ref(0);

  const maxPage = computed(() => {
    return Math.ceil(total.value / capacity.value);
  });

  const retrievePage = async (type_id: ProjectType, associated_id: number) => {
    loading.value = true;
    const res = await request.project.retrievePage(
      type_id,
      associated_id,
      page.value,
      capacity.value,
    );
    loading.value = false;

    if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
      return;
    }
    const data = res.data;
    total.value = data.total;
    projects.value = data.projects;
  };
  watch(page, retrievePage);

  return {
    loading,
    projects,
    page,
    capacity,
    total,
    maxPage,
    retrievePage,
  };
};
