<template>
  <div>
    <mavon-editor
      :ishljs="true"
      v-model="markdownContent"
      ref="markdown"
      style="min-height:100vh;"
      placeholder="请输入markdown代码"
      :shortCut="true"
      :tabSize="2"
      :defaultOpen="all.innerWidth<800?'edit':'preview'"
      :toolbars="toolbars"
      @imgAdd="imgAdd"></mavon-editor>
  </div>
</template>
<script>
import http from '@/http'
import keys from '../common'
export default {
  name: 'Markdown',
  data() {
    return {
      markdownContent: this.content,
      // 七牛云token
      qiniuToken: '',
      // 上传后台路由
      uploadUrl: 'http://up-z2.qiniup.com',
      // 是否是大屏幕
      isBigScreen: true,
      // 工具栏配置
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        preview: true, // 预览
      },
    }
  },
  computed: {
    all() {
      return window
    }
  },
  watch: {
    content(newValue, oldValue) {
      this.markdownContent = newValue
    }
  },
  props: [
    'content'
  ],
  methods: {
    async imgAdd (pos, file) {
      const form = new FormData()
      form.append('file', file)
      form.append('key', new Date().getTime() + ''),
      form.append('token', this.qiniuToken)
      this.$axios.post(this.uploadUrl, form).then(res => {
        const labelImg = `${keys.imgHost}/${res.data.key}`
        // 将上传获得的服务器图片链接替换文本域链接
        this.$refs.markdown.$img2Url(pos, labelImg)
      })
      // const res = await this.$store.dispatch('sendImage', {
      //   file
      // })
      //   .catch(err => {
      //     this.$message.error(err)
      //   })
      
    },
    // 判断屏幕尺寸
    judgeScreen() {
      if (window.innerWidth<800) {
        this.isBigScreen = false
      } else {
        this.isBigScreen = true
      }
    },
  },
  mounted() {
    this.judgeScreen()
    if (!this.isBigScreen) {
      console.log('toggle')
      this.$refs.markdown.subfield = false
    }
    
    http.getQnToken().then(res => {
      this.qiniuToken = res
    })
  }
}
</script>

<style lang="less" scoped>
</style>
