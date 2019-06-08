<template>
  <div
    element-loading-text="音频生成中"
    v-loading="loading">
    <h1>Word/Pdf Reader</h1>
    <el-row style="margin-top:80px;">
      <el-col
        :lg="{span:12,offset:6}"
        :md="{span:24}"
        :sm="{span:24}"
        :xs="{span:24}"
        style="display:flex;justify-content:center;flex-direction:column;align-items:center;"
        >
        <el-upload
          ref="uploadFile"
          :http-request="uploadFile"
          action=""
          :data="readingParams"
          :auto-upload="false"
          :file-list="fileList"
          :limit="1"
          :on-change="onChange"
          :on-remove="onRemove"
          drag
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传doxc/pdf文件</div>
        </el-upload>
        <div style="margin-top:50px">
          <span>音色</span>
          <el-select v-model="per" placeholder="请选择声音类型">
            <el-option v-for="option in perOption" :key="option.value" :label="option.label" :value="option.value"></el-option>
          </el-select>
        </div>
        <div style="margin-top:50px;width:360px;">
          <span>音量</span>
          <el-slider v-model="vol" :min="1" :max="15"></el-slider>
        </div>
        <div style="margin-top:50px;width:360px;">
          <span>语速</span>
          <el-slider v-model="spd" :min="1" :max="10"></el-slider>
        </div>
        
        <el-button @click="comfirm" class="comfirm-btn">确认生成</el-button>
        <div v-for="audioSrc in audioList" :key="audioSrc" class="audio-container">
          <audio
            class="audio"
            ref="audio"
            @ontimeupdate="timeUpdate"
            :src="audioSrc" controls>
            宁的浏览器暂不支持该功能
          </audio>
        </div>
        
        <!-- <el-button @click="reload" class="comfirm-btn">播放</el-button> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import keys from '@/common'
export default {
  data () {
    return {
      // 上传参数
      readingParams: {
      
      },
      // 文件列表
      fileList: [],
      // 音频列表
      audioList: [],
      // // 音频src
      // audioSrc: '',
      // 播放index
      index: 0,
      // 生成音频ing,
      loading: false,
      // 选择的声音类型
      per: 0,
      // 选择的声音大小
      vol: 10,
      // 声音速度
      spd: 5,
      perOption: [
        {
          label: '女声',
          value: 0
        },
        {
          label: '男声',
          value: 1
        },
        {
          label: '情感合成男声',
          value: 3
        },
        {
          label: '情感合成女声',
          value: 4
        },
      ]
    }
  },
  methods: {
    // onEnd() {
    //   if (this.index === this.audioList.length-1) {
    //     this.index = 0
    //     this.audioSrc = this.audioList[this.index]
    //   } else {
    //     this.index++
    //     this.audioSrc = this.audioList[this.index]
    //   }
    // },
    timeUpdate (res) {
      console.log(res.target)
    },
    // reload () {
    //   const audio = this.$refs.audio
    //   audio.play()
    // },
    comfirm() {
      this.$refs.uploadFile.submit()
      this.fileList.shift()
    },
    async uploadFile(params) {
      this.loading = true
      const file = params.file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('vol', this.vol)
      formData.append('spd', this.spd)
      formData.append('per', this.per)
      const res = await this.$axios.post(`${keys.host}/extra/getWord`, formData)
      if (res.data.audio.length>0) {
        this.index = 0
        this.audioList = res.data.audio
        console.log(this.audioList)
        // this.audioSrc = this.audioList[this.index]
      }
      this.loading = false
    },
    // 上传列表改变
    onChange(file, fileList) {
      console.log(file.raw.type)
      console.log(fileList)
      if (file.raw.type!=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'&&file.raw.type!=='application/pdf') {
        this.$message.warning('请输入docx和pdf格式的文件')
        this.fileList.shift()
        return
      }
      if (this.fileList.length == 0) {
        this.fileList.push(file)
      } else {
        this.fileList.shift()
        this.fileList.push(file)
      }
      
    },
    // 删除文章钩子
    onRemove(file, fileList) {
      this.fileList.shift()
    }
  },
  mounted() {
    // this.makeAudio()
  }
}
</script>
<style lang="less" scoped>
.comfirm-btn{
  margin: 40px 0;
}
.audio-container{
  margin-top: 50px;
}
</style>
