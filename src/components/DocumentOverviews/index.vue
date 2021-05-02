<template>
  <q-card-section class="document-overviews col-8 column q-pa-none">
    <!-- skeleton -->
    <q-item-label header class="document-overviews-title non-selectable">
      文档列表
    </q-item-label>
    <div v-if="loading" style="flex: auto;">
      <q-item v-for="i in 5" :key="i" class="q-py-md q-pr-none">
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="20%" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="90%" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <!-- content -->
    <div v-else style="flex: auto;">
      <q-item
        v-for="document in documents"
        :key="document.id"
        class="q-py-md q-pr-none"
        clickable
        :to="`${PathName.TEAM_DOCUMENT}/${String(document.id)}`"
      >
        <q-item-section>
          <q-item-label>
            {{ document.title }} - {{ document.user_name }}
          </q-item-label>
          <q-item-label caption lines="3" style="max-width: 400px;">
            {{ document.content }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <div class="row justify-center team-center-pagination q-my-sm">
      <q-pagination v-model="page" :max="maxPage" :disable="loading" input>
      </q-pagination>
    </div>
  </q-card-section>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { PathName } from 'src/router/routes';
import useDocuments from './useDocuments';

export default defineComponent({
  name: 'DocumentOverview',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const {
      documents,
      loading,
      page,
      capacity,
      total,
      maxPage,
      retrieveDocuments,
    } = useDocuments();
    return {
      documents,
      loading,
      page,
      capacity,
      total,
      maxPage,
      retrieveDocuments,
      PathName,
    };
  },
  activated() {
    void this.retrieveDocuments(this.id);
  },
});
</script>
