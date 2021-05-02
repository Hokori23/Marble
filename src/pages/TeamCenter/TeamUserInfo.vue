<template>
  <q-item clickable :to="PathName.USER_CENTER">
    <q-item-section avatar>
      <q-avatar class="upload-avatar">
        <img :src="userInfo.avatarUrl" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ userInfo.userName }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { PathName } from 'src/router/routes';

export default defineComponent({
  name: 'TeamUserInfo',
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      PathName,
    };
  },
});
</script>
