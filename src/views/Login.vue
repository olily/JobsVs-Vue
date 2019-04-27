<template>
    <div id = "Login">
      <div id = "rect-login" class="rect-login-content">
          <el-row class="login-title"><span>招聘信息可视化平台</span></el-row>
          <el-row class="login">
            <el-col ><div class="grid-content bg-purple logindiv">
              <el-form :model="loginform" :rules="rules" ref="loginform" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名:" prop="user" class="el-form-item-margin" >
                  <el-input v-model="loginform.user" clearable style="width: 200px;" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密  码:" prop="password" class="el-form-item-margin">
                  <el-input v-model="loginform.password" clearable type="password" style="width: 200px;" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="identifyCodeinput" class="el-form-item-margin">
                  <el-input v-model="loginform.identifyCodeinput" clearable style="width: 90px;float: left;" placeholder="验证码"></el-input>
                  <div class="code" @click="refreshCode">
                    <SIdentify :identifyCode="identifyCode"></SIdentify>
                  </div>
                </el-form-item>
              </el-form>
              <el-button type="primary" class="login-button">登&nbsp;&nbsp;&nbsp;录</el-button>
              <el-row :gutter="24" style="margin-top: 10px">
                <el-col :span="12"><el-link type="info">忘记密码?</el-link></el-col>
                <el-col :span="12"><el-link type="info">注册</el-link></el-col>
              </el-row>
            </div></el-col>
          </el-row>
      </div>
    </div>
</template>

<script>
  import SIdentify from '../components/common/Identify'
    export default {
      name: "Login",
      data(){
        return{
          input:'',
          activeName: 'second',
          identifyCodes: "1234567890",
          identifyCode: "",
          loginform: {
            user: '',
            password: '',
            identifyCodeinput: ''
          },
          rules: {
            user: [
              { required: true, message: '请输入账号', trigger: 'blur' },
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ],
            identifyCodeinput: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { min: 4, max: 4, message: '长度在4个字符', trigger: 'blur' }
            ],
          }
        }
      },
      components:{
        SIdentify
      },
      methods: {
        submitForm(loginform) {
          this.$refs[loginform].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
              this.randomNum(0, this.identifyCodes.length)
              ];
          }
          console.log(this.identifyCode);
        },
      },
      created(){

      },
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
    }
</script>

<style>
  #Login{
    height: 100%;
    width: 100%;
    background-size: 50% 50%;
    background: url("../static/images/LoginBackground.png") no-repeat;
  }
  #rect-login{
    float: right;
    height:340px;
    width: 300px;
    background: #FFFFFF;
    margin-top: 100px;
    margin-right: 106px;
  }
  .rect-login-content{
    margin-top: 45px;
  }
  .login-title{
    font-size: 20px;
    margin-top: 30px;
  }
  .login-button{
    background: #4F81FF;
    width: 270px;
    margin-top: -20px;
  }

  .logindiv{
    margin-top: 30px;
  }
  .el-form-item-margin{
    margin-top: -5px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;

  }
</style>
