<template>
  <div id="content">
    <el-row :gutter="24">
      <el-col :span="16">
        <div class="basic_info">
          <el-row><span class="card_title"><i class="el-icon-s-home"></i>账户信息</span></el-row>
          <el-divider></el-divider>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-row ><img :src="imgUrl" class="userimg" style="width: 100px;height: 100px"></el-row>
            </el-col>
            <el-col :span="8">
              <el-row ><span>用户名:{{this.$store.state.userInfo['name']}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>邮箱:{{email}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>毕业院校:{{school}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>我的学历:{{edcation}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>工作经验:{{workyear}}</span></el-row>

            </el-col>
            <el-col :span="10">
              <el-row ><span>性别:{{sex}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>联系电话:{{mobilenum}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>出生日期:{{birthday}}</span></el-row>
              <el-row style="margin-top: 10px;"><span>所在城市:{{city}}</span></el-row>
            </el-col>
          </el-row>
        </div>
        <div class="job_info">
          <el-row><span class="card_title"><i class="el-icon-s-order"></i>求职意向</span></el-row>
          <el-divider></el-divider>
          <el-row :gutter="24">
            <el-col :span="10">
              <el-row class="info_span"><span>城市:{{want_city}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>行业:{{want_industry}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>岗位:{{want_jobfunction}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>工作要求经验:{{want_work_year}}</span></el-row>
            </el-col>
            <el-col :span="14">
              <el-row class="info_span"><span>企业规模:{{want_company_size}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>薪资范围:{{want_salary_low}}-{{want_salary_high}}</span></el-row>
              <el-row class="info_span" style="margin-top: 10px;"><span>工作要求学历:{{want_education}}</span></el-row>
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
                <span style="margin-top: 30px">{{collectjobcount}}(个)</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div id = circle2>
                <div style="height: 25px"></div>
                <span style="margin-top: 30px">关注企业:</span>
                <span style="margin-top: 30px">{{focuscompanycount}}(个)</span>
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
  import {getUserProfile,getUserWantJob,getFocusCompanies,getCollectJobs} from '../../api/api'
  export default {
    name: "UserProfile",
    data(){
      return{
        sex: '',
        imgUrl: '',
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
        want_jobfunction: '',
        collectjobcount: '0',
        focuscompanycount: '0',
        want_work_year: '',
        want_company_size: '',
        want_salary_low: '',
        want_salary_high: '',
        want_education: '',
        birthday: '',
        mobilenum:''
      }
    },
    mounted(){
      this.drawBie();
    },
    created(){
      this.getUserProfileId();
      this.getUserWantJobId();
      this.getFocusCompany();
      this.getCollectJob();
    },
    methods:{
      getyyyyMMdd(date){
        let d = new Date(date);
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1;
        let curr_year = d.getFullYear();
        String(curr_month).length < 2 ? (curr_month = "0" + curr_month): curr_month;
        String(curr_date).length < 2 ? (curr_date = "0" + curr_date): curr_date;
        return curr_year + "-" + curr_month +"-"+ curr_date;
      },
      getUserProfileId(){
        getUserProfile({
          user: this.$store.state.userInfo['id']
        }).then((response)=> {
          let data = response.data;
          if (data.results.length>0){
            let result = data.results[0];
            this.imgUrl = result['avatar'];
            this.email = result['email'];
            this.school = result['school'];
            this.city = result['city_name'];
            this.mobilenum = result['mobilenum'];
            this.sex = this.sexs[result['sex']];
            this.birthday = this.getyyyyMMdd(new Date((result['birthday']==null)?"1970-01-01":result['birthday']));
            this.workyear = result['work_year'];
            this.edcation = result['education_name'];
            this.mobilenum = result['mobilenum'];
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
            this.want_education = result['education_name'];
            this.want_work_year = result['workyear_name'];
            this.want_salary_low = result['want_salary_low'];
            this.want_salary_high = result['want_salary_high'];
            this.want_company_size = result['size_name'];
          }
        }).catch(function (error)
        {
          console.log(error);
        })
      },
      getFocusCompany(){
        getFocusCompanies({
          user: this.$store.state.userInfo['id'],
          page_size: 100,
        }).then((response)=> {
          let data = response.data;
          this.focuscompanycount = data.count;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCollectJob(){
        getCollectJobs({
          user: this.$store.state.userInfo['id'],
          page_size: 100,
        }).then((response)=> {
          let data = response.data;
          this.collectjobcount = data.count;
        }).catch(function (error) {
          console.log(error);
        });
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

