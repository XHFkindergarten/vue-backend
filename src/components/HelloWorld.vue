<template>
  <div class="hello">
    <el-row>
      <el-col
        :lg={span:12,offset:6}
        :md={span:12,offset:6}
        :sm={span:12,offset:6}
        :xs={span:24}
        >
        <el-row>
          <el-col
            v-for="(src, i) in picSrc" :key="i"
            class="col"
            :lg={span:8}
            :md={span:8}
            :sm={span:8}
            :xs={span:8}
            >
            <showPic :picSrc="src"></showPic>
          </el-col>
          <el-col
            class="col"
            :lg={span:8}
            :md={span:8}
            :sm={span:8}
            :xs={span:8}
            >
            <div class="add-pic">
              <div class="inside ">
                <SvgIcon icon="addgray"></SvgIcon>
              </div>
            </div>
          </el-col>
        </el-row>
        </el-col>
    </el-row>
    
    
  </div>
</template>

<script>
import SvgIcon from '@/layouts/SvgIcon'
import showPic from '@/components/showPic'
import keys from '@/common'
export default {
  name: 'HelloWorld',
  components: {
    showPic,
    SvgIcon
  },
  data () {
    return {
      msg: 'Hello',
      picSrc: [
        'https://img.xhfkindergarten.cn/1558602050535',
        'https://img.xhfkindergarten.cn/1558599513634',
        'https://img.xhfkindergarten.cn/1558603134386',
        'https://img.xhfkindergarten.cn/1558619318950',
        // 'https://img.xhfkindergarten.cn/1558703714908',
        // 'https://img.xhfkindergarten.cn/1558755571894',
        'https://img.xhfkindergarten.cn/1558840056951',
        'https://img.xhfkindergarten.cn/1558921723390',
        'https://img.xhfkindergarten.cn/1558922507538'
      ]
    }
  },
  mounted() {
    $('.col').height($('.col').width())
  }
}
</script>
<style lang="less" scoped>
.add-pic{
  height: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
  .inside{
    width: 90%;
    height: 90%;
    border: 2px solid #bfbfbf;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
h1, h2, h3 {
  font-weight: normal;
  display: block;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
