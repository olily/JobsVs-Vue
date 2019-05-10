<template>
  <div id="content">
    <div>
      <el-table
        class="table_div"
        :data="tableJob"
        style="width: 100%;height: 410px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
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
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              prefix-icon="el-icon-search"
              placeholder="搜索岗位"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >删除</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">收藏</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="操作"-->
        <!--&gt;-->
        <!--<template slot-scope="scope">-->
        <!--<el-button-->
        <!--@click.native.prevent="deleteRow(scope.$index, tableData)"-->
        <!--type="text"-->
        <!--size="small">-->
        <!--删除-->
        <!--</el-button>-->
        <!--<el-button-->
        <!--@click.native.prevent="deleteRow(scope.$index, tableData)"-->
        <!--type="text"-->
        <!--size="small">-->
        <!--收藏-->
        <!--</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "NoticeCompanyJobs"
  }
</script>

<style scoped>
  #content{
    margin-top: 10px;
    margin-left: 10px;
  }

</style>

