<template>
    <div class="jobcard">
      <el-row :gutter="24" style="padding-top: 10px">
        <el-col :span="12">
          <span class="card-job-name">{{job.name}}</span>
        </el-col>
        <el-col :span="12">
          <span class="card-salary">{{job.salary_low}}-{{job.salary_high}}</span>
        </el-col>
      </el-row>
      <el-row>
        <div class="card-job-edu">
          <span>经验{{job.work_year}}年 /</span>
          <span>{{job.edu_name}}</span>
        </div>
        <span class="card-put-time">{{job.put_time}}发布</span>
      </el-row>
      <el-row style="color:rgba(153,153,153,0.7);">----------------------------------------------</el-row>
      <el-row :gutter="24" class="card-company">
        <el-col :span="4">
          <div>
            <img class="card-company-logo" src="../../static/images/company/co144024.gif">
          </div>
        </el-col>
        <el-col :span="20">
          <el-row  >
            <span class="card-job-name" >{{job.company_name}}</span>
          </el-row>
          <el-row class="card-job-edu">
            <span> 互联网、餐饮 / {{job.city_name}} / {{job.companysize_name}}</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "JobCard",
        props:['job'],
    }
</script>

<style scoped>
  .jobcard{
    width:320px;
    height:120px;
    background: #FFFFFF;
    /*border-radius: 0px;*/
    border:1px solid rgba(153,153,153,0.2);
  }
  .card-job-name{
    float:left;
    margin-left: 10px;
    font-size: 15px;
    /*font-weight: bold;*/
    color: #333333;
  }
  .card-salary{
    float:right;
    margin-right: 10px;
    font-size: 15px;
    color: red;
    /*font-weight: bold;*/
  }
  .card-job-edu{
    color:#999999;
    font-size: 13px;
    float:left;
    margin-left:10px;
  }
  .card-put-time{
    color:#999999;
    font-size: 13px;
    float:right;
    margin-right: 10px;
  }
  .card-company{
    margin-left: 10px;
  }
  .card-company-des{
    color:#999999;
    font-size: 13px;
  }
  .card-company-logo{
    float:left;
    margin-left: 10px;
    width: 45px;
    height:45px;
  }

</style>
