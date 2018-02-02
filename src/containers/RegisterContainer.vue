<template>
  <div class="site-wrapper">
    <div class="center-content">
      <div class="register-form">
        <el-tabs value="first">
          <el-tab-pane class="tab-content" label="Sign in" name="first">
            <div class="register-text">
              Login, new events ahead!
            </div>
            <el-form label-position="top">
              <el-form-item label="Username" class="form-item">
                <el-input v-model="loginInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="Password" class="form-item">
                <el-input v-model="loginInfo.password" type="password"></el-input>
              </el-form-item>
              <el-form-item class="form-button">
                <el-button type="primary" @click="onLogin()">Login</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane class="tab-content" label="Join us" name="second">
            <div class="register-text">
              Start planning today!
            </div>
            <el-form label-position="top">
              <el-form-item label="E-mail" class="form-item">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="Username" class="form-item">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="Password" class="form-item">
                <el-input type="password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" class="form-item">
                <el-input type="password"></el-input>
              </el-form-item>
              <el-form-item class="form-button">
                <el-button type="primary">Register</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginEvents from '../events/loginevents';

  export default {
    name: 'RegisterContainer',
    data() {
      return {
        loginInfo: {
          username: '',
          password: '',
        },
        selectedTab: 'login',
      };
    },
    methods: {
      changeTab(event) {
        this.selectedTab = event;
        window.console.log(this.selectedTab);
      },
      onLogin() {
        LoginEvents.bus.$emit(LoginEvents.TRY_LOGIN, this.loginInfo);
      },
    },
  };
</script>