<template>
  <el-row :gutter="24">
    <el-col :span="16" class="el-row-content-data-rect">
      <el-col :span="12" v-for="job in jobs" :key="job.id">
        <JobCard :job="job"></JobCard>
      </el-col>
      <el-row>
        <el-button type="text" style="color: #8693F3;" @click="sendMsgToParent()">查看更多</el-button>
      </el-row>
    </el-col>
    <el-col :span="8" class="el-row-content-data-rect">
      <el-row>
        <div id="newJobsChart" class="recommed-chart"></div>
      </el-row>
      <el-row><span class="el-table-title">企业新增岗位排名</span></el-row>
      <el-row :gutter="24">
        <el-table
          :data="companies"
          id="companyRankTable"
          :row-style="{height: '10px'}"
          style="width: 100%">
          <el-table-column
            width="40">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            width="210">
          </el-table-column>
          <el-table-column
            prop="yesterday_count">
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
    import JobCard from "../components/recommend/JobCard"
    import {getJobs,getCompanies,getUserWantJob} from '../api/api'
    export default {
        name: "HomeComponent",
        components:
          {
            JobCard,
          },
        created(){
          this.getUserWantJobId();
          // this.getYesterdayJob();
          this.getCompany();
        },
        data(){
          return{
            jobs: [],
            companies: [],
            city: '',
            salary_low: '',
            salary_high: '',
            work_year_low: '',
            work_year_high: '',

          }
        },
        mounted(){
          this.drawNewJobsChart();
        },
      methods: {
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
        sendMsgToParent(){
          this.$bus.emit('listenToChildEvent',"");
        },
        getUserWantJobId(){
          getUserWantJob({
            user: this.$store.state.userInfo['id']
          }).then((response)=> {
            let data = response.data;
            if (data.length>0){
              console.log(response);
              this.city = data[0]['want_city'];
              if (this.city === 1){
                this.city = 2;
              }
              this.salary_low = data[0]['want_salary_low'];
              this.salary_high = data[0]['want_salary_high'];
              let work_year = this.getWorkYearRange(data[0]['want_workyear']);
              this.work_year_low = work_year.min;
              this.work_year_high = work_year.max;
              this.getRecommendJob();
            }
          }).catch(function (error)
          {
            console.log(error);
          })
        },
        getRecommendJob(){
          getJobs({
            city: this.city,
            work_year_min: this.work_year_low,
            salary_low_min: this.salary_low,
            salary_high_max: this.salary_high,
            page_size: 16
          }).then((response)=> {
            // console.log(response);
            let data = response.data;
            // data.results.sort(function (a, b) {
            //   return b.result - a.result;
            // });
            this.jobs = data.results.slice(0,16);
          }).catch(function (error) {
            console.log(error);
          });
        },
        getYesterdayJob() {
          getJobs({
            page_size: 12,
          }).then((response)=> {
            let data = response.data;
            this.jobs = data.results;
          }).catch(function (error) {
            console.log(error);
          });
        },
        getCompany() {
          getCompanies({
            ordering: '-yesterday_count',
            page_size: 10,
          }).then((response)=> {
            let data = response.data;
            this.companies = data.results;
          }).catch(function (error) {
            console.log(error);
          });
        },
        drawNewJobsChart() {
          // 基于准备好的dom，初始化echarts实例
          let myChart1 = this.$echarts.init(document.getElementById('newJobsChart'));
          // 绘制图表
          myChart1.setOption({
            title: {
              text: '近一周新增岗位',
              textStyle: {
                fontStyle: 'normal',     //风格
                fontWeight: 'normal',    //粗细
                fontFamily: 'Microsoft yahei',   //字体
                fontSize: 15,     //大小
                align: 'center'   //水平对齐
              }
            },
            grid:{
              left:"16%",
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              orient: 'vertical',
              data: ['全部新增', '关注'],
              'x': 'right'
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                data: ["05-25", "05-26", "05-27", "05-28", "05-29", "05-30", "05-31"]
              }
            ],
            yAxis: [
              {
                type: 'value'
              },
            ],
            series: [
              {
                name: '全部新增',
                type: 'bar',
                data: [27501, 33142, 99303, 66506, 79525, 64331, 84912,],
                color: "#FFA897"
              },
              {
                name: '关注',
                type: 'bar',
                data: [95, 90, 472, 231, 545, 678, 492],
                color: "#BC8DEE"
              },
            ]
          })
        },
      },
    }
</script>

<style scoped>
  /*.el-row-content-data-rect{*/
  /*background: red;*/
  /*height: 300px;*/
  /*width: 100%;*/
  /*}*/
  .el-card-row{
    margin-top:10px;
  }
  .recommed-chart{
    margin-top: 10px;
    width: 320px;
    height: 250px;
  }
  .el-table-title{
    font-size: 15px;
    /*margin-left: 10px;*/
    float:left;
  }
  .card-more-bt{
    height: 30px;
    margin-top: 10px;
    background: #FFFFFF;
    border: 1px #8693F3 solid;
    line-height: 0;
    color: #8693F3;
  }
  .el-table{
    border:none;
  }
  .el-table td ,.el-table th{
    padding: 0 0;
    border:1px solid #FFFFFF;

  }
  .el-table th.is-leaf{
    border-bottom: none;
  }
  .el-table::before{
    height: 0;
  }
</style>
