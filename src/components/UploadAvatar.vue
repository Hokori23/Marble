<template>
  <label :for="id">
    <q-avatar class="cursor-pointer upload-avatar">
      <q-spinner
        v-show="loading"
        class="upload-avatar--loading"
        color="primary"
        size="100%"
      />
      <img :src="src" />
      <input
        :id="id"
        type="file"
        style="display: none;"
        accept="image/png, image/jpeg, image/jpg"
        @change.stop="upload"
      /> </q-avatar
  ></label>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import request from 'src/request';

interface FileTarget extends EventTarget {
  files: FileList;
}
export default defineComponent({
  name: 'UploadAvatar',
  props: {
    src: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    id(): string {
      return `upload-avatar-${this.index}`;
    },
  },
  methods: {
    async upload(e: Event): Promise<void> {
      const file = (e.target as FileTarget).files[0];
      if (!file) return;
      const { size } = file;
      if (size > 1024 * 1024) {
        this.$q.dialog({
          title: '提示',
          message: '请选择小于1MB的图片',
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      this.$emit('beforeUpload');
      const res = await request.upload.upload(formData);
      if (!res || res.code !== 0 || !res.data) {
        this.$q.notify({
          type: 'warning',
          message: '上传头像失败',
        });
        return;
      }

      // 修改src、触发上传事件
      this.$emit('onUpload', res.data);
    },
  },
});
</script>
<style lang="scss" scoped>
.upload-avatar {
  position: relative;
  &--loading {
    position: absolute;
  }
}
</style>
