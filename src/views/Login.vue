<template>
    <div id = "content">
      <div id = "rect-login" class="rect-login-content">
        <el-row class="login-title"><span>招聘信息可视化平台</span></el-row>
        <el-row>
            <div id="login" v-if="logOrReg">
              <el-col ><div class="grid-content bg-purple logindiv">
                <el-form :model="loginform"  ref="loginform" label-width="80px" class="demo-ruleForm">
                  <el-form-item label="用户名:" prop="user" class="el-form-item-margin" >
                    <el-input v-model="loginform.user" clearable style="width: 200px;" placeholder="请输入邮箱/账号"></el-input>
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
                <el-button type="primary" class="login-button" @click="loginHandler">登&nbsp;&nbsp;&nbsp;录</el-button>
                <el-row :gutter="24" style="margin-top: 10px">
                  <el-col :span="12"><el-link type="info">忘记密码?</el-link></el-col>
                  <el-col :span="12"><el-link type="info" @click="registerClickHandler">注册</el-link></el-col>
                </el-row>
              </div></el-col>
            </div>
            <div id="register" v-if="!logOrReg">
              <el-col ><div class="grid-content bg-purple logindiv">
                <el-form :model="registerform"  ref="loginform" label-width="80px" class="demo-ruleForm">
                  <el-form-item label="邮  箱:" prop="email" class="el-form-item-margin" >
                    <el-input v-model="registerform.email" clearable style="width: 200px;" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名:" prop="user" class="el-form-item-margin" >
                    <el-input v-model="registerform.user" clearable style="width: 200px;" placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="密  码:" prop="password" class="el-form-item-margin">
                    <el-input v-model="registerform.password" clearable type="password" style="width: 200px;" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="确  认:" prop="password_again" class="el-form-item-margin">
                    <el-input v-model="registerform.password_again" clearable type="password" style="width: 200px;" placeholder="请再次输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="验证码:" prop="identifyCodeinput" class="el-form-item-margin">
                    <el-input v-model="registerform.identifyCodeinput" clearable style="width: 90px;float: left;" placeholder="验证码"></el-input>
                    <div class="code" @click="refreshCode">
                      <SIdentify :identifyCode="identifyCode"></SIdentify>
                    </div>
                  </el-form-item>
                </el-form>
                <el-button type="primary" class="login-button" @click="registerHandler()">注&nbsp;&nbsp;&nbsp;册</el-button>
                <el-row :gutter="24" style="margin-top: 10px">
                  <el-col :span="12"><el-link type="info">重置</el-link></el-col>
                  <el-col :span="12"><el-link type="info" @click="loginClickHandler">登录</el-link></el-col>
                </el-row>
              </div></el-col>
            </div>
          </el-row>
        <div style="height: 20px;"></div>

      </div>
    </div>
</template>

<script>
  import SIdentify from '../components/common/Identify'
  import {login, register,getUser,getCollectJobs,getFocusCompanies} from '../api/api'
  import cookie from '../static/js/cookie'

    // export const validator={
    //   emailValue(rule, value, callback) {
    //     let temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
    //     let tempOne = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
    //     if (value && (!(temp).test(value))) {
    //       callback(new Error('邮箱格式不符合规范'))
    //     } else {
    //       callback()
    //     }
    //   },
    // };

    export default {
      name: "Login",
      data(){
        return{
          logOrReg: true,
          input:'',
          activeName: 'second',
          identifyCodes: "1234567890",
          identifyCode: "",
          loginform: {
            user: '',
            password: '',
            identifyCodeinput: ''
          },
          registerform: {
            email:'',
            user: '',
            password: '',
            password_again:'',
            identifyCodeinput: ''
          },
          rules: {
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              // {validator:this.$rules.emailValue(),message: '邮箱格式不正确',trigger:'blur' }
              // { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ],
            user: [
              { required: true, message: '请输入账号', trigger: 'blur' },
              { min: 6, max: 12, message: '长度在 4 到 13 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 12, message: '长度在 6 到 13 个字符', trigger: 'blur' }
            ],
            password_agin: [
              { required: true, message: '请再次输入密码', trigger: 'blur' },
              { min: 6, max: 12, message: '长度在 6 到 13 个字符', trigger: 'blur' }
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
        loginHandler(){
          if (this.loginform.identifyCodeinput.length !== 4){//验证码
            this.$message.error('验证码有误')
          } else if( this.loginform.user.length ===0){//账号
            this.$message.error('账号不能为空')
          } else if( this.loginform.password.length ===0) {//密码
            this.$message.error('密码不能为空')
          }else{
            let that = this;
            login(
              {
                username: this.loginform.user,
                password: this.loginform.password
              }
            ).then((response) => {
              cookie.setCookie('name', this.loginform.user, 7);
              cookie.setCookie('token', response.data.token, 7);
              getUser({
                username: this.loginform.user,
              }).then((res) => {
                cookie.setCookie('id', res.data[0].id, 7);
                this.$store.dispatch('setInfo');
                this.getCollectJob();
                this.getFocusCompany();
                this.$message.success('登陆成功');
                this.$router.push("/app/");
              }).catch((function (err) {
              }));
            }).catch(function (error) {
              console.log(error);
              that.$message.error('账号或密码错误')
            });
          }
        },
        registerHandler(){
          if (this.registerform.identifyCodeinput.length !== 4){//验证码
            this.$message.error('验证码有误')
          } else if( this.registerform.user.length<4 || this.registerform.user.length>13){//账号长度
            this.$message.error('账号不规范，请重新输入')
          } else if( false){//账号长度
            this.$message.error('邮箱不规范，请重新输入')
          } else if (this.registerform.password!== this.registerform.password_again){// 密码长度
            this.$message.error('两次密码不一致，请重新输入')
          }else if (this.registerform.password.length<4 || this.registerform.password.length>13){// 密码长度
            this.$message.error('密码强度不够，请重新输入密码')
          }else{
            let that = this;
            register(
              {
                username: this.registerform.user,
                password: this.registerform.password,
                email: this.registerform.email
              }).then((response)=>{
                cookie.setCookie('name', response.data.username, 7);
                cookie.setCookie('id', response.data.id, 7);
                cookie.setCookie('token', response.data.token, 7);
                this.$store.dispatch('setInfo');
                this.$message.success('注册成功');
            }).catch(function (error) {
              console.log(error);
              that.$message.error('注册失败');
            })
          }
        },
        delStores(){
          cookie.delCookie('id');
          cookie.delCookie('token');
          cookie.delCookie('name');
          localStorage.removeItem('collectjobs');
          localStorage.removeItem('focuscompanies');
          this.$store.dispatch('setInfo');
          this.$store.dispatch('setCollectJobs');
          this.$store.dispatch('setFocusCompanies');
        },
        registerClickHandler(){
          this.logOrReg = false;
        },
        loginClickHandler(){
          this.logOrReg = true;
        },
        getFocusCompany() {
          getFocusCompanies({
            user: this.$store.state.userInfo['id'],
          }).then((response)=> {
            let data = response.data;
            let focuscompanies = {};
            for( let focuscompany of data){
              focuscompanies[focuscompany['company']] = focuscompany['create_time'];
            }
            localStorage.setItem('focuscompanies',JSON.stringify(focuscompanies));
            this.$store.dispatch('setFocusCompanies');
          }).catch(function (error) {
            console.log(error);
          });
        },
        getCollectJob() {
          getCollectJobs({
            user: this.$store.state.userInfo['id'],
          }).then((response)=> {
            let data = response.data;
            let collectjobs = {};
            for( let collectjob of data){
              collectjobs[collectjob['job']] = collectjob['create_time'];
            }
            localStorage.setItem('collectjobs',JSON.stringify(collectjobs));
            this.$store.dispatch('setCollectJobs');
          }).catch(function (error) {
            console.log(error);
          });
        },
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
          // identifyCodeCurrent = this.identifyCode;

        },
      },
      created(){
        this.delStores();
      },
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
    }
</script>

<style>
  #content{
    height: 100%;
    width: 100%;
    background-size: 50% 50%;
    background: url("../static/images/LoginBackground.png") no-repeat;
  }
  #rect-login{
    float: right;
    height:max-content;
    width: 300px;
    background: #FFFFFF;
    margin-top: 80px;
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
