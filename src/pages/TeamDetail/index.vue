<template>
  <div>{{ team.name }}</div>
</template>
<script lang="ts">
import { defineComponent, onActivated } from '@vue/composition-api';

import useTeam from './useTeam';
export default defineComponent({
  name: 'TeamDetail',
  setup(props, ctx) {
    const { team, teamIsLoading, retrieveTeam } = useTeam();
    onActivated(() => {
      void retrieveTeam(ctx.root.$route.params.id);
    });
    return {
      team,
      teamIsLoading,
      retrieveTeam,
    };
  },
});
</script>
