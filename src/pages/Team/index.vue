<template>
  <q-page
    :class="['team column items-center', $q.screen.gt.sm ? 'q-mx-lg' : '']"
  >
    <q-card class="team-card column">
      <q-card-section>
        <div
          v-if="teamIsLoading && team.id !== Number($route.params.id)"
          class="column items-center"
        >
          <q-skeleton width="15%" height="2rem" type="rect" />
          <q-skeleton width="40%" height="2rem" type="text" />
        </div>
        <div v-else>
          <div class="text-h6 text-center text-weight-bold">
            {{ team.name }}
          </div>
          <div class="text-subtitle1 text-center">
            {{ team.description }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal class="team-content">
        <ProjectOverviews
          :type_id="ProjectType.TEAM"
          :associated_id="$route.params.id"
        />
        <q-separator vertical />
        <TeamUserList :team_id="$route.params.id" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ProjectOverviews from 'src/components/ProjectOverviews/index.vue';
import TeamUserList from 'src/components/TeamUserList/index.vue';
import useTeam from './useTeam';
import { ProjectType } from 'src/request/project';
export default defineComponent({
  name: 'Team',
  components: {
    ProjectOverviews,
    TeamUserList,
  },
  setup() {
    const { team, teamIsLoading, retrieveTeam } = useTeam();
    return { team, teamIsLoading, retrieveTeam, ProjectType };
  },
  activated() {
    void this.retrieveTeam(this.$route.params.id);
  },
});
</script>

<style lang="scss" scoped>
.team {
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
