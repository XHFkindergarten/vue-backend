<template>
  <div class="rec-container">
    <div class="line" :style="`margin: 0 -${paddingSize}`"></div>
    <div class="info">
      <span @click="toAuthor">{{info.userInfo.name}}</span> · {{info.tags}} 
    </div>
    <div class="title" @click="toArticle">
      {{info.title}}
    </div>
    <div class="comment">
      <SvgIcon class="info-icon" size="mini" icon="like3"></SvgIcon>
      <span>{{info.like_num}}</span>
      <SvgIcon class="info-icon" size="mini" icon="Comment"></SvgIcon>
      <span>{{info.comment_num}}</span>
      <SvgIcon class="info-icon" size="mini" icon="eyes"></SvgIcon>
      <span>{{info.view_time}}</span>
    </div>
  </div>
</template>
<script>
import SvgIcon from '@/layouts/SvgIcon'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    toArticle() {
      this.$router.push({path: 'article', query: {id: this.info.id}})
    },
    toAuthor() {
      this.$router.push({ path: 'Person', query: {id: this.info.userInfo.id}})
    }
  },
  components: {
    SvgIcon
  },
  props: {
    info: {
      default: ""
    }
  },
  computed: {
    isBigScreen() {
      return this.$store.state.isBigScreen || false
    },
    paddingSize() {
      return this.isBigScreen?'50px':'20px'
    }
    // tags() {
    //   if (this.info) {
    //     return this.info.tags.split()
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
.line{
  border-top: 1px solid rgba(178,186,194,.15);
}
.rec-container{
  padding: 1rem 0;
}
.info{
  font-size: 0.5rem;
  text-align: left;
  margin-top: 20px;
  span{
    color: #007FFF;
    cursor: pointer;
  }
}
.title{
  text-align: left;
  font-size: 1.4rem;
  font-weight: bold;
  margin: .6rem 0;
  cursor: pointer;
}
.comment{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  color: #717a84;
  span{
    margin: 0 .5rem;
  }
}
</style>
