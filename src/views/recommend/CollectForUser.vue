<template>
  <div id="content">
    <div>
      <el-table
        class="table_div"
        :data="jobs"
        style="width: 100%;height: 410px;"
      >
        <el-table-column
          prop="name"
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
              v-if="that.$store.state.userCollectJobs!==null&&that.$store.state.userCollectJobs.hasOwnProperty(jobs[scope.$index].id)"
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
  import {delCollectJob, getJobs, addCollectJob, getCollectJobs} from '../../api/api'
  export default {
    name: "CollectForUser",
    data(){
      return{
        search: '',
        jobs: [],
        curPage: 1,
        pageSize: 5,
        total: 1000,
        that: this,
      }
    },
    created() {
      this.getJob(this.curPage);
    },
    methods:{
      getJob(e) {
        getJobs({
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
        getJobs({
          page: e,
        }).then((response)=> {
          let data = response.data;
          this.jobs = data.results;
          this.total = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      delCollectJobHandler(index) {
        getCollectJobs({
          user: this.$store.state.userInfo['id'],
          job: this.jobs[index].id
        }).then((response)=> {
          let data = response.data;
          if (data.length>0){
            let collectjobId = data[0]['id'];
            delCollectJob (
              collectjobId
            ).then((response)=>{
              delete this.$store.state.userCollectJobs[this.jobs[index].id];
              localStorage.setItem('collectjobs',JSON.stringify(this.$store.state.userCollectJobs));
              this.$store.dispatch('setCollectJobs');
              this.$message.success("取消收藏成功");
            }).catch(function (error) {
              console.log(error);
            });
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      addCollectJobHandler(index) {
        addCollectJob({
          user: this.$store.state.userInfo['id'],
          job: this.jobs[index].id
        }).then((response)=> {
          let data = response.data;
          if (this.$store.state.userCollectJobs==null){
            this.$store.state.userCollectJobs={};
          }
          this.$store.state.userCollectJobs[this.jobs[index].id] = data['create_time'];
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
