<template>
    <div>
      <el-row :gutter="24">
        <!--<el-col :span="8">-->
        <!--</el-col>-->
        <el-col :span="24">
          <div style="height: 600px" id="burstChart1"></div>
          <div style="height: 700px" id="burstChart3"></div>
          <div style="height: 1000px" id="burstChart2"></div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {getIndustriesburst,getJobfunctionsburst,getCitiesburst} from "../api/api";
    export default {
        name: "UserHome",
        data(){
          return{
            industriesBurstDates: [],
            jobfunctionsBurstDates: [],
            citiesBurstDates: [],
          }
        },
        mounted() {
          this.getIndustryburst();
          this.getJobfunctionburst();
          this.getCityburst();
        },
        methods:{
          getIndustryburst(){
            getIndustriesburst({
              page_size: 100
            }).then((response)=> {
              this.industriesBurstDates = response.data.results;
              this.drawBurstChart1();
            }).catch(function (error) {
              console.log(error);
            });
          },
          drawBurstChart1(){
            let myChart = this.$echarts.init(document.getElementById('burstChart1'));
            var industries = {};
            var data = [];
            for( let industry of this.industriesBurstDates){
              if (industries.hasOwnProperty(industry['catg_name'])) {
                data[industries[industry['catg_name']]].children.push(
                  {
                    name: industry['in_name'],
                    children: [
                      {
                        name: industry['salary_avg'],
                        value: industry['count']}
                    ]
                  }
                )
              }else{
                industries[industry['catg_name']] = data.length;
                data.push({
                  name: industry['catg_name'],
                  children: []
                })
              }
            }
            var option = {
              series: {
                type: 'sunburst',
                highlightPolicy: 'ancestor',
                data: data,
                radius: [0, '95%'],
                sort: null,
                levels: [{}, {
                  r0: '15%',
                  r: '35%',
                  itemStyle: {
                    borderWidth: 2
                  },
                  label: {
                    rotate: 'tangential'
                  }
                }, {
                  r0: '35%',
                  r: '70%',
                  label: {
                    align: 'right'
                  }
                }, {
                  r0: '70%',
                  r: '72%',
                  label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                  },
                  itemStyle: {
                    borderWidth: 3
                  }
                }]
              }
            };
            myChart.setOption(option);
          },
          getJobfunctionburst(){
            getJobfunctionsburst({
              page_size: 1000
            }).then((response)=> {
              this.jobfunctionsBurstDates = response.data.results;
              this.drawBurstChart2();
            }).catch(function (error) {
              console.log(error);
            });
          },
          drawBurstChart2(){
            let myChart = this.$echarts.init(document.getElementById('burstChart2'));
            var  jobfunctions= {};
            var data = [];
            for( let jobfunction of this.jobfunctionsBurstDates){
              if (jobfunctions.hasOwnProperty(jobfunction['catg_name'])) {
                data[jobfunctions[jobfunction['catg_name']]].children.push(
                  {
                    name: jobfunction['fun_name'],
                    children: [
                      {
                        name: jobfunction['salary_avg'],
                        value: jobfunction['count']}
                    ]
                  }
                )
              }else{
                jobfunctions[jobfunction['catg_name']] = data.length;
                data.push({
                  name: jobfunction['catg_name'],
                  children: []
                })
              }
            }
            var option = {
              series: {
                type: 'sunburst',
                highlightPolicy: 'ancestor',
                data: data,
                radius: [0, '95%'],
                sort: null,
                levels: [{}, {
                  r0: '15%',
                  r: '35%',
                  itemStyle: {
                    borderWidth: 2
                  },
                  label: {
                    rotate: 'tangential'
                  }
                }, {
                  r0: '35%',
                  r: '70%',
                  label: {
                    align: 'right'
                  }
                }, {
                  r0: '70%',
                  r: '72%',
                  label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                  },
                  itemStyle: {
                    borderWidth: 3
                  }
                }]
              }
            };
            myChart.setOption(option);
          },
          getCityburst(){
            getCitiesburst({
              page_size: 500
            }).then((response)=> {
              this.citiesBurstDates = response.data.results;
              this.drawBurstChart3();
            }).catch(function (error) {
              console.log(error);
            });
          },
          drawBurstChart3(){
            let myChart = this.$echarts.init(document.getElementById('burstChart3'));
            var provinces = {};
            var data = [];
            for( let city of this.citiesBurstDates){
              if (provinces.hasOwnProperty(city['pro_name'])) {
                data[provinces[city['pro_name']]].children.push(
                  {
                    name: city['city_name'],
                    children: [
                      {
                        name: city['salary_avg'],
                        value: city['count']}
                    ]
                  }
                )
              }else{
                provinces[city['pro_name']] = data.length;
                data.push({
                  name: city['pro_name'],
                  children: []
                })
              }
            }
            var option = {
              series: {
                type: 'sunburst',
                highlightPolicy: 'ancestor',
                data: data,
                radius: [0, '95%'],
                sort: null,
                levels: [{}, {
                  r0: '15%',
                  r: '35%',
                  itemStyle: {
                    borderWidth: 2
                  },
                  label: {
                    rotate: 'tangential'
                  }
                }, {
                  r0: '35%',
                  r: '70%',
                  label: {
                    align: 'right'
                  }
                }, {
                  r0: '70%',
                  r: '72%',
                  label: {
                    position: 'outside',
                    padding: 3,
                    silent: false
                  },
                  itemStyle: {
                    borderWidth: 3
                  }
                }]
              }
            };
            myChart.setOption(option);
          }
        }
    }
</script>

<style scoped>

</style>
