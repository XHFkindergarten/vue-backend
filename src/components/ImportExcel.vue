<template>
  <div>
    <h1>Import Excel</h1>
    <div v-if="fileList.length==0">
      <el-upload
        drag
        action=""
        :http-request="httpRequest"
        :auto-upload="false"
        :limit="1"
        :on-change="onChange"
        :file-List="fileList"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传Excel格式文件</div>
      </el-upload>
    </div>
    <div v-else>
      <el-row class="select-row">
        <el-col :span="6">
          <div class="input-container">
            <span class="input-title">选择sheet</span>
            <el-select v-model="currentSheet">
              <el-option
                v-for="item in sheetOptions"
                :key="item" 
                :value="item" 
                :label="`sheet(${item})`"></el-option>
            </el-select>
          </div>
          
        </el-col>
      </el-row>
      <excel-table
        :tableData="tableData[currentSheet]"></excel-table>

    </div>
  </div>
</template>
<script>
import Utils from '@/tools/utils'
import XLSX from 'xlsx'
import ExcelTable from '@/components/ExcelTable'
export default {
  name: 'ImportExcel',
  data() {
    return {
      fileList: [],
      tableData: {},
      currentSheet: '',
      sheetOptions: []
    }
  },
  components: {
    ExcelTable
  },
  computed: {
  },
  watch: {
    // tableData: {
    //   handler(newValue, oldValue) {
    //     console.log('newValue', newValue)
    //     console.log(Object.keys(newValue))
    //   },
    //   deep: true
    // }
  },
  methods: {
    // 手动提交函数
    httpRequest(params) {

    },
    // 上传文件改变钩子函数
    async onChange(file, fileList) {
      this.tableData = await this.readExcel(file)
      this.fileList.push(file)
      this.currentSheet = this.sheetOptions[0]
    },
    readExcel(file) {
      const fileReader = new FileReader();
      const excelData = {}
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: 'binary'
          });
          
          for (let sheet in workbook.Sheets) {
            this.sheetOptions.push(sheet)
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            excelData[sheet] = sheetArray 
          }
          this.currentSheet = this.sheetOptions[0]
        } catch (e) {
          this.$message.warning('文件类型不正确！');
          return false;
        }
      };
      fileReader.readAsBinaryString(file.raw);
      return excelData
    }
  }
}
</script>
<style lang="less" scoped>
.select-row{
  margin: 30px 0;
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
