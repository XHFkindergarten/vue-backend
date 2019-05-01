<template>
  <div>
    <div class="container">
      <div class="img-container">
        <img id="img" ref="img" :src="editUrl" alt="">
      </div>
      <div class="preview-container">
        <div class="preview"></div>
      </div>
    </div>
    
    <el-row style="margin-top:40px;">
      <el-col :span="6" :offset="3">
        <el-upload
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
          <!-- <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
          <el-button size="smail" round>选取图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-col>
      <el-col :span="3" :offset="7">
        <el-button type="primary" @click="clickUpload" round>点击上传</el-button>
      </el-col>
    </el-row>
  </div>
  
</template>
<script>
import Cropper from 'cropperjs'
import VueCropper from 'vue-cropperjs'
import keys from '@/common'
export default {
  name: 'EditAvatar',
  components: {
    VueCropper,
  },
  props:[
    'avatarUrl'
  ],
  mounted() {
    // 初始化截图工具
    this.initCropper()
  },
  data() {
    return {
      // 声明cropper对象
      cropper: '',
      // 上传后台路由
      uploadUrl: keys.host+'/users/uploadImg',
      // 上传头像时附带的额外参数
      avatarParams: {
        id: this.$store.state.userInfo.id
      },
      hasPic: false,
      // 修改图片的url
      editUrl: this.avatarUrl,
      // 上传文件列表
      fileList: [],
    }
  },
  computed: {

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
      console.log(cropper)
      cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob)
        const res = this.$store.dispatch('sendImage', {
          file: blob,
          type: 'avatar'
        })
          .then(res => {
            const newAvatarUrl = res
            const params = {
              id: this.$store.state.userInfo.id,
              avatar: newAvatarUrl
            }
            this.$store.dispatch('updateUserInfo', params)
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    type: 'success',
                    message: '更改成功'
                  })
                  this.$emit('editavatarsuccess')
                }
              })
          })
          .catch(err => {
            this.$message.error(err)
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
    // 获取blob格式的图片并转换成File
    // this.$axios.get('upload/avatar/1556612757084.png',{
    //   responseType: 'blob'
    // })
    //   .then(res => {
    //     const file = new File([res.data], 'imgname', {type: res.data.type})
    //     this.fileList.push(file)
    //   })
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
  max-width: 250px;
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
  display: inline-block;
  .preview{
    border-radius: 50%;
    border: 1px #b5b6b9 solid;
    width: 200px;
    height: 200px;
    overflow: hidden;
  }
}
</style>
