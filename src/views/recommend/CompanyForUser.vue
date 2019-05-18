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
          label="城市">
        </el-table-column>
        <el-table-column
          prop="size_name"
          label="规模">
        </el-table-column>
        <el-table-column
          prop="quality_name"
          label="性质">
        </el-table-column>
        <el-table-column
          prop="count_jobs"
          label="新增岗位数">
          10
        </el-table-column>
        <el-table-column
          label="关注时间">
          <template slot-scope="scope">
            <div v-if="that.$store.state.userFocusCompanies!==null&&that.$store.state.userFocusCompanies.hasOwnProperty(companies[scope.$index].id)">
              {{that.$store.state.userFocusCompanies[companies[scope.$index].id]}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              prefix-icon="el-icon-search"
              placeholder="搜索岗位"></el-input>
          </template>
          <template slot-scope="scope">
            <el-button
              v-if="that.$store.state.userFocusCompanies!==null&&that.$store.state.userFocusCompanies.hasOwnProperty(companies[scope.$index].id)"
              size="mini"
              @click.native.prevent="delFocusCompanyHandler(scope.$index)">删除</el-button>
            <el-button v-else
              size="mini"
              type="danger"
              @click.native.prevent="addFocusCompanyHandler(scope.$index)">关注</el-button>
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
  import {delFocusCompany, getCompanies, addFocusCompany, getFocusCompanies} from '../../api/api'
  export default {
    name: "CompanyForUser",
    data(){
      return{
        search: '',
        companies: [],
        curPage: 1,
        pageSize: 5,
        total: 10000,
        that: this,
      }
    },
    created() {
      this.getCompany(this.curPage);
    },
    methods:{
      getCompany(e) {
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
      currentChangeHandler(e){
        this.curPage = e;
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
      delFocusCompanyHandler(index) {
        getFocusCompanies({
          user: this.$store.state.userInfo['id'],
          company: this.companies[index].id
        }).then((response)=> {
          let data = response.data;
          if (data.length>0){
            let focuscompanyId = data[0]['id'];
            delFocusCompany(
              focuscompanyId
            ).then((response)=>{
              delete this.$store.state.userFocusCompanies[this.companies[index].id];
              localStorage.setItem('focuscompanies',JSON.stringify(this.$store.state.userFocusCompanies));
              this.$store.dispatch('setFocusCompanies');
              this.$message.success("取消关注成功");
            }).catch(function (error) {
              console.log(error);
            });
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      addFocusCompanyHandler(index) {
        addFocusCompany({
          user: this.$store.state.userInfo['id'],
          company: this.companies[index].id
        }).then((response)=> {
          let data = response.data;
          if (this.$store.state.userFocusCompanies==null){
            this.$store.state.userFocusCompanies={};
          }
          this.$store.state.userFocusCompanies[this.companies[index].id] = data['create_time'];
          localStorage.setItem('focuscompanies',JSON.stringify(this.$store.state.userFocusCompanies));
          this.$store.dispatch('setFocusCompanies');
          this.$message.success("关注成功");
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

