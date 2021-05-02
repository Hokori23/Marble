<template>
  <div>
    aaa
    <Document :id="$route.params.id" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Document from 'src/components/Document/index.vue';

export default defineComponent({
  name: 'TeamDocument',
  components: { Document },
  setup() {
    return {};
  },
});
</script>
