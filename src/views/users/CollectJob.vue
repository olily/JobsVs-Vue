<template>
  <div id="content">
    <div>
      <el-row :gutter="24">
        <el-col :span="4" :offset="8"><div>
          <el-input v-model="companyname" placeholder="公司名"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-input v-model="jobname" placeholder="岗位名"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-button type="primary" icon="el-icon-search" circle @click="searchHandle"></el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>
      <el-table
        class="table_div"
        :data="jobs"
        style="width: 100%;height: 410px;"
      >
        <el-table-column
          prop="job_name"
          label="岗位"
        >
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="企业">
        </el-table-column>
        <el-table-column
          prop="city_name"
          label="城市">
        </el-table-column>
        <el-table-column
          label="薪资">
          <template slot-scope="scope">
            {{jobs[scope.$index].salary_low}}-{{jobs[scope.$index].salary_high}}
          </template>
        </el-table-column>
        <el-table-column
          prop="work_year"
          label="工作经验">
        </el-table-column>
        <el-table-column
          prop="edu_name"
          label="学历">
        </el-table-column>
        <el-table-column
          prop="put_time"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="收藏时间">
          <template slot-scope="scope">
            <div v-if="that.$store.state.userCollectJobs!==null&&that.$store.state.userCollectJobs.hasOwnProperty(jobs[scope.$index].job)">
              {{jobs[scope.$index].create_time}}
            </div>
          </template>
        </el-table-column>
        <el-table-column>
        <template slot-scope="scope">
          <el-button
            v-if="that.$store.state.userCollectJobs!==null&&that.$store.state.userCollectJobs.hasOwnProperty(jobs[scope.$index].job)"
            size="mini"
            @click.native.prevent="delCollectJobHandler(scope.$index)">删除</el-button>
          <el-button v-else
                     size="mini"
                     type="danger"
                     @click.native.prevent="addCollectJobHandler(scope.$index)">收藏</el-button>
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
  import {delCollectJob,addCollectJob, getCollectJobs} from '../../api/api'
  export default {
    name: "CollectJob",
    data(){
      return{
        companyname: '',
        jobname: '',
        search: '',
        jobs: [],
        curPage: 1,
        pageSize: 5,
        total: 1000,
        that: this,
      }
    },
    created() {
      this.getYesterdayJob(this.curPage);
    },
    methods:{
      getYesterdayJob(e) {
        getCollectJobs({
          page: e
        }).then((response)=> {
          let data = response.data;
          this.jobs = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      currentChangeHandler(e){
        this.curPage = e;
        getCollectJobs({
          job__name: this.jobname,
          job__company__name: this.companyname,
          page: e,
        }).then((response)=> {
          let data = response.data;
          this.jobs = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      searchHandle(){
        getCollectJobs({
          job__name: this.jobname,
          job__company__name: this.companyname,
        }).then((response)=> {
          let data = response.data;
          this.jobs = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      delCollectJobHandler(index) {
        delCollectJob (
          this.jobs[index].id
        ).then((response)=>{
          delete this.$store.state.userCollectJobs[this.jobs[index].job];
          localStorage.setItem('collectjobs',JSON.stringify(this.$store.state.userCollectJobs));
          this.$store.dispatch('setCollectJobs');
          this.$message.success("取消收藏成功");
        }).catch(function (error) {
          console.log(error);
        });
      },
      addCollectJobHandler(index) {
        addCollectJob({
          user: this.$store.state.userInfo['id'],
          job: this.jobs[index].job
        }).then((response)=> {
          let data = response.data;
          if (this.$store.state.userCollectJobs==null){
            this.$store.state.userCollectJobs={};
          }
          this.$store.state.userCollectJobs[this.jobs[index].job] = data['create_time'];
          localStorage.setItem('collectjobs',JSON.stringify(this.$store.state.userCollectJobs));
          this.$store.dispatch('setCollectJobs');
          this.$message.success("收藏成功");
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
