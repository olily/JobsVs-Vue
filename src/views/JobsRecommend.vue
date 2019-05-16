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
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect3"  @click="navClickHandler('c')">
          <el-row class="el-row-h1-title">
            昨日新增
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect4"  @click="navClickHandler('d')">
          <el-row class="el-row-h1-title">
            企业心选
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
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
          recommendjobs:'12345',
        }
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
        }
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
