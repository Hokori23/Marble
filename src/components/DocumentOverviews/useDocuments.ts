import { computed, ref } from '@vue/composition-api';
import request from 'src/request';
import { DocumentWithUserName } from 'src/request/document';
import { Notify } from 'quasar';
import { isUndef } from 'src/utils';

export default () => {
  const documents = ref({} as DocumentWithUserName[]);
  const loading = ref(false);
  const page = ref(1);
  const capacity = ref(5);
  const total = ref(0);

  const maxPage = computed(() => {
    return Math.ceil(total.value / capacity.value);
  });

  const retrieveDocuments = async (tid: string) => {
    loading.value = true;
    const res = await request.document.retrievePage(
      tid,
      page.value,
      capacity.value,
    );
    loading.value = false;
    if (isUndef(res) || res.code !== 0 || isUndef(res.data)) {
      Notify.create({
        type: 'warning',
        message: '查询文档失败',
      });
      return;
    }
    const data = res.data;
    total.value = data.total;
    documents.value = data.documents;
  };

  return {
    documents,
    loading,
    page,
    capacity,
    total,
    maxPage,
    retrieveDocuments,
  };
};
