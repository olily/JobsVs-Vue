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
            急聘岗位
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect3">
          <el-row class="el-row-h1-title">
            公司推荐
          </el-row>
          <el-row class="el-row-h2-data">
            {{recommendjobs}}个
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class = "rect-myrecommend rect4">
          <el-row class="el-row-h1-title">
            今日新增
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
      </el-col>
      <el-col :span="8" class="el-row-content-data-rect">
        <el-row>公司Top</el-row>
        <el-row>图表-每日新增岗位数</el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import JobCard from "../components/recommend/JobCard"
    export default {
      name: "JobsRecommend",
      data(){
        return{
          recommendjobs:'12345',
        }
      },
      components:{
        JobCard
      }
    }
</script>

<style scoped>
  #main-content{
    width: 99%;
    height: 100%;
    /*background: aquamarine;*/
    margin-top:10px;
  }
  .rect-myrecommend{
    width:100%;
    height:100px;
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

</style>
