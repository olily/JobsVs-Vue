<template>
  <div id="content">
    <div>
      <el-row :gutter="24">
        <el-col :span="4" :offset="15"><div>
          <el-input v-model="companyname" placeholder="公司名"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-button type="primary" icon="el-icon-search" circle @click="searchHandle"></el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>
      <el-table
        class="table_div"
        :data="companies"
        style="width: 100%;"
      >
        <el-table-column
          prop="company_name"
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
          prop="yesterday_count"
          label="新增岗位数">
        </el-table-column>
        <el-table-column
          label="关注时间">
          <template slot-scope="scope">
            <div v-if="that.$store.state.userFocusCompanies!==null&&that.$store.state.userFocusCompanies.hasOwnProperty(companies[scope.$index].company)">
              {{companies[scope.$index].create_time}}
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              v-if="that.$store.state.userFocusCompanies!==null&&that.$store.state.userFocusCompanies.hasOwnProperty(companies[scope.$index].company)"
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
  import {delFocusCompany, addFocusCompany, getFocusCompanies} from '../../api/api'
  export default {
    name: "FocusCompany",
    data(){
      return{
        search: '',
        companyname: '',
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
        getFocusCompanies({
          user: this.$store.state.userInfo['id'],
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
        getFocusCompanies({
          user: this.$store.state.userInfo['id'],
          company__name: this.companyname,
          page: e,
        }).then((response)=> {
          let data = response.data;
          this.companies = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      searchHandle(){
        getFocusCompanies({
          user: this.$store.state.userInfo['id'],
          company__name: this.companyname,
        }).then((response)=> {
          let data = response.data;
          this.companies = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      delFocusCompanyHandler(index) {
        delFocusCompany(
          this.companies[index].id
        ).then((response)=>{
          delete this.$store.state.userFocusCompanies[this.companies[index].company];
          localStorage.setItem('focuscompanies',JSON.stringify(this.$store.state.userFocusCompanies));
          this.$store.dispatch('setFocusCompanies');
          this.$message.success("取消关注成功");
        }).catch(function (error) {
          console.log(error);
        });
      },
      addFocusCompanyHandler(index) {
        addFocusCompany({
          user: this.$store.state.userInfo['id'],
          company: this.companies[index].company
        }).then((response)=> {
          let data = response.data;
          if (this.$store.state.userFocusCompanies==null){
            this.$store.state.userFocusCompanies={};
          }
          this.$store.state.userFocusCompanies[this.companies[index].company] = data['create_time'];
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

