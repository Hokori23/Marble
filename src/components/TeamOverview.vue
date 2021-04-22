<template>
  <q-item class="q-py-md" clickable :to="`${PathName.TEAM_CENTER}/${team.id}`">
    <q-item-section>
      <q-item-label>{{ team.name }}</q-item-label>
      <q-item-label>{{ team.description }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { PathName } from 'src/router/routes';

export default defineComponent({
  name: 'TeamOverview',
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { PathName };
  },
});
</script>
