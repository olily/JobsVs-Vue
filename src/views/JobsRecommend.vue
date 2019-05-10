<template>
  <div id="main-content">
    <el-row :gutter="24">
      <el-col :span="6">
        <div class= "rect-myrecommend rect1">
          <el-row class="el-row-h1-title">
            为你精选
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect2">
          <el-row class="el-row-h1-title">
            活跃企业
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect3">
          <el-row class="el-row-h1-title">
            昨日新增
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect4">
          <el-row class="el-row-h1-title">
            企业心选
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="16" class="el-row-content-data-rect">
        <el-row :gutter="24" class="el-card-row">
          <el-col :span="12"><JobCard></JobCard></el-col>
          <el-col :span="12"><JobCard></JobCard></el-col>
        </el-row>
        <el-row :gutter="24" class="el-card-row">
          <el-col :span="12"><JobCard></JobCard></el-col>
          <el-col :span="12"><JobCard></JobCard></el-col>
        </el-row>
        <el-row :gutter="24" class="el-card-row">
          <el-col :span="12"><JobCard></JobCard></el-col>
          <el-col :span="12"><JobCard></JobCard></el-col>
        </el-row>
        <el-row :gutter="24" class="el-card-row">
          <el-col :span="12"><JobCard></JobCard></el-col>
          <el-col :span="12"><JobCard></JobCard></el-col>
        </el-row>
        <el-row>
          <el-button type="text" style="color: #8693F3;">查看更多</el-button>
          <!--<el-button type="primary" class="card-more-bt">查看更多</el-button>-->
        </el-row>
      </el-col>
      <el-col :span="8" class="el-row-content-data-rect">
        <el-row>
          <div id="newJobsChart" class="recommed-chart"></div>
        </el-row>
        <el-row><span class="el-table-title">企业新增岗位排名</span></el-row>
        <el-row :gutter="24">
          <!--<div id="companyRankChart" class="recommed-chart"></div>-->
          <el-table
            :data="tableData"
            id="companyRankTable"
            row-style="height:10px"
            style="width: 100%">
            <el-table-column
              prop="rank"
              width="40">
            </el-table-column>
            <el-table-column
              prop="companyName"
              width="210">
            </el-table-column>
            <el-table-column
              prop="newJobsNum">
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import JobCard from "../components/recommend/JobCard"
    export default {
      name: "JobsRecommend",
      mounted(){
        this.drawNewJobsChart();
        this.drawComapnyRankChart();
      },
      data(){
        return{
          recommendjobs:'12345',
          tableData: [{
            rank: '1',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          }, {
            rank: '2',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          }, {
            rank: '3',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          }, {
            rank: '4',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          },{
            rank: '5',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          },{
            rank: '6',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          },{
            rank: '7',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          },{
            rank: '8',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          },{
            rank: '9',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          },{
            rank: '10',
            companyName: '北明软件有限公司成都分公司',
            newJobsNum: '10000'
          }]
        }
      },
      methods:{
        drawNewJobsChart(){
          // 基于准备好的dom，初始化echarts实例
          let myChart1 = this.$echarts.init(document.getElementById('newJobsChart'));
          // 绘制图表
            // data: ["04-01","04-02","04-03","04-04","04-05","04-06","04-07"]
          myChart1.setOption({
              title : {
                text: '近一周新增岗位',
                textStyle: {
                  fontStyle: 'normal',     //风格
                  fontWeight: 'normal',    //粗细
                  fontFamily: 'Microsoft yahei',   //字体
                  fontSize: 15,     //大小
                  align: 'center'   //水平对齐
                }
              },
              tooltip : {
                trigger: 'axis'
              },
              legend: {
                orient: 'vertical',
                data:['全部新增','关注'],
                'x':'right'
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
              calculable : true,
              xAxis : [
                {
                  type : 'category',
                  data : ["04-01","04-02","04-03","04-04","04-05","04-06","04-07"]
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                {
                  name:'全部新增',
                  type:'bar',
                  data:[234,456,342,930,487,987,239],
                  // markPoint : {
                  //   data : [
                  //     {type : 'max', name: '最大值'},
                  //     {type : 'min', name: '最小值'}
                  //   ]
                  // },
                  markLine : {
                    data : [
                      {type : 'average', name: '平均值'}
                    ]
                  },
                  color:"#FFA897"
                },
                {
                  name:'关注',
                  type:'bar',
                  data:[100,20,30,51,28,89,42],
                  // markPoint : {
                  //   data : [
                  //     {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                  //     {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                  //   ]
                  // },
                  markLine : {
                    data : [
                      {type : 'average', name : '平均值'}
                    ]
                  },
                  color:"#BC8DEE"
                },
              ]
            })
        },
        drawComapnyRankChart(){
          let myChart2 = this.$echarts.init(document.getElementById('companyRankChart'));
          myChart2.setOption({
            title:{
              text:'今日新增岗位排名',
              textStyle: {
                fontStyle: 'normal',     //风格
                fontWeight: 'normal',    //粗细
                fontFamily: 'Microsoft yahei',   //字体
                fontSize: 15,     //大小
                align: 'center'   //水平对齐
              }
            },
            dataset: {
              source: [
                ['score', 'amount', 'product'],
                [89.3, 58212, '阿里'],
                [57.1, 78254, '百度'],
                [74.4, 41032, '腾讯'],
                [50.1, 12755, '京东'],
                [89.7, 20145, '菲尼克斯互娱'],
                [68.1, 79146, '巨人网络'],
                [19.6, 91852, '盛大游戏'],
                [32.7, 20112, '肯德基总公司']
              ]
            },
            grid: {containLabel: true},
            xAxis: {
              name: 'amount',
              textStyle:{
                fontStyle: 'normal',     //风格
                fontWeight: 'normal',    //粗细
                fontFamily: 'Microsoft yahei',   //字体
                fontSize: 4,     //大小
                align: 'center'   //水平对齐
              }
            },
            yAxis: {type: 'category'},
            color:"#8693F3",
            // visualMap: {
            //   orient: 'horizontal',
            //   left: 'center',
            //   min: 10,
            //   max: 100,
            //   text: ['High Score', 'Low Score'],
            //   // Map the score column to color
            //   dimension: 0,
            //   inRange: {
            //     color: ['#D7DA8B', '#E15457']
            //   }
            // },
            series: [
              {
                type: 'bar',
                encode: {
                  // Map the "amount" column to X axis.
                  x: 'amount',
                  // Map the "product" column to Y axis
                  y: 'product'
                }
              }
            ]
          });

        }
      },
      components:{
        JobCard
      }
    }
</script>

<style scoped>
  #main-content{
    width: 97%;
    height: 100%;
    /*background: aquamarine;*/
    margin-top:10px;
  }
  .rect-myrecommend{
    width:100%;
    height:80px;
  }
  .rect1{
    background: #8693F3;
  }
  .rect2{
    background: #BC8DEE;
  }
  .rect3{
    background: #FFA897;
  }
  .rect4{
    background: #89C3F8;
  }
  .el-row-h1-title{
    font-family: PingFang SC,serif;
    font-size: 20px;
    color: #FFFFFF;
    padding-top: 10px;
    font-weight:bold;
  }
  .el-row-h2-data{
    font-family: "Arial";
    font-size: 20px;
    color: #FFFFFF;
    padding-top: 10px;
    font-weight:bold;
  }
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


</style>
<style>
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
