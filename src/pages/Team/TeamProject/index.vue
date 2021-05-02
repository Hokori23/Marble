<template>
  <q-page
    :class="[
      'team-project column items-center',
      $q.screen.gt.sm ? 'q-mx-lg' : '',
    ]"
  >
    <q-card class="team-project-card column">
      <q-card-section>
        <div
          v-if="
            loading && project.team
              ? project.team.id !== Number($route.params.id)
              : loading
          "
          class="column items-center"
        >
          <q-skeleton width="15%" height="2rem" type="rect" />
          <q-skeleton width="40%" height="2rem" type="text" />
        </div>
        <div v-else>
          <div class="text-h6 text-center text-weight-bold">
            {{ project.team && project.team.name }} -- {{ project.name }}
          </div>
          <div class="text-subtitle1 text-center">
            {{ project.description }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal class="team-project-content">
        <DocumentOverview :id="$route.params.id" />
        <q-separator vertical />
        <ProjectUserList :project_id="$route.params.id" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import DocumentOverview from 'src/components/DocumentOverviews/index.vue';
import ProjectUserList from 'src/components/ProjectUserList/index.vue';
import useTeamProject from './useTeamProject';

export default defineComponent({
  name: 'TeamProject',
  components: { DocumentOverview, ProjectUserList },
  setup() {
    const { project, loading, retrieveProject } = useTeamProject();
    return { project, loading, retrieveProject };
  },
  activated() {
    void this.retrieveProject(this.$route.params.id);
  },
});
</script>

<style lang="scss" scoped>
.team-project {
  &-card,
  &-pagination {
    width: 100%;
  }
  &-card,
  &-content {
    flex: auto;
  }
  &-content {
    height: calc(100% - 92px);
  }
}
</style>
