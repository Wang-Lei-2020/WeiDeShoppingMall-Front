<template>
  <div id="app">

    <div v-if="photoFlag">
      <el-dialog
          title="修改头像"
          :visible.sync="photoFlag"

          width="40%">
        <ChangePhoto></ChangePhoto>
      </el-dialog>
    </div>

    <div v-if="shopPhotoFlag">
      <el-dialog
          title="修改店铺图片"
          :visible.sync="shopPhotoFlag"

          width="40%">
        <ChangeShopPhoto></ChangeShopPhoto>
      </el-dialog>
    </div>

    <el-container>
      <el-header class="header" v-if="$route.meta.tabType">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1" style="margin-left: 4%" >
            <img style="height: 56px;margin-right: 8%" src="./assets/logo.png" alt="logo">未得商城
          </el-menu-item>
          <el-menu-item index="2" style="margin-left: 4%" v-if="!getSellerType" v-on:click="toHome">主页</el-menu-item>
          <el-menu-item index="3" style="margin-left: 4%" v-if="getSellerType" v-on:click="toSellerHome">我的店铺</el-menu-item>
          <el-menu-item index="4" style="margin-left: 4%" v-on:click="toForum">论坛</el-menu-item>
          <el-submenu index="5" style="float: right;padding-right: 4%">
            <template slot="title">
              <el-avatar :src="getPhotoUrl"></el-avatar>
              {{getUsername}}
            </template>
            <el-menu-item index="5-1" v-if="!getLoginState"  v-on:click="toLogin">登录</el-menu-item>
            <el-menu-item index="5-2" v-if="!getLoginState" v-on:click="toRegister">注册</el-menu-item>
<!--  待解决          <el-menu-item index="3-3" v-if="getLoginState" v-on:click="toRegister">修改密码</el-menu-item>-->
            <el-menu-item index="5-3" v-if="(getLoginState)&(!getSellerType)" v-on:click="toIndex">个人中心</el-menu-item>
            <el-menu-item index="5-4" v-if="getLoginState" v-on:click="changePhoto">更换头像</el-menu-item>
            <el-menu-item index="5-5" v-if="(getLoginState)&(getSellerType)" v-on:click="changeShopPhoto">更换店铺图片</el-menu-item>
            <el-menu-item index="5-6" v-if="(getLoginState)&(!getSellerType)" v-on:click="shoppingCart">购物车</el-menu-item>
            <el-menu-item index="5-7" v-if="(getLoginState)&(getSellerType)" v-on:click="toShopOrder">商品订单</el-menu-item>
            <el-menu-item index="5-8" v-if="(getLoginState)&(!getSellerType)" v-on:click="toOrder">我的订单</el-menu-item>
            <el-menu-item index="5-9" v-if="getLoginState" v-on:click="onLogout">注销</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <el-footer class="footer">
        <el-backtop></el-backtop>
        <div style="text-align: center;color:#5a5959;margin-top: 35px">版权所有© why.js团队</div>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import ChangePhoto from "@/components/ChangePhoto";
import ChangeShopPhoto from "@/components/ChangeShopPhoto";

export default {
  name: "App",
  components:{ChangePhoto,ChangeShopPhoto},
  data() {
    return {
      activeIndex: "1",
      mark: true,
      photoFlag:false,
      shopPhotoFlag:false,
    }
  },
  computed: {
    // 计算属性的 getter
    getUsername: function () {
      // `this` 指向 vm 实例
      if(localStorage.getItem('username') == null){
        return "未登录";
      }else{
        return localStorage.getItem('username');
      }
    },
    getLoginState: function (){
      if(localStorage.getItem('username') == null){
        return false;
      }else{
        return true;
      }
    },
    getSellerType: function(){
      if(localStorage.getItem('type') == null){
        return false;
      }else{
        return true;
      }
    },
    getPhotoUrl:function(){
      if(this.getLoginState) {
        return localStorage.getItem('userPhotoUrl');
      }
      else{
        return "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      }
    }
  },
  methods: {
    toHome: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/home") {
        this.$router.push("/home");
      }
    },
    toShopOrder: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/ShopOrder") {
        this.$router.push("/ShopOrder");
      }
    },
    toIndex: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/index") {
        this.$router.push("/index");
      }
    },
    toSellerHome: function(){
      console.log(this.$route.path);
      if (this.$route.path !== "/seller") {
        this.$router.push("/seller");
      }
    },
    toLogin: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/login") {
        this.$router.push("/login");
      }
    },
    onLogout: function () {
      // if (this.$route.path !== "/login") {
      //   this.$router.push({name:"Login",params:{isReload: 'true'}});
      // }
      const _this = this;
      this.$axios.post('/login/logout',{},{
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        if(response.data.code == '503'){
          _this.$message({
            message: '您未登录！',
            type: 'success'
          });
        }else{
          if(response.data.code == '0'){
            if(localStorage.getItem('type') != null) {
              _this.mark = false;
            }
            let flag = false;
            _this.$store.commit('login', flag);
            localStorage.clear();
            console.log(_this.$route.path);
            _this.$message({
              message: '注销成功！',
              type: 'success'
            });
            if(_this.mark == false) {//商家
              _this.$router.push({name: 'Home', params: {isReload: 'true'}});
            }
            else {//买家
              _this.$router.go(0);
              _this.$router.push({name: 'Home', params: {isReload: 'true'}});
            }
          }
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    toRegister: function () {
      let flag = false;
      this.$store.commit('login', flag);
      localStorage.clear();
      console.log(this.$route.path);
      if (this.$route.path !== "/register") {
        this.$router.push({name:"Register",params:{isReload: 'true'}});
      }
    },
    changePhoto:function(){
      this.photoFlag = true;
    },
    shoppingCart:function(){
      this.$router.push({name:"member_shoppingCar",params:{isReload: 'true'}});
    },
    changeShopPhoto:function(){
      this.shopPhotoFlag = true;
    },
    toOrder: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/order") {
        this.$router.push("/order");
      }
    },
    toForum: function(){
      this.$router.push("/forum");
    }
  }
}
</script>

<style scoped>
.header, .footer, .main {
  padding: 0;
}

.main {
  min-height: calc(100vh - 121px)
}
</style>
