
<template>
  <!-- 富文本编辑器tinymce -->
  <div>
    <Editor id="tinymce" ref="tinymce" v-model="content" :init="init"></Editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'


export default {
  name: 'RichText',
  data() {
    return {
      accept: 'image/jpg, image/jpeg, image/png',
      maxSize: 5242880,
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: 1200,
        branding: false,//是否禁用“Powered by TinyMCE”
        menubar: false,//顶部菜单栏显示
        plugins: 'link lists image code table wordcount',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | ',
        images_upload_handler: this.images_upload_handler
      }
    }
  },
  props: {
    content: {
      default: ''
    }
  },
  mounted() {
    // tinymce.init({})
  },
  components: {
    Editor
  },
  methods: {
    images_upload_handler: function (blobInfo, success, failure) {
      if (blobInfo.blob().size > this.maxSize) {
        failure('文件体积过大')
      }
      if (this.accept.indexOf(blobInfo.blob().type) >= 0) {
        this.$store.dispatch('sendImage', {
          file: blobInfo.blob()
        })
          .then(res => {
            success(res)
          })
          .catch(err => {
            this.$message.error(err)
          })
      } else {
        failure('图片格式错误')
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
