<template>
  <div>
    <h1>MarkDown编译器</h1>
    <mavon-editor
      ref="markdown"
      style="min-height:900px;"
      placeholder="请输入markdown代码"
      v-model="content"
      @imgAdd="imgAdd"></mavon-editor>
  </div>
</template>
<script>
export default {
  name: 'Markdown',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    async imgAdd (pos, file) {
      const res = await this.$store.dispatch('sendImage', {
        file
      })
        .catch(err => {
          this.$message.error(err)
        })
      // 将上传获得的服务器图片链接替换文本域链接
      this.$refs.markdown.$img2Url(pos, res)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
