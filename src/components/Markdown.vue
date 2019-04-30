<template>
  <div>
    <markdownEditor v-model="content" ref="markdownEditor"></markdownEditor>
  </div>
</template>
<script>
import {markdownEditor} from 'vue-simplemde/src/markdown-editor'
export default {
  name: 'Markdown',
  components: {
    markdownEditor
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>
<style lang="less" scoped>
@import 'simplemde/dist/simplemde.min.css';
</style>
