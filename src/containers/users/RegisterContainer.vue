<template>
  <div class="site-wrapper">
    <div class="center-content">
      <div class="register-form">
        <el-tabs v-model="activeTab" @tab-click="changeTab">
          <el-tab-pane class="tab-content" label="Sign in" name="login">
            <div class="register-text">
              Login, new events ahead!
            </div>
            <el-form status-icon :rules="loginRules" :model="loginInfo" inline-message="true" ref="loginInfo" label-position="top" @keyup.enter.native="onLogin">
              <el-form-item label="Username" class="form-item" prop="username">
                <el-input v-model="loginInfo.username" @change="setLoginAttempt('')"></el-input>
              </el-form-item>
              <el-form-item label="Password" class="form-item" prop="password">
                <el-input v-model="loginInfo.password" type="password" @change="setLoginAttempt('')"></el-input>
              </el-form-item>
              <el-alert v-if="getLoginAttempt" title="User doesn't exist or wrong password" type="error">
              </el-alert>
              <el-form-item class="form-button">
                <el-button type="primary" @click="onLogin()">Login</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane class="tab-content" label="Join us" name="register">
            <div class="register-text">
              Start planning today!
            </div>
            <el-form status-icon :rules="rules" :model="registerInfo" inline-message="true" ref="registerInfo" label-position="top" @keyup.enter.native="onRegister">
              <el-form-item label="E-mail" class="form-item" prop="username">
                <el-input v-model="registerInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="Firstname" class="form-item" prop="person.firstname">
                <el-input v-model="registerInfo.person.firstname"></el-input>
              </el-form-item>
              <el-form-item label="Lastname" class="form-item" prop="person.lastname">
                <el-input v-model="registerInfo.person.lastname"></el-input>
              </el-form-item>
              <el-form-item label="Password" class="form-item" prop="password">
                <el-input v-model="registerInfo.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" class="form-item" prop="checkPassword">
                <el-input v-model="registerInfo.checkPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item class="form-button">
                <el-button type="primary" @click="onRegister()">Register</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoginEvents from '../../events/loginevents';
import AuthService from '../../services/authservice';

export default {
  name: 'RegisterContainer',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.registerInfo.checkPassword !== '') {
          this.$refs.registerInfo.validateField('checkPassword');
        }
        callback();
      }
    };

    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (this.registerInfo.checkPassword !== this.registerInfo.password) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };
    return {
      loginInfo: {
        username: '',
        password: '',
      },
      registerInfo: {
        username: '',
        password: '',
        person: {
          firstname: '',
          lastname: '',
        },
        checkPassword: '',
      },
      activeTab: 'login',
      loginRules: {
        username: [
          { required: true, message: 'We need your username!', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Fill in your password!', trigger: 'blur' },
        ],
      },
      rules: {
        username: [
          {
            type: 'email', message: 'This is not a valid email!', trigger: 'blur',
          },
          {
            required: true, message: 'This field is required!', trigger: 'blur',
          },
        ],
        'person.firstname': [
          { required: true, message: 'This field is required!', trigger: 'blur' },
        ],
        'person.lastname': [
          { required: true, message: 'This field is required!', trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPassword: [
          { validator: checkPassword, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['getLoginAttempt']),
  },
  methods: {
    ...mapActions(['setLoginAttempt']),
    changeTab(tab) {
      this.activeTab = tab.name;
    },
    onLogin() {
      LoginEvents.bus.$emit(LoginEvents.TRY_LOGIN, this.loginInfo);
    },
    onRegister() {
      if (this.registerInfo.password === this.registerInfo.checkPassword) {
        AuthService.register(
          this.registerInfo,
          () => {
            this.$notify({
              title: 'Registration succeeded',
              message: 'Check your mail for a registration email!',
              type: 'success',
              duration: 2000,
            });
            this.changeTab({ name: 'login' });
          },
          () => {
            this.$notify({
              title: 'Registration failed',
              message: 'Be sure to fill in all information.',
              type: 'error',
              duration: 2000,
            });
          },
        );
      } else {
        this.$notify({
          title: 'Registration failed',
          message: 'Be sure that your passwords match',
          type: 'error',
          duration: 2000,
        });
      }
    },
  },
};
</script>
