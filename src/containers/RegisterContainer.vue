<template>
  <div class="site-wrapper">
    <div class="center-content">
      <div class="register-form">
        <el-tabs value="first">
          <el-tab-pane label="Sign in" name="first">
            <el-form label-position="top">
              <el-form-item class="form-item">
                <span slot="label">
                  <i class="far fa-user fa-lg"></i> Username</span>
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item">
                <span slot="label">
                  <i class="far fa-paper-plane fa-lg"></i> Password</span>
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-button">
                <el-button type="primary">Login</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="Join us" name="second">
            <div class="register-text">
              Start planning today!
            </div>
            <el-form label-position="top">
              <el-form-item class="form-item">
                <span slot="label">
                  <i class="far fa-envelope fa-lg"></i> E-mail</span>
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item">
                <span slot="label">
                  <i class="far fa-user fa-lg"></i> Username</span>
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item">
                <span slot="label">
                  <i class="far fa-paper-plane fa-lg"></i> Password</span>
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item">
                <span slot="label">
                  <i class="far fa-paper-plane fa-lg"></i> Confirm Password</span>
                <el-input></el-input>
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
  export default {
    name: 'RegisterContainer',
    data() {
      return {
        selectedTab: 'login',
      };
    },
    methods: {
      changeTab(event) {
        this.selectedTab = event;
        window.console.log(this.selectedTab);
      },
    },
  };
</script>