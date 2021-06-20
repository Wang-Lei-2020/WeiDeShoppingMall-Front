<template>
<div>
    <div>
    <el-container>
        <el-header>
        <el-menu router :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!-- 图标 -->
            <el-menu-item index="/" style="margin-left: 4%; border-bottom-color:#ffffff!important" >
            <img style="height: 50px;margin-right: 8%" src="@/assets/logo.png" alt="logo">未得商城论坛
            </el-menu-item>
            <!-- 首页 -->
            <el-menu-item index="/forum" style="margin-left: 4%">论坛首页</el-menu-item>
            <!-- 热点 -->
            <el-menu-item index="/forum/hot" style="margin-left: 4%">热点</el-menu-item>
            <!-- 个人头像 -->
             <el-submenu index="4" style="float: right;padding-right: 4%">
            <template slot="title">
              <el-avatar :src="getPhotoUrl"></el-avatar>
              {{getUsername}}
            </template>
            <el-menu-item index="4-1" v-if="!getLoginState"  v-on:click="toLogin">登录</el-menu-item>
            <el-menu-item index="4-2" v-if="!getLoginState" v-on:click="toRegister">注册</el-menu-item>
<!--  待解决          <el-menu-item index="3-3" v-if="getLoginState" v-on:click="toRegister">修改密码</el-menu-item>-->
            <el-menu-item index="4-3" v-if="getLoginState" v-on:click="toIndex">个人中心</el-menu-item>
            <el-menu-item index="4-4" v-if="(getLoginState)&(!getSellerType)" v-on:click="shoppingCart">购物车</el-menu-item>
            <el-menu-item index="4-5" v-if="(getLoginState)&(getSellerType)" v-on:click="toShopOrder">商品订单</el-menu-item>
            <el-menu-item index="4-5" v-if="(getLoginState)&(!getSellerType)" v-on:click="toOrder">我的订单</el-menu-item>
            <el-menu-item index="4-6" v-if="getLoginState" v-on:click="onLogout">注销</el-menu-item>
          </el-submenu>
            <!-- 发帖 -->
            <el-menu-item index="5" style="margin-right: 3%;float:right;border-bottom-color:#ffffff!important">
            <el-button type="primary" icon="el-icon-edit-outline" @click="tonewpost">去发帖</el-button>
            </el-menu-item>
            <!-- 搜索 -->
            <!-- <el-menu-item index="6" style="float:right;border-bottom-color:#ffffff!important">
                <el-input placeholder="请输入搜索内容"/>
            </el-menu-item> -->
        </el-menu>
        </el-header>
    </el-container>
    </div>
</div>
</template>
<script>
    export default {
      name: "Header",
      components:{
      },
      data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        mark: true,
      };
      },
      computed: {
        getPhotoUrl:function(){
          return localStorage.getItem('userPhotoUrl');
        },
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
        }
      },
      methods:{
        tonewpost: function(){
          this.$router.push("/newpost");
        },
        toinfo: function(){
          this.$router.push("/info");
        },
        handleSelect(tab, event) {
        console.log(tab, event);
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
        toOrder: function () {
          console.log(this.$route.path);
          if (this.$route.path !== "/order") {
            this.$router.push("/order");
          }
        },
        shoppingCart:function(){
          this.$router.push({name:"member_shoppingCar",params:{isReload: 'true'}});
        },

    },
    }
</script>
<style>
</style>
