<template>
  <el-row :gutter="24">
    <el-col :span="4">
      <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" @select="verselectHandler">
        <el-menu-item v-for = "(menu,index) in vermenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <component :is="activeComponent"></component>
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
        vermenuList: [
          {
            name: "home",
            index: "1",
            icon: "el-icon-oj-zhuye",
            component: JobsVisualization,
          },
          {
            name: "submissions",
            index: "2",
            icon: "el-icon-oj-kaoshi",
            component: UserHome,
          },
          {
            name: "collections",
            index: "3",
            icon: "el-icon-oj-shoucang1",
            component: JobsRecommend,
          },
        ],
        defaultIndex: '1',
        activeComponent : JobsVisualization,
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
</style>
