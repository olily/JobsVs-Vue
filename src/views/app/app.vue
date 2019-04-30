<template>
  <el-row :gutter="24" style="margin-top: 20px">
    <el-col :span="4">
      <div class="menu-aside-div">
        <el-row ><div class="logo-aside">招聘信息可视化系统</div></el-row>
        <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" @select="verselectHandler">
          <el-menu-item v-for = "(menu,index) in vermenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="20" style="padding-right: 0">
      <el-row>
        <div class="menu-header">
        <div style="float: left;margin-left: 20px;">
          <el-input
            class="el-input-style"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input1">
          </el-input>
        </div>
          <span class="userImage">
            <i class="el-icon-message-solid" style="color: #3C5175;margin-right: 30px" aria-hidden="true"></i>
            <i class="el-icon-s-custom" style="color: #3C5175;" aria-hidden="true"></i>{{username}}
          </span>
        </div>
      </el-row>
      <div style="height: 100%">
        <component :is="activeComponent"></component>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import JobsVisualization from "@/views/JobsVisualization"
  import UserHome from "@/views/UserHome"
  import JobsRecommend from "@/views/JobsRecommend"
  export default {
    name: "profile",
    data() {
      return {
        username:'Simona',
        vermenuList: [
          {
            name: "岗位推荐",
            index: "1",
            icon: "el-icon-oj-zhuye",
            component: JobsRecommend,
          },
          {
            name: "总体情况",
            index: "2",
            icon: "el-icon-oj-kaoshi",
            component: UserHome,
          },
          {
            name: "岗位分析",
            index: "3",
            icon: "el-icon-oj-shoucang1",
            component: JobsVisualization,
          },
          {
            name: "企业分析",
            index: "4",
            icon: "el-icon-oj-shoucang1",
            component: JobsRecommend,
          },
        ],
        defaultIndex: '3',
        activeComponent : JobsVisualization,
        input1: '',
      };
    },
    components:
      {
        JobsVisualization,
        UserHome,
        JobsRecommend,
      },
    methods: {
      verselectHandler(key, keyPath) {
        this.activeComponent = this.vermenuList[key-1].component;
      }
    },
  }
</script>
<style>
  .menu-header{
    height: 40px;
    background: #FFFFFF;
    box-shadow:2px 0px 5px 0px rgba(172,200,219,0.46);
    margin-left: -22px;
  }
  .logo-aside{
    height: 80px;
    font-size: 20px;
    margin-top: 10px;
    color: #7EA0FE;
  }
  .el-menu-vertical-demo{
    border: none;
  }
  .menu-aside-div{
    box-shadow:1px 0px 0px 0px rgba(116,116,116,0.07);
    height:450px;
  }
  .userImage{
    float: right;
    margin-right: 3%;
    margin-top: 10px;
  }

  /*.el-input-style{*/
    /*height: 20px;*/
    /*font-size: 13px;*/
    /*box-shadow: none;*/
    /*border: 1px solid #e9e9e9;*/
  /*}*/
</style>
