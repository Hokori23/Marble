<template>
  <q-dialog
    ref="dialog"
    content-class="new-team-dialog"
    :value="display"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6 text-weight-bold">创建团队</div>
      </q-card-section>

      <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
        <q-card-section class="q-pt-none">
          <q-input
            v-model="newTeam.name"
            filled
            label="团队名 *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || '请输入团队名',
              (val) => val.length < 10 || '团队名长度至多为10字符',
            ]"
          />

          <q-input
            v-model="newTeam.description"
            filled
            label="团队简述"
            lazy-rules
            autogrow
            :rules="[(val) => val.length < 256 || '团队简述不能超过255个字符']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :disable="isLoading"
            label="取消"
            type="reset"
            flat
            class="q-ml-sm"
          />
          <q-btn
            :loading="isLoading"
            outline
            label="创建"
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import { Team } from 'src/request/team';
import { JsonClone } from 'src/utils';

interface Dialog extends Vue {
  show: () => void;
  hide: () => void;
}
export default defineComponent({
  name: 'NewTeamDialog',
  props: {
    display: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const newTeam = reactive({ name: '', description: '' } as Team);
    return { newTeam };
  },
  methods: {
    hide() {
      this.$emit('update:display', false);
      const dialog = this.$refs['dialog'] as Dialog;
      dialog.hide();
    },
    update(e: any, type: string) {
      this.newTeam[type] = e.target.value;
    },
    onReset() {
      this.newTeam = { name: '', description: '' } as Team;
      this.$nextTick(() => {
        this.hide();
      });
    },
    onSubmit() {
      this.$emit('create-new-team', JsonClone(this.newTeam));
    },
  },
});
</script>
<style lang="scss">
.new-team-dialog > .q-dialog__inner > .q-card {
  min-width: 300px;
}
</style>
