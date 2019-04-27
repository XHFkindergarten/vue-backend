
<template>
  <!-- 富文本编辑器tinymce -->
  <div>
    <h1>Tinymce</h1>
    <editor id="tinymce" ref="tinymce" v-model="tinymceHtml" :init="editorInit"></editor>
    <div v-html="tinymceHtml"></div>
  </div>
</template>
<script>
// import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'RichText',
  data() {
    return {
      tinymceHtml: '请输入内容',
      editorInit: {
        language_url: '@/../static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '@/../static/tinymce/skins/lightgray',
        height: 300
      }
    }
  },
  mounted() {
    // tinymce.init({})
  },
  components: {
    Editor
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>

</style>
