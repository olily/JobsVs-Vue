<template>
  <div id="content">
    <div>
      <el-table
        class="table_div"
        :data="companies"
        style="width: 100%;"
      >
        <el-table-column
          prop="name"
          label="企业"
        >
        </el-table-column>
        <el-table-column
          prop="city_name"
          label="城市"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="size_name"
          label="规模"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="quality_name"
          label="性质"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="count_jobs"
          label="新增岗位数"
          :formatter="formatter">
          10
        </el-table-column>
        <el-table-column
          prop="collect_time"
          label="关注时间"
          :formatter="formatter">
          2019-05-05 09:00:00
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
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.$index, scope.row)">收藏</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination background layout="prev, pager, next"
                       @current-change="currentChangeHandler"
                       @prev-click="currentChangeHandler"
                       @next-click="currentChangeHandler"
                       :total="total"
                       :page-size="pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCompanies} from '../../api/api'
  export default {
    name: "CompanyForUser",
    data(){
      return{
        companies: [],
        pageSize: 5,
        total: 1000,
      }
    },
    created() {
      this.getCompany();
    },
    methods:{
      getCompany() {
        getCompanies({
        }).then((response)=> {
          let data = response.data;
          this.companies = data.results;
          this.total = data.count;
          console.log(this.companies);
        }).catch(function (error) {
          console.log(error);
        });
      },
      currentChangeHandler(e){
        getCompanies({
          page: e,
        }).then((response)=> {
          let data = response.data;
          this.companies = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>

<style scoped>
  #content{
    margin-top: 10px;
    margin-left: 10px;
  }

</style>

