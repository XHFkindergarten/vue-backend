<template>
  <div>
    <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="time"
        label="日期">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.time}}</span>
          <el-date-picker
            v-else
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="scope.row.time"
            type="date"
            placeholder="选择日期"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.name}}</span>
          <el-input v-else type="text" v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.province}}</span>
          <el-input v-else type="text" v-model="scope.row.province"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.city}}</span>
          <el-input v-else type="text" v-model="scope.row.city"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.address}}</span>
          <el-input v-else type="text" v-model="scope.row.address"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.edit" type="primary" @click="editRow(scope)" size="smail" icon="el-icon-edit" round></el-button>
          <el-button v-else type="success" @click="saveRow(scope)" size="smail" icon="el-icon-success" round></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from 'sortablejs'

export default {
  data() {
    return {
      // 日期选择器option
      pickerOptions: {
        shortcuts:[
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },{
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 1000*3600*24)
              picker.$emit('pick', date)
            }
          },{
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 1000*3600*24*7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  props: [
    'tableData'
  ],
  mounted() {
    // 表格拖动组件sortablejs
    // 实例必须在挂载之后生成才有效
    let el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
    const sortable = new Sortable(el, {
      animation: 150,
      onEnd: evt => { // 监听end事件，手动维护列表.(因为目前排序是基于dom的，所以不会改变vue的数据
        const handleRow = this.tableData.splice(evt.oldIndex, 1)[0]
        this.tableData.splice(evt.newIndex, 0, handleIndex)
      }
    })
  },
  methods: {
    // 编辑表格行
    editRow(scope) {
      if (scope.row) {
        scope.row.edit = true
      }
    },
    // 保存表格行
    saveRow(scope) {
      if (scope.row) {
        scope.row.edit = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
