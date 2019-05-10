<template>
  <div>
    <h1>Echarts入门实例</h1>
    <el-row>
      <el-col
        :lg={span:10,offset:1}
        :md={span:18,offset:3}
        :sm={span:18,offset:3}
        :xs={span:24,offset:0}
        >
        <div id="echarts" class="chart-container" ref="echarts1"></div>
      </el-col>
      <el-col
        :lg={span:10,offset:1}
        :md={span:18,offset:3}
        :sm={span:18,offset:3}
        :xs={span:24,offset:0}
        >
        <div id="echarts" class="chart-container" ref="echarts2" style="min-height:400px;"></div>
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import "echarts/lib/chart/pie"

export default {
  name: 'EchartsDemo',
  data() {
    return {
      myCharts1: '',
      myCharts2: ''
    }
  },
  mounted() {
    this.myCharts1 = echarts.init(this.$refs.echarts2)
    this.myCharts2 = echarts.init(this.$refs.echarts1)
    // 绘制图表
    this.myCharts1.setOption({
        // 背景颜色
        backgroundColor: '#2c343c',
        // 解释文字
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        tooltip: {},
        xAxis: {
          show: true,
          name: 'x轴',
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          axisLine:{
            lineStyle:{
              color:'#fff',
              width:1,
            }
          } 
        },
        yAxis: {
          axisLine:{
            lineStyle:{
              color:'#fff',
              width:1,
            }
          } 
        },
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
    });
    this.myCharts2.setOption({
      // 解释文字
      textStyle: {
        color: 'rgba(255, 255, 255, 0.3)'
      },
      // 背景颜色
      backgroundColor: '#2c343c',
      // 根据value决定扇形半径大小
      roseType: 'angle',
      // 视觉引导线
      labelLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      // 统一设置扇形style,单独的item也有这一属性
      itemStyle: {
        // 阴影的大小
        shadowBlur: 200,
        // 阴影水平方向上的偏移
        shadowOffsetX: 0,
        // 阴影垂直方向上的偏移
        shadowOffsetY: 0,
        // 阴影颜色
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      // 将value映射到扇形的阴影度
      visualMap: {
          // 不显示 visualMap 组件，只用于明暗度的映射
          show: false,
          // 映射的最小值为 80
          min: 80,
          // 映射的最大值为 600
          max: 600,
          inRange: {
              // 明暗度的范围是 0 到 1
              colorLightness: [0, 1]
          }
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          data:[
            {value:235, name:'视频广告'},
            {value:274, name:'联盟广告'},
            {value:310, name:'邮件营销'},
            {value:335, name:'直接访问'},
            {value:400, name:'搜索引擎'}
          ]
        }
      ]
    })
  }
}
</script>
<style lang="less" scoped>
.chart-container{
  min-height: 400px;
  display: flex;
  justify-content: center;
}
</style>
