<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowRegister}" class="register">
                <input type="text" v-model="register.username" placeholder="用户名">
                <input type="password" v-model="register.password" placeholder="密码">
                <p v-bind:class="{error: register.isError}">{{register.notice}}</p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>
            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowLogin}" class="login">
                <input type="text" v-model="login.username" placeholder="输入用户名">
                <input type="password" v-model="login.password" placeholder="密码">
                <p v-bind:class="{error:login.isError}">{{login.notice}}</p>
                <div class="button" @click="onLogin">登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions }  from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: '',
        password: '',
        notice: '输入用户名和密码',
        isError: false
      },
      register: {
        username: '',
        password: '',
        notice: '创建账号后，请记住用户名和密码',
        isError: false
      }
    }
  },
  methods: {
    ...mapActions(['loginUser', 'registerUser']),

    showLogin(){
      this.isShowLogin = true
      this.isShowRegister = false
    },
    showRegister(){
      this.isShowLogin = false
      this.isShowRegister = true
    },
    onRegister(){
      let result = this.validUserName(this.register.username)
      if (!result.isValid) {
        this.register.notice = result.notice
        this.register.isError = true
        return
      }
      let result2 = this.validPassword(this.register.password)
      if (!result2.isValid) {
        this.register.notice = '密码长度为6~16个字符'
        this.register.isError = true
        return
      }
      this.registerUser({
        username: this.register.username,
        password: this.register.password
      }).then(() => {
        this.register.notice = ''
        this.register.isError = false
        this.$router.push({path: 'notebooks'})
      }).catch(data => {
        this.register.notice = data.msg
        this.register.isError = true
      })
    },
    onLogin(){
      let result = this.validUserName(this.login.username)
      if (!result.isValid) {
        this.login.notice = result.notice
        this.login.isError = true
        return
      }
      let result2 = this.validPassword(this.login.password)
      if (!result2.isValid) {
        this.login.notice = result2.notice
        this.login.isError = true
        return
      }
      this.loginUser({
        username: this.login.username,
        password: this.login.password
      }).then(() => {
        this.login.notice = ''
        this.login.isError = false
        this.$router.push({path: '/notebooks'})
      }).catch(() => {
        this.login.notice = '登录失败'
        this.login.isError = true
      })
    },
    validUserName(username) {
      return {
        isValid: /^[\w\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: '用户名3~15个字符，仅限于字母数字下划线中文'
      }
    },
    validPassword(password){
      return { //test 方法检查字符串中是否存在某种模式，如果存在，则返回 true，否则返回 false
        isValid: /^.{6,16}$/.test(password),
        notice: '密码长度为6~16个字符'
      }
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
}

.main { /*36bc64*/
  flex: 1;
  background: #ace66f url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
  background-size: contain;
}

.form {
  width: 270px;
  border-left: 1px solid #ccc;
  h3 {
    padding: 10px 20px;
    font-family: normal;
    font-size: 16px;
    border-top: 1px solid #eee;
    cursor: pointer;
    &:nth-of-type(2) {
      border-bottom: 1px solid #eee;
    }
  }
  .button {
    background-color: #94cb59; /*#2bb964;*/
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    margin-top: 18px;
    cursor: pointer;
  }
  .login, .register {
    padding: 0px 20px;
    border-top: 1px solid #eee;
    height: 0;
    overflow: hidden;
    transition: height .7s;
    &.show {
      height: 193px;
    }
    input {
      display: block;
      width: 100%;
      height: 35px;
      line-height: 35px;
      padding: 0 6px;
      border-radius: 4px;
      border: 1px solid #ccc;
      outline: none;
      font-size: 14px;
      margin-top: 10px;
    }
    input:focus {
      border: 3px solid #9dcaf8;
    }
    p {
      font-size: 12px;
      margin-top: 10px;
      color: #444;
    }
    .error {
      color: red;
    }
    .login {
      border-top: 0;
    }
  }
}
</style>
