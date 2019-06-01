<template>
  <div id="main-content">
    <el-row :gutter="24">
      <el-col :span="6">
        <div class= "rect-myrecommend rect1" @click="navClickHandler('a')">
          <el-row class="el-row-h1-title" >
            为你精选
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect2" @click="navClickHandler('b')">
          <el-row class="el-row-h1-title">
            活跃企业
          </el-row>
          <el-row class="el-row-h2-data">
            {{activecompanycount}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect3"  @click="navClickHandler('c')">
          <el-row class="el-row-h1-title">
            昨日新增
          </el-row>
          <el-row class="el-row-h2-data">
            {{yesterdayaddjobscount}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect4"  @click="navClickHandler('d')">
          <el-row class="el-row-h1-title">
            企业心选
          </el-row>
          <el-row class="el-row-h2-data">
            {{focuscompanyJobcount}}个
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div style="height: 100%">
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
  import CollectForUser from "@/views/recommend/CollectForUser"
  import CompanyForUser from "@/views/recommend/CompanyForUser"
  import NoticeCompanyJobs from "@/views/recommend/NoticeCompanyJobs"
  import YesterdayAddJobs from "@/views/recommend/YesterdayAddJobs"
  import HomeComponent from "@/views/HomeComponent"
  import {getJobs,getCompanies} from '../api/api'
    export default {
      name: "JobsRecommend",
      components:
        {
          CollectForUser,
          CompanyForUser,
          NoticeCompanyJobs,
          YesterdayAddJobs,
          HomeComponent
        },
      data(){
        return{
          activeComponent: HomeComponent,
          recommendjobs:'99',
          activecompanycount: 0,
          yesterdayaddjobscount: 0,
          focuscompanyJobcount: 0,
        }
      },
      created(){
        this.yesterday = this.getDateStr(-1);
        this.getYesterdayJob();
        this.getFocusCompanyJob();
        this.getActiveCompany();
      },
      mounted(){
        let that = this;
        this.$bus.on('listenToChildEvent',function (msg){
          that.activeComponent = CollectForUser;
        })
      },
      methods: {
        navClickHandler(value) {
          if (value === 'a') {
            this.activeComponent = CollectForUser;
          }else if(value === 'b'){
            this.activeComponent = CompanyForUser;
          }else if(value === 'c'){
            this.activeComponent = YesterdayAddJobs;
          }else if(value === 'd'){
            this.activeComponent = NoticeCompanyJobs;
          }
        },
        getDateStr(AddDayCount) {
          let dd = new Date();
          dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
          let year = dd.getFullYear();
          let mon = dd.getMonth()+1;                             //获取当前月份的日期
          let day = dd.getDate();
          return year + "-" + mon + "-" + day;
        },
        getYesterdayJob() {
          getJobs({
            put_time: this.yesterday,
          }).then((response)=> {
            let data = response.data;
            this.yesterdayaddjobscount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
        getActiveCompany() {
          getCompanies({
            ordering: '-yesterday_count',
            yesterday_count_min: 40,
          }).then((response)=> {
            let data = response.data;
            this.activecompanycount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
        getFocusCompanyJob() {
          getJobs({
            focuscompany_filter: 1,
          }).then((response)=> {
            let data = response.data;
            this.focuscompanyJobcount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
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
</style>
