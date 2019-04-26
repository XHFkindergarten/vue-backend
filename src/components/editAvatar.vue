<template>
  <div>
    <div class="container">
      <div class="img-container">
        <img id="img" :src="avatarUrl" alt="">
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
          :limit="1"
          :auto-upload="false">
          <!-- <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
          <el-button size="smail" round>选取图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-col>
      <el-col :span="3" :offset="7">
        <el-button type="primary" round>点击上传</el-button>
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
      uploadUrl: keys.host+'/users/avatar',
      // 上传文件列表
      fileList: [],
      // 上传头像时附带的额外参数
      avatarParams: {
        id: this.$store.state.userInfo.id
      },
      hasPic: false
    }
  },
  computed: {
    
  },
  methods: {
    initCropper() {
      console.log('init')
      let image = document.getElementById('img')
      console.log(image)
      if(image==null) {
        return
      }
      this.cropper = new Cropper(image, {
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
    // 上传函数
    httpRequest(params) {
      console.log(params)
      console.log(this.cropper.getCroppedCanvas())  //输出null
    

      // let croppedCanvas;
      // let roundedCanvas;
      // Crop
      // croppedCanvas = this.cropper.getCroppedCanvas();
      // console.log(croppedCanvas)
      // Round
      // roundedCanvas = this.getRoundedCanvas(croppedCanvas)
      // console.log(roundedCanvas.toDataURL())
    },
    //canvas画图导出图像
    getRoundedCanvas(sourceCanvas) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const width = sourceCanvas.width;
      const height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();
 
      return canvas;
    },
    // 文件变化钩子函数
    handleChange(file, fileList) {
      let that = this
      if (fileList.length>1) {
        fileList.shift()
      }
      this.fileList.push(fileList[0])
      // 文件对象无法直接使用，需要生成本地URL
      this.avatarUrl = URL.createObjectURL(file.raw)
      if (this.cropper) {
        this.cropper.replace(this.avatarUrl)
      } else {
        this.hasPic = true
        this.initCropper()
      }
      
      // const {cropper} = this
      // console.log(cropper)
      // const round = cropper.getCroppedCanvas()
      // console.log(round)
      // this.$refs.upload.submit()
    },
    // 上传成功钩子函数
    uploadSuccess(res) {
      // console.log(res)
      // if (res.success) {
      //   this.avatarUrl = res.imgpath
      // }
      
    },
    // 上传失败钩子函数
    uploadError(error) {
      this.$message.error('上传失败,请检查网络连接')
    }
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
