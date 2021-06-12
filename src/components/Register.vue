<template>
  <div>
    <el-container>
      <el-aside width="60%" style="min-height: 854px;position: relative">
        <img src="../assets/未得商城.png" alt="loginBackground" width="100%"
             style="position: absolute;margin-top: -185px;top: 50%">
      </el-aside>
      <el-main class="register-main"
               style="margin:auto 10%;width: 20%;height:80%;vertical-align: center">
        <h1 style="color: #409EFF;text-align: center">注册</h1>
        <el-form ref="loginForm" :model="user" label-width="20%">
          <el-form-item label="类型" required>
            <el-select v-model="value" placeholder="请选择用户种类" style="width: 90%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" v-if="type" required>
            <el-input v-model="user.name" type="text" autocomplete="off" placeholder="请输入用户名称" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="名称" v-if="!type" required>
            <el-input v-model="seller.name" type="text" autocomplete="off" placeholder="请输入用户名称" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="密码" v-if="type" required>
            <el-input v-model="user.password" type="password" autocomplete="off" placeholder="请输入密码" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="密码" v-if="!type" required>
            <el-input v-model="seller.password" type="password" autocomplete="off" placeholder="请输入密码" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="电话" v-if="type" required>
            <el-input v-model="user.telephone" type="tel" autocomplete="off" placeholder="请输入电话" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="电话" v-if="!type" required>
            <el-input v-model="seller.telephone" type="tel" autocomplete="off" placeholder="请输入电话" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" v-if="type" required>
           <el-input v-model="user.email" type="email" autocomplete="off" placeholder="请输入邮箱" clearable
                     size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" v-if="!type" required>
            <el-input v-model="seller.email" type="email" autocomplete="off" placeholder="请输入邮箱" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="种类" v-if="!type" required>
            <el-input v-model="seller.kind" type="text" autocomplete="off" placeholder="请商家输入商品种类" clearable
                      size="medium" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button type="primary" v-if="type" @click="onRegister" style="margin-left: 20%">注册</el-button>
            <el-button type="primary" v-if="!type" @click="onRegisterSeller" style="margin-left: 20%">注册</el-button>
            <el-button type="primary" @click="clearForm" style="float: right;margin-right: 20%">清空</el-button>
            <div class="clearBox"></div>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        password: "",
        telephone: "",
        email: ""
      },
      seller: {
        name: "",
        password: "",
        kind: "",
        telephone: "",
        email: ""
      },
      options: [{
        value: '选项1',
        label: '买家'
      }, {
        value: '选项2',
        label: '商家',
      }],
      value: '',
      type: true
    }
  },
  watch: {
    value(newName){
      if(newName == "选项1"){
        this.type = true;
      }
      else if(newName == "选项2") {
        this.type = false;
        //print(111);
      }
    }
  },
  created() {
    if(this.$route.params.isReload == 'true'){
      this.$router.go(0);
    }
  },
  methods: {
    onRegister: function () {
      const _this = this
      this.$axios.post(
          '/register',
          _this.user,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
        // 这里是处理正确的回调
        if (response.data.code == '0') {
          _this.$message({
            message: '用户注册成功！',
            type: 'success'
          });
          _this.$router.push({name: "Login", params: {msg: '用户注册成功！'}});
        } else {
          _this.$message.error(response.data.msg);
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    },
    onRegisterSeller: function () {
      const _this = this
      this.$axios.post(
          '/register/seller',
          _this.seller,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
        // 这里是处理正确的回调
        if (response.data.code == '0') {
          _this.$message({
            message: '商家注册成功！',
            type: 'success'
          });
          _this.$router.push({name: "Login", params: {msg: '商家注册成功！'}});
        } else {
          _this.$message.error(response.data.msg);
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    },
    clearForm: function () {
      this.user.name = "";
      this.user.email = "";
      this.user.password = "";
      this.user.telephone = "";
      this.user.type = "";
      this.value = "";
    }
  }
}
</script>

<style scoped>
.register-main {
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.clearBox {
  clear: both;
}
</style>
