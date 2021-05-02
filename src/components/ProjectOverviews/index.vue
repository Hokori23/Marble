<template>
  <q-card-section class="project-overviews col-8 column q-pa-none">
    <!-- skeleton -->
    <q-item-label header class="project-overviews-title non-selectable">
      项目列表
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
        v-for="project in projects"
        :key="project.id"
        class="q-py-md q-pr-none"
        clickable
        :to="`${PathName.TEAM_PROJECT}/${String(project.id)}`"
      >
        <q-item-section>
          <q-item-label>
            {{ project.name }}
          </q-item-label>
          <q-item-label caption lines="3" style="max-width: 400px;">
            {{ project.description }}
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
import { ProjectType } from 'src/request/project';
import { PathName } from 'src/router/routes';
import useProjectOverview from './useProjectOverview';
export default defineComponent({
  name: 'ProjectOverviews',
  props: {
    type_id: {
      type: Number,
      required: true,
    },
    associated_id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const {
      loading,
      projects,
      page,
      capacity,
      total,
      maxPage,
      retrievePage,
    } = useProjectOverview();
    return {
      loading,
      projects,
      page,
      capacity,
      total,
      maxPage,
      retrievePage,
      PathName,
    };
  },
  activated() {
    void this.retrievePage(
      Number(this.type_id) as ProjectType,
      Number(this.associated_id),
    );
  },
});
</script>
