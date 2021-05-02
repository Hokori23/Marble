<template>
  <q-card-section class="user-list col-4 q-pa-none">
    <!-- skeleton -->
    <q-item-label header class="user-list-title non-selectable">
      成员列表
    </q-item-label>
    <div v-if="loading">
      <q-item v-for="i in 5" :key="i">
        <q-item-section v-if="$q.screen.gt.sm" avatar>
          <q-skeleton type="QAvatar" size="38px" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <!-- content -->
    <div v-else>
      <q-item
        v-for="user in users"
        :key="user.id"
        clickable
        :to="`${PathName.USER_CENTER}/${String(user.id)}`"
      >
        <q-item-section v-if="$q.screen.gt.sm" avatar>
          <q-avatar size="lg" class="cursor-pointer">
            <img :src="user.avatarUrl" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user.userName }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useUserList from './useUserList';
import { PathName } from 'src/router/routes';
export default defineComponent({
  name: 'ProjectUserList',
  props: {
    project_id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { loading, users, retrieveUsers } = useUserList();
    return { loading, users, retrieveUsers, PathName };
  },
  activated() {
    void this.retrieveUsers(this.project_id);
  },
});
</script>
<style lang="scss" scoped>
.user-list {
  position: sticky;
  top: 48px;
  max-height: 60vh;
  overflow: auto;
  &-title {
    position: sticky;
    top: 0;
    background-color: $primary;
    color: $grey-1;
    z-index: 2;
  }
}
</style>
