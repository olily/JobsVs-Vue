<template>
  <div id="content">
    <div>
      <el-radio-group v-model="radio" @change="ChangeRadio">
        <el-radio-button label="0">岗位</el-radio-button>
        <el-radio-button label="1">企业</el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
  import CollectJob from "@/views/users/CollectJob"
  import FocusCompany from "@/views/users/FocusCompany"
  export default {
    name: "CollectList",
    data(){
      return{
        radio: '0',
        activeComponent : CollectJob,
        components: [CollectJob,FocusCompany],
      }
    },
    components:
      {
        CollectJob,
        FocusCompany,
      },
    methods: {
      ChangeRadio(){
        this.activeComponent = this.components[this.radio];
      }
    },
  }
</script>

<style scoped>
  #content{
    height: 553px;
    width: 96%;
    margin-top: 10px;
  }
  .table_div{
    margin-top: 10px;
    margin-left: 20px;
  }

</style>
