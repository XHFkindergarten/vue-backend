<template>
  <div class="wrapper">
    <div class="info">
      <img @click="toAuthor" :src="dailyInfo.userInfo.avatar" alt="用户头像">
      <div @click="toAuthor" class="userInfo">
        <span class="span1">{{dailyInfo.userInfo.name}}</span>
        <span class="span2">{{time}}</span>
      </div>
      <el-popover
      v-model="openDelete"
      placement="bottom"
      width="20"
      trigger="click">
      <el-popover
        placement="bottom"
        width="160"
        trigger="click"
        v-model="comfirmDelete"
        >
        <p>删除动态无法恢复</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="comfirmDelete=false">取消</el-button>
          <el-button type="primary" size="mini" @click="deleteDaily">确定</el-button>
        </div>
        <div slot="reference" class="delete-container">
          <el-button type="text">删除</el-button>
        </div>
      </el-popover>
      
      <div v-if="isMyDaily" slot="reference" class="down">
        <SvgIcon icon="down" size="mini"></SvgIcon>
      </div>
    </el-popover>
      
    </div>
    <div class="content" v-html="content"></div>
    <el-row>
      <el-col
        class="col"
        v-for="(src, i) in pics"
        :key="i"
        :span="8">
        <showPic :picSrc="src"></showPic>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
import keys from '@/common'
import showPic from '@/components/showPic'
export default {
  data() {
    return {
      // 打开删除弹框
      openDelete: false,
      // 确认删除弹框
      comfirmDelete: false
    }
  },
  methods: {
    // 跳转作者页面
    toAuthor() {
      this.$router.push({ path: 'Person', query: {id: this.dailyInfo.userId}})
    },
    // 删除动态
    async deleteDaily() {
      const res = await this.$axios.get(`${keys.host}/daily/deleteOne?id=${this.dailyInfo.id}`)
      if (res.data.success) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$emit('deleteOne')
        this.comfirmDelete = false
        this.openDelete = false
      }
    },
    // 调整自适应正方形的高度=宽度
    adjustSquare() {
      $('.col').height($('.col').width())
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.adjustSquare()
    })
  },
  components: {
    showPic,
    SvgIcon
  },
  props: [
    'dailyInfo'
  ],
  computed: {
    isMyDaily() {
      return this.dailyInfo.userId === this.$store.state.userInfo.id
    },
    time() {
      if (this.dailyInfo) {
        const date = new Date(this.dailyInfo.createdAt)
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}`
      } else {
        return ''
      }
    },
    content() {
      const reg = new RegExp("\n", "g")
      return this.dailyInfo.content.replace(reg, "<br/>")
    },
    pics() {
      if (this.dailyInfo && this.dailyInfo.pics) {
        return this.dailyInfo.pics.split(keys.tagGap)
      } else {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.delete-container{
  width: 100%;
  display: flex;
  justify-content: center;
}
.wrapper{
  padding-bottom: 10px;
}
.content{
  text-align: left;
  margin: 15px 0;
}
.info{
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .down{
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 10px;
    outline: none;
  }
  img{
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-radius: 20px;
  }
  .userInfo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    margin-left: 5px;
    span{
      text-align: left;
    }
    .span1{
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    .span2{
      font-size: 12px;
      color: #969696;
    }
  }
}
</style>
