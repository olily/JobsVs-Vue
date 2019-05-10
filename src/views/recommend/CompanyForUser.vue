<template>
  <div id="content">
    <div>
      <el-table
        class="table_div"
        :data="tableCo"
        style="width: 100%;height: 410px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
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
    name: "CompanyForUser"
  }
</script>

<style scoped>
  #content{
    margin-top: 10px;
    margin-left: 10px;
  }

</style>

