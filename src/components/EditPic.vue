<template>
  <div>
    <el-row>
      <el-col
        :lg="{span:12}"
        :md="{span:12}"
        :sm="{span:12}"
        :xs="{span:24}"
        >
        <div class="img-container">
          <img id="img" ref="img" :src="editPic">
        </div>
        <el-upload
          style="margin: 30px 0;"
          ref="upload"
          :http-request="httpRequest"
          :action="uploadUrl"
          :data="avatarParams"
          accept="image/*"
          class="upload-demo"
          :file-list="fileList"
          :on-change="handleChange"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-preview="onPreview"
          :limit="2"
          :auto-upload="false">
          <el-button size="smail" round>选取图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-col>
      <el-col
        :lg="{span:12}"
        :md="{span:12}"
        :sm="{span:12}"
        :xs="{span:24}"
        >
        <div class="preview-container">
          <div class="preview"></div>
        </div>
        <div>
          <el-button style="margin: 33px 0;" type="primary" @click="clickUpload" round>点击上传</el-button>
        </div>
        
      </el-col>
    </el-row>
  </div>
  
</template>
<script>
import Cropper from 'cropperjs'
import VueCropper from 'vue-cropperjs'
import keys from '@/common'
import http from '@/http'
export default {
  name: 'EditPic',
  components: {
    VueCropper,
  },
  props: ['picUrl', 'id'],
  mounted() {
    // 初始化截图工具
    this.initCropper()
    // 获取七牛云上传token
    http.getQnToken().then(res => {
      this.qiniuToken = res
    })
  },
  deactivated() {
    console.log('deactivetd')
  },
  data() {
    return {
      // 声明cropper对象
      cropper: '',
      // 上传后台路由
      uploadUrl: 'http://up-z2.qiniup.com',
      // 上传头像时附带的额外参数
      avatarParams: {
        id: this.$store.state.userInfo.id
      },
      hasPic: false,
      // // 修改图片的url
      // editUrl: this.picUrl,
      // 上传文件列表
      fileList: [],
      // 七牛云上传token
      qiniuToken: ''
    }
  },
  watch: {
    picUrl(newValue, oldValue) {
      console.log('change')
      this.initCropper()
    }
  },
  computed: {
    editPic() {
      return this.picUrl
    }
  },
  methods: {
    initCropper() {
      this.cropper = new Cropper(this.$refs.img, {
        aspectRatio: 1, // 裁剪框比例
        viewMode: 2,  // 裁剪模式 2-裁剪框只能在图片范围内移动
        dragMode: 'crop', // 允许创建一个裁剪框
        preview: '.preview',  // 绑定显示区域
        zoomable: true, // 是否允许放大图像
        minContainerHeight: 200,  // 容器的最小高度
        minContainerWidth: 200, // 容器的最小宽度
        // crop 裁剪框改变钩子函数
        crop: function(e) {
          
        },
        // ready 插件准备钩子函数（只执行一次）
        ready: function() {

        },
        // zoom 裁剪框缩放钩子函数
        zoom: function() {

        }
      })
    },
    // 发起上传函数
    httpRequest(params) {
      const { cropper } = this
      cropper.getCroppedCanvas().toBlob((blob) => {
        const form = new FormData()
        form.append('file', blob)
        form.append('key', new Date().getTime() + ''),
        form.append('token', this.qiniuToken)
        this.$axios.post(this.uploadUrl, form).then(res => {
          const labelImg = `${keys.imgHost}/${res.data.key}`
          this.$store.dispatch('updateArticleAction', {
            id: this.id,
            labelImg
          }).then(res => {
            if (res.data.success) {
              this.$emit('uploadLabelImg')
            }
          }).catch(err => {
            this.$message.error(err)
          })
        })
      })
    },
    clickUpload() {
      this.$refs.upload.submit()
    },
    // 文件变化钩子函数
    handleChange(file, fileList) {
      console.log(fileList)
      let that = this
      if (fileList.length>1) {
        fileList.shift()
        this.fileList.shift()
      }
      this.fileList.push(fileList[0])
      // 文件对象无法直接使用，需要生成本地URL
      this.editUrl = URL.createObjectURL(file.raw)
      if (this.cropper) {
        this.cropper.replace(this.editUrl)
      } else {
        this.hasPic = true
        this.initCropper()
      }
    },
    // 上传成功钩子函数
    uploadSuccess(res) {
      
    },
    // 上传失败钩子函数
    uploadError(error) {
      this.$message.error('上传失败,请检查网络连接')
    },
    onPreview(file) {
      console.log(file)
    }
  },
  created() {

  }
}
</script>
<style lang="less" scoped>
.container{
  display: flex;
  justify-content:space-around;
  align-items: center;
}
.img-container{
  height: 250px;
  display: inline-block;
  #img{
    max-width: 100%;
  }
}
#line{
  width: 1px;
  height: 100%;
  background: #000;
}
.preview-container{
  height: 250px;
  display: inline-block;
  .preview{
    border: 1px #b5b6b9 solid;
    width: 200px;
    height: 200px;
    overflow: hidden;
  }
}
</style>
