<template>
  <q-item class="q-py-md" clickable :to="`${PathName.TEAM_CENTER}/${team.id}`">
    <q-item-section>
      <q-item-label>{{ team.name }}</q-item-label>
      <q-item-label caption lines="3" style="max-width: 400px;">
        {{ team.description }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="team-overview__avatar">
        <q-avatar
          v-for="user in displayUsers"
          :key="user.id"
          class="cursor-pointer"
          size="lg"
          @click.stop.prevent="navigateToUserInfo(Number(user.id))"
        >
          <img :src="user.avatarUrl" />
        </q-avatar>
        <q-avatar v-if="this.team.users.length > 2" size="lg">
          <q-icon name="more_horiz" />
        </q-avatar>
      </div>
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { User } from 'src/request/user';
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
  computed: {
    displayUsers(): User[] {
      return (this.team?.users as User[]).slice(0, 2);
    },
  },
  methods: {
    navigateToUserInfo(id: number) {
      void this.$router.push(`${PathName.USER_CENTER}/${String(id)}`);
    },
  },
});
</script>

<style lang="scss">
.team-overview__avatar {
  .q-avatar {
    margin-right: 10px;
  }
}
</style>
