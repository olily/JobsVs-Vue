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
    import {getJobs,getCompanies} from '../api/api'
    export default {
        name: "HomeComponent",
        components:
          {
            JobCard,
          },
        created(){
          this.getYesterdayJob();
          this.getCompany();
        },
        data(){
          return{
            jobs: [],
            companies: [],
          }
        },
        mounted(){
          this.drawNewJobsChart();
        },
      methods: {
        sendMsgToParent(){
          this.$bus.emit('listenToChildEvent',"");
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
          // data: ["04-01","04-02","04-03","04-04","04-05","04-06","04-07"]
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
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              orient: 'vertical',
              data: ['全部新增', '关注'],
              'x': 'right'
            },
            // toolbox: {
            //   show : true,
            //   feature : {
            //     dataView : {show: true, readOnly: false},
            //     magicType : {show: true, type: ['line', 'bar']},
            //     restore : {show: true},
            //     saveAsImage : {show: true}
            //   }
            // },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                data: ["05-18", "05-19", "05-20", "05-21", "05-22", "05-23", "05-24"]
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '全部新增',
                type: 'bar',
                data: [234, 456, 342, 930, 487, 987, 239],
                // markPoint : {
                //   data : [
                //     {type : 'max', name: '最大值'},
                //     {type : 'min', name: '最小值'}
                //   ]
                // },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                },
                color: "#FFA897"
              },
              {
                name: '关注',
                type: 'bar',
                data: [100, 20, 30, 51, 28, 89, 42],
                // markPoint : {
                //   data : [
                //     {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                //     {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                //   ]
                // },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                },
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
