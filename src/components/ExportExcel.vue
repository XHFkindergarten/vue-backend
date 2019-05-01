<template>
  <div>
    <h1>Export Excel</h1>
    <el-row class="input-row">
      <el-col :span="6">
        <div class="input-container">
          <span class="input-title">导出文件名称</span>
          <el-input
            v-model="outputFileName"
            type="text"
            placeholder="默认为vue-excel">
          </el-input>  
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="input-container">
          <span class="input-title">导出文件格式</span>
          <el-select v-model="outputType">
            <el-option
              v-for="item in outputTypeOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-button type="primary" @click="downloadMater" icon="el-icon-download">导出</el-button>
      </el-col>
    </el-row>
    <Table
      :tableData="tableData"
      ref="table"></Table>
  </div>
</template>
<script>
import Table from '@/components/Table'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  name: 'ExportExcel',
  data() {
    return {
      // 导出文件名
      outputFileName: 'vue-export-excel',
      // 导出文件类型
      outputType: 'csv',  // 默认值为csv
      // 导出类型option
      outputTypeOptions: [
        {
          value: 'csv',
          label: 'Csv'
        },{
          value: 'xlsx',
          label: 'Xlsx'
        }
      ],
      // 原始的表格数据
      tableData: [
        { time:'2019-1-1', name: 'lzk1', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false},
        { time:'2019-2-1', name: 'lzk2', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-3-1', name: 'lzk3', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-4-1', name: 'lzk4', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-5-1', name: 'lzk5', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-6-1', name: 'lzk6', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-7-1', name: 'lzk7', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
        { time:'2019-8-1', name: 'lzk8', province: 'Jiangxi', city: 'Gaoan', address: '广州市天河区华南理工大学', edit: false },
      ],
    }
  },
  methods: {
    // 保存为XLSX文件
    downloadMater (){
      // 默认单元格样式
      const defaultCellStyle =  { 
        font: { name: "Verdana", sz: 11, color: "FF00FF88"}, 
        fill: {fgColor: {rgb: "FFFFAA00"}}
      };
      // write Options
      const wopts = { bookType: this.outputType=="csv"?"csv":"xlsx", bookSST:false, type:'binary', defaultCellStyle: defaultCellStyle, showGridLines: false};
      const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }; 
      let data = this.tableData
      // 将Json格式的数据写入XLSXSheet中
      wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(this.formatData(this.tableData))
      //创建二进制对象写入转换好的字节流
      let tmpDown =  new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" })
      FileSaver.saveAs(tmpDown, `${this.outputFileName}.${this.outputType}`);
    },
    //字符串转字符流
    s2ab (s) {
      if (typeof ArrayBuffer !== 'undefined') {  
        var buf = new ArrayBuffer(s.length);  
        var view = new Uint8Array(buf);  
        for (var i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF;  
        }
        return buf;  
      } else {  
        var buf = new Array(s.length);  
        for (var i = 0; i != s.length; ++i) {
          buf[i] = s.charCodeAt(i) & 0xFF;  
        }
        return buf;  
      }
    },
    // 洗数据
    formatData(data) {
      let res = []
      const outputCol = ['time', 'name', 'province', 'city', 'address']
      const title = {
        time: '时间',
        name: '姓名',
        province: '省份',
        city: '城市',
        address: '地址'
      }
      data.forEach(row => {
        let obj = {}
        outputCol.forEach(key => {
          obj[title[key]] = row[key]
        })
        res.push(obj)
      })
      return res
    }
  },
  components: {
    Table
  }
}
</script>
<style lang="less" scoped>
.input-row{
  margin: 20px 0;
}
.input-container{
  display: flex;
  justify-content: space-around;
  .input-title{
    line-height: 40px;
    min-width: 120px;
  }
}
</style>
