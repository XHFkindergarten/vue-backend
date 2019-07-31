<template>
  <div class="pagination">
    <div
      @click="pageChange(index)"
      v-for="(item, index) in pageList"
      :key="index"
      :class="item==currentPage?'current-circle':'circle'">{{item}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [1,2,3,4,5,6,7,8,9]
    }
  },
  methods: {
    // 点击页码
    pageChange(index) {
      if (this.pageList[index]==='...') {
        if (index === 0) {
          this.$emit('current-change', this.pageList[1]-1)
        } else {
          this.$emit('current-change', this.pageList[this.pageList.length-2]+1)
        }
        return
      }
      this.$emit('current-change', this.pageList[index])
    }
  },
  props: {
    total: {
      default: 0
    },
    pageSize: {
      default: 5
    },
    currentPage: {
      default: 1
    },
  },
  computed: {
    pageNum() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出要显示的页码列表(包括...)
    pageList() {
      const list = []
      // 处理currentPage之前的页码
      if (this.currentPage - 4 > 1) {
        list.push('...')
        for(let i=0;i<4;i++) {
          list.push(this.currentPage-4+i)
        }
      } else if (this.currentPage - 4 == 1) {
        for(let i=0;i<4;i++) {
          list.push(this.currentPage-4+i)
        }
      } else {
        for(let i=1;i<this.currentPage;i++) {
          list.push(i)
        }
      }
      // push currentPage
      list.push(this.currentPage)
      // 处理currentPage之后的页码
      if(this.currentPage + 4 < this.pageNum) {
        for(let i=1;i<5;i++) {
          list.push(this.currentPage+i)
        }
        list.push('...')
      } else if (this.currentPage + 4 == this.pageNum) {
        for(let i=1;i<5;i++) {
          list.push(this.currentPage+i)
        }
      } else {
        for(let i=1;i<=this.pageNum - this.currentPage;i++) {
          list.push(this.currentPage + i)
        }
      }
      return list
    }
  }
}
</script>
<style lang="less" scoped>
@radius: 28px;
@small-radius: 20px;
@media screen and (min-width: 992px) {
  .circle {
    width: @radius;
    height: @radius;
    border-radius: @radius / 2;
    line-height: @radius;
    margin: 0 15px;
  }
  .current-circle {
    width: @radius;
    height: @radius;
    border-radius: @radius / 2;
    line-height: @radius;
    margin: 0 15px;
  }
}
@media screen and (max-width: 992px) {
  .circle {
    width: @small-radius;
    height: @small-radius;
    border-radius: @small-radius / 2;
    line-height: @small-radius;
    margin: 0 8px;
  }
  .current-circle {
    width: @small-radius;
    height: @small-radius;
    border-radius: @small-radius / 2;
    line-height: @small-radius;
    margin: 0 8px;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .circle {
    cursor: pointer;
    
    
    background: rgba(0, 0, 0, 0.6);
    
    color: #FFF;
    
    font-size: 10px;
    font-family: Circular_black;
  }
  .current-circle {
    cursor: pointer;
    
    background: rgba(0, 0, 0, 0.6);
    color: #FFF;
    font-size: 10px;
    font-family: Circular_black;
    transform: scale(1.3,1.3)
  }
  .circle:hover {
    transform: scale(1.3,1.3)
  }
}
</style>
