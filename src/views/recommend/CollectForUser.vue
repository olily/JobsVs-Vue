<template>
  <div id="content">
    <div>
      <el-row :gutter="24">
        <el-col :span="4"><div>
          <el-select v-model="eduValue" placeholder="学历">
            <el-option
              v-for="item in eduOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        style="width: 100%;"
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
        <el-table-column>
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
        jobname: '',
        search: '',
        jobs: [],
        curPage: 1,
        pageSize: 5,
        total: 1000,
        eduOptions: [{
          value: '',
          label: '学历'
        },{
          value: '1',
          label: '无'
        }, {
          value: '2',
          label: '初中及以下'
        }, {
          value: '3',
          label: '高中/中技/中专'
        }, {
          value: '4',
          label: '大专'
        }, {
          value: '5',
          label: '本科'
        }, {
          value: '6',
          label: '硕士'
        }, {
          value: '7',
          label: '博士'
        }],
        eduValue: '',
        that: this,
      }
    },
    created() {
      this.getYesterdayJob(this.curPage);
    },
    mounted() {
      let userInfo = this.$store.state.userInfo;
      this.want_jobfunction_id = userInfo['jobfunction'];
      this.getRecommendJobs();
    },
    methods:{
      getWorkYearRange(e){
        let work_year_min = '';
        let work_year_max = '';
        if(e==''){
          work_year_min = '';
          work_year_max = '';
        }else if(e==1){
          work_year_min = 0;
          work_year_max = 0;
        } else if (e==2){
          work_year_min = 1;
          work_year_max = 3;
        } else if (e==3){
          work_year_min = 3;
          work_year_max = 5;
        } else if (e==4){
          work_year_min = 5;
          work_year_max = 10;
        } else if (e==5){
          work_year_min = 10;
          work_year_max = 99;
        }
        return {
          min: work_year_min,
          max: work_year_max
        }
      },
      getYesterdayJob(e) {
        let work_year_range = this.getWorkYearRange(this.workyearValue);
        getJobs({
          name: this.jobname,
          city: this.cityArray[1],
          education: this.eduValue,
          work_year_min: work_year_range.min,
          work_year_max: work_year_range.max,
          page_size:203,
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
        let work_year_range = this.getWorkYearRange(this.workyearValue);
        this.curPage = e;
        getJobs({
          name: this.jobname,
          city: this.cityArray[1],
          education: this.eduValue,
          work_year_min: work_year_range.min,
          work_year_max: work_year_range.max,
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
        let work_year_range = this.getWorkYearRange(this.workyearValue);
        getJobs({
          name: this.jobname,
          city: this.cityArray[1],
          education: this.eduValue,
          work_year_min: work_year_range.min,
          work_year_max: work_year_range.max,
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
          if (data.results.length>0){
            let collectjobId = data.results[0]['id'];
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
