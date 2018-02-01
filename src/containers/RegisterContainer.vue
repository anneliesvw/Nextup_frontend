<template>
  <div class="site-wrapper">
    <div class="center-content">
      <div class="register-form">
        <!-- <div class="circle-logo">
          <img src="http://thedisneyblog.com/wp-content/uploads/2012/04/n-logo-big.png">
        </div> -->
        <el-tabs value="first">
          <el-tab-pane label="Sign in" name="first">
            <el-form label-position="top">
              <el-form-item class="form-item" label="Username">
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="Password">
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
              <el-form-item class="form-item" label="E-mail">
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="Username">
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="Password">
                <el-input></el-input>
              </el-form-item>
              <el-form-item class="form-item" label="Confirm Password">
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
</script>
