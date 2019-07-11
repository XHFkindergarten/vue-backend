<template>
  <div>
    <p class="title">相关推荐</p>
    <RecommendItem v-for="item in recommendList" :key="item.id" :info="item" :index="item.id"></RecommendItem>
    <infiniteLoading ref="infinite" @infinite="infiniteHandler" spinner="default">
      <div class="loading" slot="no-more"></div>
      <!-- <div class="loading" slot="spinner">Ծ‸ Ծ lzk is trying</div> -->
    </infiniteLoading>
  </div>
</template>
<script>
import keys from '@/common'
import infiniteLoading from 'vue-infinite-loading'
import RecommendItem from '@/layouts/RecommendItem'
import { setTimeout } from 'timers';
export default {
  name: 'recommend',
  data() {
    return {
      tags: [],
      index: 0,
      recommendList: []
    }
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(async () => {
        if (this.index === this.tags.length) {
          $state.complete()
          return
        }
        const index = this.index || 0
        const res = await this.getRecommend(this.tags[index])
        this.index++
        $state.loaded()
      }, 1000)
      
    },
    // 使用axios根据标签和文章idGET请求获取推荐列表
    async getRecommend(tag) {
      const res = await this.$axios(`${keys.host}/article/getRecommend?id=${this.id}&tag=${tag}`)
      if (res.data.success) {
        this.recommendList = this.recommendList.concat(res.data.arts)
        this.formatList()
      }
      console.log(res.data.arts)
    },
    // 标签处理
    formatList() {
      const idList = []
      this.recommendList.forEach((art, index) => {
        if (idList.indexOf(art.id) === -1) {
          idList.push(art.id)
        } else {
          this.recommendList.splice(index, 1)
        }
        if (typeof(art.tags)==='string') {
          art.tags = art.tags.split(keys.tagGap).join(' · ')
        }
      })
    },
  },
  watch: {
    tagstring(newValue) {
      this.tags = newValue.split(keys.tagGap)
      console.log('tags', this.tags)
    }
  },
  components: {
    infiniteLoading,
    RecommendItem
  },
  props: {
    tagstring: {
      default: () => {return []}
    },
    id: {
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.title{
  font-size: 26px;
  font-weight: bold;
  text-align: left;
}
</style>
