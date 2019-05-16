<template>
  <div id="content">
    <el-row :gutter="24">
      <el-col :span="16">
        <div class="basic_info">
          <el-row><span class="card_title"><i class="el-icon-s-home"></i>账户信息</span></el-row>
          <el-divider></el-divider>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-row ><img src="../../static/images/user/Simona.png" class="userimg"></el-row>
            </el-col>
            <el-col :span="8">
              <el-row ><span>用户名:{{this.$store.state.userInfo['name']}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>邮箱:2287133453@qq.com{{email}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>毕业院校:西南科技大学{{school}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>工作经验:无{{workyear}}</span></el-row>

            </el-col>
            <el-col :span="10">
              <el-row ><span>性别:女{{sex}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>出生日期:2019-09-23{{birth_day}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>所在城市:绵阳{{city}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>我的学历:本科{{edcation}}</span></el-row>
            </el-col>
          </el-row>
        </div>
        <div class="job_info">
          <el-row><span class="card_title"><i class="el-icon-s-order"></i>求职意向</span></el-row>
          <el-divider></el-divider>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-row class="info_span"><span>城市:成都{{want_city}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>行业:计算机软件{{want_industry}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>岗位:软件工程师{{want_jobfunction}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>工作要求经验:无{{want_work_year}}</span></el-row>
            </el-col>
            <el-col :span="14">
              <el-row class="info_span"><span>企业规模:500-1000人{{want_company_size}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>薪资范围:7000-15000{{want_salary_low}}-{{want_salary_high}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>工作要求学历:本科{{want_education}}</span></el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="userdata_anlyse">
          <el-row><span class="card_title"><i class="el-icon-s-data"></i>我的数据</span></el-row>
          <el-divider></el-divider>
          <el-row :gutter="24" style="margin-top: 20px; margin-left:10px">
            <el-col :span="12">
              <div id = circle1>
                <div style="height: 25px;"></div>
                <span style="margin-top: 30px">收藏岗位:</span>
                <span style="margin-top: 30px">1000(个)</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div id = circle2>
                <div style="height: 25px"></div>
                <span style="margin-top: 30px">关注企业:</span>
                <span style="margin-top: 30px">38(个)</span>
              </div>
            </el-col>
          </el-row>
          <div class="chart" id = "job_bar">
        </div>
        <!--<div class="chart" id = "job_bar">-->

        </div>
        <!--<div class="chart" id="operations"></div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getUserProfile,getUserWantJob} from '../../api/api'
  export default {
    name: "UserProfile",
    data(){
      return{
        sex: '',
        email: '',
        city: '',
        school: '',
        edcation: '',
        workyear: '',
        sexs:[
          "保密",
          "男",
          "女"
        ],
        want_city: '',
        want_industry: '',
        want_jobfunction: ''
      }
    },
    mounted(){
      this.drawBie();
      // this.drawCalender();
    },
    created(){
      this.getUserProfileId();
      this.getUserWantJobId();
    },
    methods:{
      getUserProfileId(){
        getUserProfile({
          user: this.$store.state.userInfo['id']
        }).then((response)=> {
          let data = response.data;
          console.log(data);
          if (data.results.length>0){
            let result = data.results[0];
            this.email = result['email'];
            this.school = result['school'];
            this.city = result['city_name'];
            this.sex = this.sexs[result['sex']];
            this.birthday = new Date((result['birthday']==null)?"1970-01-01":result['birthday']);
            this.workyear = result['work_year'];
            this.edcation = result['education_name'];
            this.birth_day = result['education_name'];
            console.log(result);
          }
        }).catch(function (error)
        {
          console.log(error);
        })
      },
      getUserWantJobId(){
        getUserWantJob({
          user: this.$store.state.userInfo['id']
        }).then((response)=> {
          let data = response.data;
          if (data.length>0){
            let result = data[0];
            this.want_city = result['city_name'];
            this.want_industry = result['industry_name'];
            this.want_jobfunction = result['jobfunction_name'];
            this.want_education = result['jobfunction_name'];
            this.want_work_year = result['jobfunction_name'];
            this.want_salary_low = result['jobfunction_name'];
            this.want_salary_high = result['jobfunction_name'];
            this.want_company_size = result['jobfunction_name'];
          }
        }).catch(function (error)
        {
          console.log(error);
        })
      },
      drawBie(){
        let myChart = this.$echarts.init(document.getElementById("job_bar"));
        // app.title = '环形图';
        myChart.setOption(
          {
            title:{
              // text: '收藏分布',
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              // orient: 'vertical',
              // x: 'left',
              data:['计算机软件','计算机硬件','网络游戏','互联网/电子商务','通信/电信/网络设备']
            },
            series: [
              {
                name:'收藏分布',
                type:'pie',
                radius: ['30%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center',
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '16',
                      fontWeight: 'normal'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  },
                },
                // padding: 20,
                data:[
                  {value:335, name:'计算机软件'},
                  {value:310, name:'计算机硬件'},
                  {value:234, name:'网络游戏'},
                  {value:135, name:'互联网/电子商务'},
                  {value:1548, name:'通信/电信/网络设备'}
                ]
              }
            ]
          }
        )},
    }
  }
</script>

<style scoped>
  #content{
    height: 553px;
    width: 100%;
    /*background: papayawhip;*/
  }
  .basic_info{
    margin-top: 20px ;
    height: 250px;
    width: 96%;
    /*background:pink;*/
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border-width:1px;
  }
  .job_info{
    margin-top: 20px ;
    height: 250px;
    width: 96%;
    /*background:pink;*/
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border-width:1px;
  }
  .userdata_anlyse{
    margin-top: 20px ;
    height: 500px;
    margin-left: -10px;
    width: 96%;
    /*background:pink;*/
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border-width:1px;
  }
  .userimg{
    margin-top: 10px;
    padding-right: 10px;
    /*margin-right: 10px;*/
    /*float: right;*/
  }
  .usernameandemail{
    margin-top: 10px;
    margin-left: -10px;
    /*float: left;*/
  }
  .card_title{
    float:left;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 20px;
    color: #FFA897;
  }
  #circle1{
    width: 100px;
    height: 100px;
    background: #89C3F8;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    margin-left: 10px;
    color: #FFFFFF;
  }
  #circle2{
    width: 100px;
    height: 100px;
    background: #89C3F8;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    margin-left: 10px;
    color: #FFFFFF;
  }
  .info_span{

  }
  .chart{
    margin-top: 20px;
    height: 350px;
    width: 250px;
    margin-left: 20px;
  }

</style>

