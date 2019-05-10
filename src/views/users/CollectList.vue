<template>
  <div id="content">
    <el-radio-group v-model="radio1" @change="ChangeRadio">
      <el-radio-button label="岗位"></el-radio-button>
      <el-radio-button label="企业"></el-radio-button>
    </el-radio-group>
    <div>
      <el-table
        class="table_div"
        :data="tableJob"
        style="width: 100%;height: 410px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-if="jobOrCo"
      >
        <el-table-column
          prop="job_name"
          label="岗位"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="company"
          label="企业"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          sortable>
        </el-table-column>
        <el-table-column
          prop="salary"
          label="薪资"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="work_year"
          label="工作经验"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="education"
          label="学历"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="put_time"
          label="发布时间"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="collect_time"
          label="收藏时间"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        class="table_div"
        :data="tableCo"
        style="width: 100%;height: 410px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-if="!jobOrCo"
      >
        <el-table-column
          prop="co_name"
          label="企业"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="industry"
          label="行业"
          sortable>
        </el-table-column>
        <el-table-column
          prop="size"
          label="规模"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="count_jobs"
          label="新增岗位数"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="collect_time"
          label="关注时间"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
      <!--<el-pagination-->
      <!--background-->
      <!--layout="prev, pager, next"-->
      <!--:total="1000">-->
      <!--</el-pagination>-->
    </div>

  </div>

</template>

<script>
  export default {
    name: "CollectList",
    data(){
      return{
        radio1: 'job',
        radio2: 'co',
        jobOrCo: true,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tablejob: [],
        tableco: []
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      ChangeRadio(){
        this.jobOrCo=!this.jobOrCo
      }
    },
  }
</script>

<style scoped>
  #content{
    height: 553px;
    width: 96%;
    margin-top: 10px;
  }
  .table_div{
    margin-top: 10px;
    margin-left: 20px;
  }

</style>
