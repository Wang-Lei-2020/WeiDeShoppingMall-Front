<template>
  <div>

    <el-dialog
        title="选择地址"
        :visible.sync="dialogVisible"

        width="40%">
      <BuyFormCart></BuyFormCart>
    </el-dialog>

    <body>
    <br>
    <div class="container clearfix">
      <div class="member_right">
        <div class="member_per">
          <div class="panel clearfix">
            <div class="panel-info clearfix">
              <a href=""><img class="round-image" width="50" height="50" :src="getPhotoUrl" alt="头像"></a>
              <div class="name-job">
                <h4 class="myname"> {{getUserName}} </h4>
                <p class="job-title">买家 </p>
              </div>
            </div>
            <div class="sign-wrap">
              <textarea id="signed_textarea" class="signed_textarea"  disabled autocomplete="off">想摸鱼</textarea>
              <em id="signed_edit" class="signed_edit"></em>
            </div>
            <p id="signed_error" class="signed_error"></p>
          </div>
        </div>
        <div class="member_per">
          <ul class="nav panel">
            <li>
              <a v-on:click="toShoucang"><i class="icon-nav icon-note"></i>我的收藏</a>
            </li>
            <li>
              <a v-on:click="toShoppingCart"><i class="icon-nav icon-plan"></i>购物车</a>
            </li>
            <li>
              <a v-on:click="toAddress"><i class="icon-nav icon-plan"></i>我的地址</a>
            </li>
            <li>
              <a v-on:click="toOrder" ><i class="icon-nav icon-ques"></i>历史订单</a>
            </li>
            <li>
              <a v-on:click="toSafe"><i class="icon-nav icon-ques"></i>安全中心</a>
            </li>
          </ul>
        </div>
        <div class="member_per">
          <ul class="space-data panel">

          </ul>
        </div>
      </div>
      <div class="member_main" id='member_index'>
        <div class="perInfo">
          <div class="titleInfoBorder">
            <span>购物车</span>

          </div>
        </div>
        <div class="infoPerBlock infoCommentBlock ">
          <div class="text_box">
            <ul class="y_adresslist clearfloat">
              <table id="mytable">
                <tr>
                  <th><el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></th>

                  <th style="padding-left: 25px">商品图片</th>
                  <th style="padding-left: 30px">商品名称</th>
                  <th style="padding-left: 35px">单价(元)</th>
                  <th style="padding-left: 50px">数量</th>
                  <th style="padding-left: 40px">金额(元)</th>
                  <th style="padding-left: 40px">操作</th>
                </tr>


                <tr  v-for="(cart,index) in cartList" :key="cart.userId"  >
                  <td><input type="checkBox" v-bind:checked="cart.selectTime" @click="cart.selectTime=!cart.selectTime"/></td>

                  <img style="width: 100px" :src="cart.url" >
                  <td>{{cart.name}}</td>
                  <td>{{cart.price}}</td>
                  <el-input-number  size="small" v-model="cart.selectNum" @change="handleChange(cart.sellerId,cart.commodityId,cart.selectNum)" :min="1" :max="20" ></el-input-number>
                  <td>{{cart.price*cart.selectNum}}</td>
                  <td><a href="#" @click="deletePro(index)">删除</a></td>
                </tr>


              </table>
              <div class="checkPro">
                <div class="leftConent">
                  <span><a href="#" @click="deleteProduct">删除所选产品</a></span>
                </div>
                <div class="rightConent">
                  <span>{{getTotal.totalNum}}件商品总计：￥{{getTotal.totalPrice}}</span>
                  <el-button type="primary" @click="dialogVisible=true">选择收货地址</el-button>
                  <el-button type="primary" @click="CheckOut">结算</el-button>
                </div>

              </div>

            </ul>

          </div>

          <div class="centerBlock">

          </div>
          <div class="rightBlock">
            <div id="clock" class="time" ></div>

            <br>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>



    </body>
  </div>
</template>

<script>
import BuyFormCart from "@/components/BuyFormCart";

export default {
  name: "member_shoppingCar",
  components:{BuyFormCart},
  data() {
    return {
      payList:{},
      cartList: {},
      deletList:{},
      totalcart: 10,
      pageNum: 1,
      pageSize: 25,
      dialogVisible: false,
      checkAll:false,
      obj:{
        userId:"",
        commodityId:"",
      },
    }
  },
  //页面初始化完成后要加载的东西
  created() {
    this.getcartList();
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
  },
  computed:{
    // 检测是否全选
    isSelectAll:function(){
      //如果productList中每一条数据的select都为true,就返回true,否则返回false
      return this.cartList.every(function(val){return  val.selectTime})
    },

    // 获取总价和产品总数
    getTotal:function(){
      // 获取list中select为true的数据
      var _proList = this.cartList.filter(function(val){return val.selectTime}),
          totalPrice = 0;
      for (var i = 0; i < _proList.length; i++) {
        // 总价累加
        totalPrice += _proList[i].selectNum * _proList[i].price;
      }
      // 选择产品的件数就是_proList.lenth，总价就是totalPrice
      return{totalNum:_proList.length,totalPrice:totalPrice}
    },
    getPhotoUrl:function(){
      return localStorage.getItem('userPhotoUrl')
    },
    getUserName:function(){
      return localStorage.getItem('username')
    }

  },
  methods: {
    toShoppingCart:function(){
      console.log(this.$route.path);
      if (this.$route.path !== "/shoppingCart") {
        this.$router.push("/shoppingCart");
      }
    },
    toAddress: function () {
      // beforeDestroy()
      console.log(this.$route.path);
      if (this.$route.path !== "/address") {
        this.$router.push("/address");
      }
    },
    toOrder: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/order") {
        this.$router.push("/order");
      }
    },
    toShoucang: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/shoucang") {
        this.$router.push("/shoucang");
      }
    },
    toSafe: function () {
      console.log(this.$route.path);
      if (this.$route.path !== "/safe") {
        this.$router.push("/safe");
      }
    },
    handleCheckAllChange: function(){
      if(this.checkAll == true) {
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartList[i].selectTime = true;
        }
      }
      else{
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartList[i].selectTime = false;
        }
      }
    },
    getcartList: function () {
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('userId',localStorage.getItem('userId'))
      this.$axios.post('/cart/cartInfo', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.cartList = response.data.data.list;
        _this.totalcart = response.data.data.total;
        _this.pageNum = response.data.data.pageNum;

        for (let i = 0 ; i<_this.cartList.length ; i++){
          _this.cartList[i].selectTime = false;
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },

    postcartList: function (index) {
      const _this = this;
      _this.obj.userId = localStorage.getItem('userId');
      _this.obj.commodityId = _this.cartList[index].commodityId;

      this.$axios.post('/cart/deleteSelected', [_this.obj], {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        // 这里是处理正确的回调

      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getcartList();
    },

    postcartList2: function () {
      const _this = this;
      _this.optionList = new Array(_this.deletList.length);

      for (let i = 0; i < _this.deletList.length; i++) {
        let obj = {
          userId:"",
          commodityId:""
        }
        obj.userId = localStorage.getItem('userId');
        obj.commodityId = _this.deletList[i].commodityId;
        _this.optionList[i] = obj;
      }
      this.$axios.post('/cart/deleteSelected', _this.optionList, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        // 这里是处理正确的回调
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    postpay: function () {
      const _this = this;
      _this.optionList1 = new Array(_this.payList.length);
      for (let i = 0; i < _this.payList.length; i++) {
        let obj1 = {
          userId:"",
          commodityId:"",
          sellerId:"",
          payId:"",
          addressId:"",
          price:""
        }
        obj1.userId=localStorage.getItem('userId');
        obj1.commodityId=_this.payList[i].commodityId;
        obj1.sellerId=_this.payList[i].sellerId;
        obj1.payId=localStorage.getItem('payId');
        obj1.addressId=localStorage.getItem('addressId')
        obj1.price=_this.payList[i].price;
        _this.optionList1[i]=obj1;
      }
      this.$axios.post('/order/pay', _this.optionList1, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        // 这里是处理正确的回调
        this.$message({
          message : "购买成功！",
          type: 'success'
        })
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    handleClose(done) {
      this.getcartList();
      done();
    },
    handleChange(sellerId,commodityId,selectNum) {
      const _this = this;
      let formData = new FormData;
      formData.append('userId',localStorage.getItem('userId'));
      formData.append('sellerId',sellerId);
      formData.append('commodityId',commodityId);
      formData.append('selectNum',selectNum);

      this.$axios.post('/cart/modifyCart', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        // 这里是处理正确的回调
        _this.getcartList();
        //_this.$router.go(0);
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    deletePro : function(index){
      this.postcartList(index);
      this.cartList.splice(index,1);
    },
    deleteProduct:function () {
      this.deletList=this.cartList.filter(function (cart) {return cart.selectTime});
      this.cartList=this.cartList.filter(function (cart) {return !cart.selectTime})
      this.postcartList2();
    },
    CheckOut:function (){
      this.payList=this.cartList.filter(function (cart) {return cart.selectTime});
      this.deletList=this.cartList.filter(function (cart) {return cart.selectTime});
      this.cartList=this.cartList.filter(function (cart) {return !cart.selectTime})
      this.postpay();
    },
  }
}
</script>


<style scoped>
table{width: 800px;}
table th{width: 100px}
table td{width: 200px;text-align: center;}
a{text-decoration:none;color: black}
span{font-size: 20px;margin: 10px 10px}
strong{border: 1px solid;}
.checkPro{
  background-color: gray;
}
.leftConent {
  float: left;
}
.rightConent{
  float: right;
}

a:link, a:visited {
  color: #5188a6;
}
.l {
  float: left;
}
.r {
  float: right;
}
@font-face {
  font-family: 'icomoon';

  font-weight: normal;
  font-style: normal;
}
[class^="icon-"],
[class*=" icon-"] {
  font-family: 'icomoon';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-stroke-width: 0.2px;
}
.icon-tick:before {
  content: "\e600";
}

.icon-clock:before {
  content: "\e602";
}
.icon-chat:before {
  content: "\e603";
}
.icon-msg:before {
  content: "\e604";
}

.icon-user:before {
  content: "\e607";
}

.icon-plan:before {
  content: "\e609";
}
.icon-note:before {
  content: "\e60a";
}

.icon-ques:before {
  content: "\e615";
}

.icon-code:before {
  content: "\e61b";
}
ul.space-data {
  padding: 20px;
  color: #60686b;
}
.space-data li,
.space-item li {
  height: 28px;
  line-height: 28px;
  position: relative;
  padding-left: 22px;
  font-size: 12px;
}
.space-data li a,
.space-item li a {
  color: #60686b;
}
.space-data li a:hover,
.space-item li a:hover {
  color: #c9394a;
  text-decoration: underline;
}
ul.space-data .icon,
.space-item .icon {
  position: absolute;
  left: 0;
  top: 8px;
  font-size: 15px;
  *top: 7px;
}
ul.space-data .icon-clock,
.space-item .icon-clock {
  *background-position: 0 0;
}
ul.space-data .icon-tick,
.space-item .icon-tick {
  *background-position: 0 -36px;
}
ul.space-data .icon-ques,
.space-item .icon-ques {
  *background-position: 0 -72px;
}
ul.space-data .icon-chat,
.space-item .icon-chat {
  *background-position: 0 -108px;
}
ul.space-data .icon-note,
.space-item .icon-note {
  *background-position: 0 -143px;
}
ul.space-data .icon-code,
.space-item .icon-code {
  *background-position: 0 -178px;
}
.container{margin-top: 20px;}
.member_right{width:220px;float:left}
.member_per{background-color: #FFFFFF;background: #ffffff;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);}
.panel {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #14191e;
  margin-bottom: 20px;
  padding: 15px 20px;
}

.myname {
  color: #363d40;
  font-size: 16px;
  font-weight: normal

}

.job-title {
  line-height: 22px;
  margin-top: 3px;
  font-size: 12px;color:#999;
}
.name-job{float:left;margin-top: -2px;width:121px}

.sign-wrap{position: relative}
.signed_edit {

  bottom: 4px;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  position: absolute;
  right: 0;
  width: 20px;
}
.signed_textarea {
  border: 1px solid transparent;
  font-size: 12px;
  height: 40px;
  line-height: 20px;
  margin: 0;
  resize: none;
  width: 156px;
  margin: 10px 0;
  color: #99a1a6;
  background-color: #FFF;
  overflow: auto
}
.signed_error{color:red;font-size: 12px;}
.member_main{
  background: none repeat scroll 0 0 #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px 20px 20px 20px;
  width: 825px;
  position: relative;
  float:left
}


.perInfo .titleInfoBorder {
  margin-bottom: 10px;
}
.titleInfoBorder {
  border-bottom: 1px solid #dcdcdc;
  height: 40px;
  margin-bottom: 20px;
  position: relative;
}

.titleInfoBorder span {
  display: block;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
}

.titleInfoBorder a.want {
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 4px;
  height: 26px;
  line-height: 26px;
  margin-top: 3px;
}

.infoCommentBlock {
  padding: 20px 0;
  border-bottom: 1px dashed #e5e5e5;
  overflow: hidden
}
.infoCommentBlock.last,.infoPerBlock.last{
  border-bottom: none
}

.infoCommentBlock .leftPicBlock, .infoCommentBlock .leftPicBlock a {
  display: block;
  height: 36px;
  width: 36px;
}
.leftPicBlock {
  float: left;
  text-align: center;
  width:50px;
  overflow: hidden;
}
.infoCommentBlock .leftPicBlock img {
  border-radius: 100%;
  height:36px;width:36px;
}

.infoCommentBlock .centerBlock {
  font-size: 12px;
  width: 557px;
}
.centerBlock {
  float: left;
  line-height: 22px;
  padding-left: 10px;
}

.infoCommentBlock span.title {
  color: #888;
  display: inline-block;
  margin-bottom: 5px;
}

span.title a.blue:link, span.title a.blue:visited {
  color: #5188a6;
  text-decoration: none;
}
.infoCommentBlock .centerBlock a.blue {
  font-weight: bold;
  padding-right: 5px;
}

.infoCommentBlock .infoNews {
  color: #555;
}
.infoNews, .infoWords {
  color: #888;
  font-size: 12px;
  line-height: 1.6em;
  margin-bottom: 5px;
}

.infoCommentBlock .infoNews p {
  color: #555;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
}

.objectBlock {
  border: 1px solid #e6e6e6;
  display: block;
  height: 56px;
  overflow: hidden;
  padding: 10px;
  width: 585px;
}

.objectBlock .pic, .relaObj .pic {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  display: block;
  float: left;
  height: 50px;
  padding: 2px;
  text-align: center;
  width: 50px;
}


.objectBlock .objTitle, .relaObj .objTitle {
  display: inline-block;
  font-size: 14px;
  margin-bottom: 4px;
  padding-left: 10px;
  width: 515px;
}

.rightBlock {
  float: right;
  text-align: right;
  width: 100px;
}

.infoCommentBlock .time {
  height: auto;
  line-height: 22px;
  margin-bottom: 4px;
}
.rightBlock .time {
  height: 26px;
  line-height: 26px;
}
.rightBlock .time {
  color: #999;
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
}

.clear {
  clear: both;
  font-size: 0;
  height: 0;
  overflow: hidden;
}

.myspace-list {
  position: absolute;
  left: -50px;
  top: 0;
  width: 50px;
  z-index: 99;
}



.myspace-list a {
  display: block;
  height: 50px;
  margin-bottom: 1px;
  position: relative;
  width: 50px;
}

.myspace-list a span {

  color: #ffffff;
  display: none;
  height: 29px;
  left: 60px;
  line-height: 25px;
  position: absolute;
  text-indent: 21px;
  top: 12px;
  width: 67px;
  z-index: 99;
}
.myspace-list a:hover span {
  display: block;
}

.myspace-courselist {
  background: none repeat scroll 0 0 #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  width: 870px;
}
#courseSelect {
  color: #656e73;
  font-family: "Microsoft Yahei","Hiragino Sans GB",Helvetica,"Helvetica Neue","微软雅黑",Tahoma,Arial,sans-serif;
  font-size: 12px;
  margin-top: 11px;
}
p.tags a {
  background-color: #cbcbcb;
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  margin-left: 6px;
  padding: 2px 6px;
  text-decoration: none;
}

.main-user {
  height: 236px;
}

.main-user .avatar img {
  border-radius: 100px;
  left: 24px;
  position: absolute;
  top: 24px;
}
.main-user .profile {
  color: #ffffff;
  padding: 30px 0 0;
  position: relative;
  width: 828px;
}
.main-user .profile h4 {
  color: #ffffff;
  font-size: 28px;
  line-height: 24px;
  font-weight: normal

}
.main-user .profile h4 a {
  margin-left: 10px;
}
.main-user .profile .icon {

  width: 24px;
}
.main-user .icon-teacher {

  display: inline-block;
  height: 24px;
  position: relative;
  width: 24px;
}
.main-user .icon-teacher i {

  display: none;
  height: 22px;
  left: -16px;
  position: absolute;
  top: -25px;
  width: 57px;
}
.main-user .icon-teacher:hover i {
  display: block;
}
.main-user .aboutme {
  color: #d6d8d9;
  margin-top: 25px;
  overflow: hidden;
  white-space: pre-wrap;
  width: 520px;
  word-wrap: break-word;
}
.main-user .aboutjob {
  color: #ffffff;
  font-size: 14px;
  line-height: 40px;
}
.main-user .web {
  position: absolute;
  right: 30px;
  top: 50px;
}
.main-user .web li {
  float: left;
  height: 20px;
  margin: 0 5px;
}
.main-user .web .icon {
  height: 20px;
  text-indent: -9999em;
  width: 20px;
}
.main-user .web .icon-wb {
  background-position: 0 0;
}
.main-user .web .icon-wb:hover {
  background-position: -35px 0;
}
.main-user .web .icon-qwb {
  background-position: 0 -35px;
}
.main-user .web .icon-qwb:hover {
  background-position: -35px -35px;
}
.main-user .web .icon-qq {
  background-position: 0 -71px;
}
.main-user .web .icon-qq:hover {
  background-position: -35px -71px;
}
.main-user .web .icon-qzone {
  background-position: 0 -106px;
}
.main-user .web .icon-qzone:hover {
  background-position: -35px -106px;
}
.main-user .btn {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding: 0 33px 0 53px;
  position: absolute;
  right: 30px;
  top: 125px;
  color:#FFF;
  font-weight: normal
}
.profile a:hover{
  text-decoration: none
}
.main-user .btn .icon {
  height: 20px;
  left: 28px;
  margin-top: -10px;
  position: absolute;
  top: 50%;
  width: 20px;
}
.main-user .add-frd .icon {
  background-position: 0 -213px;
}
.main-user .send-msg {
  background-color: rgba(46, 167, 224, 0.5);
}
.main-user .send-msg:hover {
  background-color: #2ea7e0;
}
.main-user .send-msg .icon {
  background-position: 0 -246px;
}
.main-user .profile h4 a:hover span {
  color: #b4bbbf;
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
}
.bodybg {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.main-aside {
  width: 260px;
}
.main-aside .main-hd h3 {
  font-size: 14px;
  padding: 0;
}
.space-course .icon {
  display: inline-block;
  height: 16px;
  width: 16px;
}
ul.space-data {
  color: #60686b;
  padding: 20px;
}
.space-data li, .space-item li {
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  padding-left: 22px;
  position: relative;
}
.space-data li a, .space-item li a {
  color: #60686b;
}
.space-data li a:hover, .space-item li a:hover {
  color: #c9394a;
  text-decoration: underline;
}
ul.space-data .icon, .space-item .icon {
  font-size: 15px;
  left: 0;
  position: absolute;
  top: 8px;
}
ul.space-data .icon-clock, .space-item .icon-clock {
}
ul.space-data .icon-tick, .space-item .icon-tick {
}
ul.space-data .icon-ques, .space-item .icon-ques {
}
ul.space-data .icon-chat, .space-item .icon-chat {
}
ul.space-data .icon-note, .space-item .icon-note {
}
ul.space-data .icon-code, .space-item .icon-code {
}
.space-visitors li {
  border-bottom: 1px solid #edf1f2;
  min-height: 35px;
  padding: 15px 0 15px 50px;
  position: relative;
}
.space-visitors li p {
  color: #787d82;
  font-size: 12px;
  height: 14px;
  line-height: 14px;
  margin-top: -5px;
}
.space-visitors li:last-child {
  border-bottom: 0 none;
}
.space-visitors .avatar {
  border-radius: 20px;
  display: block;
  height: 40px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 10px;
  width: 40px;
}
.space-visitors .nickname {
  display: block;
  max-height: 42px;
  overflow: hidden;
  position: relative;
  top: -5px;
}
.space-visitors .nickname:hover {
  text-decoration: underline;
}
.mymain-content {
  position: relative;
  width: 960px;
}
.studyright {
  margin-bottom: -4000px;
  padding-bottom: 4000px;
}
.space-menu {
  border-bottom: 1px solid #d1d6da;
  height: 50px;
  line-height: 50px;
}
.space-menu li {
  color: #60686b;
  float: left;
  height: 100%;
  text-align: center;
  width: 120px;
}
.space-menu a {
  display: block;
  font-size: 14px;
  height: 100%;
}
.space-menu a span {
  display: block;
  height: 16px;
  line-height: 16px;
  position: relative;
  top: 19px;
}
.space-menu a.active, .space-menu a:hover {
  border-bottom: 2px solid #c9394a;
  color: #c9394a;
  height: 50px;
  text-decoration: none;
}
.container_profile {
  color: #656e73;
  width: 1100px;
  margin:0 auto
}

.mp-uspace {
  margin-top: 10px;
  position: relative;
}
.mp-uspace .mp-num {
  color: #ffffff;
  padding: 0 18px 0 3px;
}
.mp-num {
  color: #364247;
  font-size: 16px;
  font-weight: bolder;
}

.mp-uspace .mp-title {
  color: #a5abac;
}
.mp-title {
  color: #969b9e;
  font-size: 12px;
}

.firstTabBox {
  color: #666;
  font-size: 12px;
  height: 26px;
  position: relative;
  width: 100%;
}

.firstTabBox .currentTab {
  color: #333;
  font-weight: bold;
  padding-bottom: 10px;
}
.firstTabBox span,.firstTabBox a{
  cursor: pointer;
  display: inline-block;
  padding-right: 20px;
}

.lineSpace span.line {
  margin: 0 15px;
}

.setting-right-wrap {
  min-height: 600px;
  padding: 30px 60px;
  position: relative;
}

.setting-profile {
  padding: 25px 0 20px 5px;
}
.wlfg-wrap{
  margin-bottom: 30px
}
.wlfg-wrap .label-name {
  color: #656e73;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  width: 120px;
  display: inline-block;
  margin-right: 20px;

}
.wlfg-wrap .label {
  color: #656e73;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  width: 120px;
  display: inline-block;
  margin-right: 20px;

}
.wlfg-wrap .label_right {
  color: #656e73;
  font-size: 14px;
  height: 40px;
  line-height: 40px;

  width: 160px;
  display: inline-block;

}
.wlfg-wrap .label_signature {
  vertical-align: top
}


.wlfg-wrap .rlf-group {
  margin-left: 130px;
}

.setting-profile .rlf-input {
  width: 360px;
  color:#555
}
.rlf-input {

  border: 1px solid #d0d6d9;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  padding: 7px 7px 7px 48px;
  transition: padding 0.15s ease 0s;
  width: 260px;
}
.rlf-input-nick {
  background-position: -80px -726px;
}


.setting-profile .rlf-select {
  width: 415px;
}
.rlf-select {
  border: 1px solid #d0d6d9;
  display: inline-block;
  font-size: 14px;
  height: 38px;
  outline: medium none;
  padding: 7px;
  transition: border-color 0.2s ease 0s;
  width: 315px;
}
select {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #555;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 4px 6px;
  vertical-align: middle;
}

.rlf-radio-group input {
  display: inline-block;
  vertical-align: middle;
}

.textarea {
  border: 1px solid #d0d6d9;
  font-size: 14px;
  line-height: 1.6em;
  padding: 7px;
  resize: none;
  transition: border-color 0.2s ease 0s;
  width: 400px;
  color:#999;
  font-size: 12px;
}



.file {
  position: relative;
  display: inline-block;
  background: #D0EEFF;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #AADFFD;
  border-color: #78C3F3;
  color: #004974;
  text-decoration: none;
}
.setting-bindsns-inner {
  padding-top: 60px;
}

.setting-bindsns-inner div {
  margin: 0 30px;
  text-align: center;
}
.setting-bindsns-inner i {
  color: #d0d6d9;
  display: inline-block;
  font-size: 80px;
  height: 80px;
  margin-bottom: 20px;
  width: 80px;
}

.btn-green{
  background-color: #39b94e;
  display: inline-block;

  cursor: pointer;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  transition: background-color 0.2s ease 0s;
  width: 160px;
}
.btn-green:hover {
  background-color: #33a646;
  text-decoration: none
}
.setting-bindsns-inner .btn-green {
  color: #FFF;
  margin-top: 50px;
}

.infoPerBlock {
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
  padding: 16px 0 12px;
}
.centerBlock p.tags a {
  margin: 0 6px 0;
}
.infoNoData {
  padding: 50px 0 300px;
  text-align: center;
}
#member_index .infoNoData{
  padding: 50px 0;
}
.table_sign{
  background:#ffffff; margin:30px 0; text-align:center; border:1px solid #D9D9D9;line-height:38px;
  border-spacing:2px;border-collapse:separate;width:100%
}
.table_sign thead tr{
  color:black; background:#EEEEEE;
}
.table_sign tbody tr{
  height:80px;
}
.table_sign th{
  font-weight: normal
}
.table_sign td{
  width:90px
}
.today{
  background-color:#00bb00;
  cursor:pointer;
}

.tishi {
  background-color: #ffffe1;
  border: 1px solid #ffcc81;
  color: #ff6600;
  line-height: 26px;
  margin: 10px 0;
  overflow: hidden;
  padding: 6px 10px;
}

.tishi_text {
  color: #ff0000;
}

.tishi_span {
  color: #ff0000;
  font-weight: bold;
}

.rank-points {
  border-top: 1px solid #d0d6d9;
  margin-top: 15px;
}
.mp-item {
  padding-top: 8px;
  position: relative;
  text-align: center;
  width: 100%;
}

.mp-atag span {
  display: block;
  text-align: center;
}
.mp-title {
  color: #969b9e;
  font-size: 12px;
}
.mp-num {
  color: #364247;
  font-size: 16px;
  font-weight: bolder;
}
.mp-atag:hover{text-decoration: none}
.table_member {
  width:100%
}
.table_member tr {
  border-bottom: 1px solid #eff0f1;
  height: 55px;
}
.red,.error{color:red}.green{color:green}
.binded-weibo i, .binded-weibo p {
  color: #df7c87;
}
.binded-qq i, .binded-qq p {
  color: #65aede;
}

.member_per .nav li {
  border-bottom: 1px solid #edf1f2;
  height: 60px;
}

.member_per .nav a {
  color: #14191e;
  font-size: 14px;
  font-weight: bold;
  line-height: 60px;
  text-decoration:none
}

.member_per .nav .got-num {
  font-size: 12px;
  padding-left: 5px;
}
.member_per .nav a i{ margin-right:10px}
.member_per .nav .icon-nav {
  font-size: 18px;
}
.member_per .nav a:hover, .member_per .nav a.active {
  color: #f01400;
}
.myquelist {
  padding-left: 10px;
  padding-right: 10px;
}
.wenda-listcon {
  border-bottom: 1px solid #e3e5e5;
  padding: 20px 0;
  position: relative;
}

.wendaslider {
  min-height: 85px;
  padding: 10px 103px 0 0;
  position: relative;
  word-break: break-all;
  word-wrap: break-word;
}

.wendaslider .replynumber {
  color: #787d82;
  font-size: 12px;
  height: 51px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 10px;
}

.hasanswernum .ys {
  color: #00b33b;
}
.ys, .browsenum {
  float: left;
  height: 31px;
  margin: 10px 0;
  width: 50px;
}

.wendaslider .replynumber .number {
  height: 12px;
  line-height: 12px;
  padding-bottom: 7px;
}

.wendaslider .replynumber  {
  line-height: 12px;
}
.hasanswernum .ys {
  color: #00b33b;
}

.wendaslider .replynumber  {
  height: 12px;
  line-height: 12px;
  padding-bottom: 7px;
}

.wendaslider .replynumber .number {
  line-height: 12px;
}

.wendaslider  {
  color: #363d40;
  font-size: 14px;
  line-height: 20px;
  position: relative;
}
.wendaslider .wendaquetitle  {
  color: #0088cc;
}




.wendaslider .wendaquetitle  {
  font-weight: bold;
  line-height: 20px;
  padding-left: 8px;
}


.replymegfooter .keyword-list, .replymegfooter .wenda-time {
  float: left;
  margin-right: 20px;
}

.replymegfooter .keyword-list, .replymegfooter .wenda-time {
  float: left;
  margin-right: 20px;
}


p,ul,li,h1,h2,h3,h4,body,dd,dt,dl,blockquote{margin:0; padding:0}
img{border:0}
li{list-style-type:none}
a{color:#555; font-size:12px; cursor:pointer; text-decoration:none}
a:hover{color:#ff8400; text-decoration:underline}
table{empty-cells:show; border-collapse:collapse; border-spacing:0}
.clearfix:after{visibility:hidden; display:block; font-size:0; content:" "; clear:both; height:0}
*:first-child+html .clearfix{zoom:1}
em{font-style:normal}
.orange{color:#f63}
body{font:12px/1.5 "Hiragino Sans GB","Microsoft YaHei",simsun; font-size:13px; color:#211922; background-color:#ebebeb}

.round-image{width:50px; height:50px; float:left; margin-right:9px; -webkit-transition:all .3s ease-in; -moz-transition:all .3s ease-in; transition:all .3s ease-in; border-radius:30px; -moz-border-radius:30px; -webkit-border-radius:30px}
.pager{text-align:center; padding:20px 0}
.pager a{padding:3px 8px; margin-left:7px; line-height:20px; background:#f9f9f9; border:1px solid #dbdbdb; text-decoration:none; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; color:#333}
.pager a:hover,.pager a.current{background-color:#f60; color:#fff; border:1px solid #f60; cursor:pointer}
.no_result{padding:25px 0; text-align:center}
.no_result p.words{color:#333; font-size:18px; line-height:38px}
.no_result p.words em{color:#ff8400}
#container,.search_result{width:1100px; margin:12px auto 0; background-color:#fff; border:1px solid #dcdcdc}
.container{width:1100px; margin:0 auto 0}
.search_result{font-size:16px; padding:10px 0 10px; text-indent:10px}
.search_result strong{color:#ff8400; font-weight:normal}
#site_nav{background-color:#FFF; border-bottom:1px solid #eee; color:#484848; height:30px; line-height:30px}
#site_nav .sn_container{width:1100px; margin:0 auto}
#site_nav .sn_container .sn_login,.head_pay_btn{color:#f60}
#site_nav .tg_tools{position:relative; z-index:999}
#site_nav .tg_tools .collect{color:#333}
#site_nav .tg_tools li{float:left; padding-right:10px; line-height:32px; cursor:pointer; position:relative; height:30px; z-index:999; overflow:hidden; color:#666}
#site_nav .tg_tools li span{padding:0 3px}
#site_nav .tg_tools li span a{color:#666}
#site_nav .tg_tools li span a:hover{color:#38b; text-decoration:none}
#site_nav .tg_tools li b{transform:rotate(0deg); -webkit-transform:rotate(0deg); -o-transform:rotate(0deg); -moz-transform:rotate(0deg); -ms-transform:rotate(0deg); transform-origin:50% 20%; -ms-transform-origin:50% 20%; -webkit-transform-origin:50% 20%; -moz-transform-origin:50% 20%; -o-transform-origin:50% 20%; transition:transform .2s linear; -webkit-transition:-webkit-transform .2s linear; -moz-transition:-moz-transform .2s linear; -o-transition:-o-transform .2s linear; background-position:-5px -5px; background-repeat:no-repeat; overflow:hidden; display:block; width:7px; height:4px; display:inline-block!important; vertical-align:middle; padding-bottom:2px}
#site_nav .tg_tools li:hover{text-decoration:none; border:1px solid #dedede; border-top:0; border-bottom:0; overflow:visible; margin-right:-1px; padding-right:10px; margin-left:-11px; padding-left:10px; z-index:1000; height:31px; margin-bottom:-1px}
#site_nav .tg_tools li.box_color:hover{background-color:#fff}
#site_nav .tg_tools li:hover b,.tg_tools li.hover b,.tg_tools li:hover span,.tg_tools li.hover span{position:relative; z-index:1001}
#site_nav .tg_tools li:hover ul,.tg_tools li.hover ul{*display:block; *width:85px; height:auto; overflow:hidden; opacity:1; filter:Alpha(opacity=100); transition:opacity .4s linear; -webkit-transition:opacity .4s linear; -moz-transition:opacity .4s linear; -o-transition:opacity .4s linear}
#site_nav .tg_tools li.nav_home:hover ul,.tg_tools li.nav_home.hover ul{*width:81px}
#site_nav .tg_tools li:hover ul li,.tg_tools li.hover ul li{border:0; margin-top:0; transition:margin-top .2s linear; -webkit-transition:margin-top .2s linear; -moz-transition:margin-top .2s linear; -o-transition:margin-top .2s linear}
#site_nav .tg_tools li:hover b,.tg_tools li.hover b{transform:rotate(-180deg); -webkit-transform:rotate(-180deg); -o-transform:rotate(-180deg); -moz-transform:rotate(-180deg); -ms-transform:rotate(-180deg); transform-origin:50% 20%; -ms-transform-origin:50% 20%; -webkit-transform-origin:50% 20%; -moz-transform-origin:50% 20%; -o-transform-origin:50% 20%; transition:transform .2s linear; -webkit-transition:-webkit-transform .2s linear; -moz-transition:-moz-transform .2s linear; -o-transition:-o-transform .2s linear}
#site_nav .tg_tools li.no-hover{border:0; margin-right:0; padding-right:10px; padding-left:0; margin-left:0; height:30px}
#site_nav .tg_tools li ul{position:relative; display:block; height:0; overflow:visible; *display:none; opacity:0; filter:Alpha(opacity=0); background-color:#fff; border:1px solid #dedede; width:auto; margin:0 -11px; margin-bottom:-100%; border-top:0; z-index:1000; padding-bottom:5px; margin-top:-2px}
#site_nav .tg_tools li ul li{float:none; line-height:30px; border:0; margin:0; margin-top:-20px; zoom:1; height:30px; width:100%}
#site_nav .tg_tools li ul li:hover{margin:0; padding:0; height:30px}
#site_nav .tg_tools li ul li a{text-indent:10px; line-height:24px; float:left; display:block; width:100%; margin-top:3px}
#site_nav .tg_tools li ul li a:hover{margin:0; margin-top:3px; width:100%; background-color:#f2f2f2; color:#38b; text-decoration:none; transition:background-color .1s linear; -webkit-transition:background-color .1s linear; -moz-transition:background-color .1s linear; -o-transition:background-color .1s linear}
#site_nav .tg_tools li.tg-line{background-position:-5px -126px; background-repeat:no-repeat; overflow:hidden; display:block; width:1px; height:14px; padding:0!important; padding-right:10px!important; margin:0!important; margin-top:9px!important; border:none!important; cursor:default}

#site_nav .tg_tools li.tg_tools_home{color:#f63}
#header{background-color:#fff; padding-bottom:12px}
#header .tg_tools_home{margin:0 auto; width:1100px; height:80px}
#header .logo{width:272px; float:left; margin-top:8px}
#header .bbs_enter{float:right; overflow:hidden; margin:12px 0 0}
#search{width:466px; margin:17px 0 0 10px; float:left; position:relative}
#search .search_area{height:33px; line-height:33px; border:2px solid #ff8400; font-size:15px}
#search .search_area .search_input{height:31px; width:303px; margin-left:5px; border:0; font-family:"微软雅黑"; outline:0; line-height:31px; float:left; color:#999; *height:30px}
#search .search_area .btn_search{background-color:#ff8400; border:0; color:#FFF; width:86px; height:33px; vertical-align:top; font-family:"微软雅黑"; float:right; outline:0; cursor:pointer}
#search .search_keywords{height:22px; margin-top:5px; overflow:hidden}
#search .search_keywords a,#search .search_keywords span{color:#666}
#search .search_keywords a{margin-right:10px}
#search .search_keywords a.red{color:red}
.search_box{background-color:#fff; border:1px solid #e3e3e3; left:0; position:absolute; top:37px; width:464px; z-index:100}
.search_box a{color:#333; cursor:pointer; display:block; line-height:30px; padding:0 12px}
.search_box a:hover,.search_box a.on{background-color:#eaeaea; color:#38b; text-decoration:none}
.search_box a em{color:#ff8400}
.search_box a .tips{color:#999; float:right; font-size:12px; line-height:30px; padding-left:10px}
#nav{background-color:#ff8400; height:38px; line-height:38px}
#nav .nav_main{width:1100px; margin:0 auto; position:relative}
#nav .nav_main a{width:115px; height:100%; display:block; font-size:16px; color:#FFF; text-align:center; float:left; transition:background-color .2s linear 0s}
#nav .nav_main a.current,#nav .nav_main a:hover{background-color:#e95a00; text-decoration:none}
.tg_classify{position:relative; width:1100px; margin:12px auto 0; background-color:#FFF; border:1px solid #eaeaea}
.tg_classify .tg_tab_box{border-top:1px solid #eaeaea}
.tg_tab_box{border:1px solid #eaeaea; overflow:hidden}
.tg_classify .tg_tab_box .tg_classify_wrap:first-child{border-top:0}
.tg_classify .tg_tab_box .tg_classify_wrap{border-top:1px solid #eaeaea; margin:0 0 0 15px; padding:15px 0}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat{line-height:27px; position:relative}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dt{border-right:1px solid #eaeaea; color:#333; font-size:13px; height:27px; text-indent:26px}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat.tg_classify_all dt i{background-position:-5px -334px; background-repeat:no-repeat; display:block; height:13px; overflow:hidden; top:6px; width:13px}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dt i{left:0; margin-right:10px; position:absolute}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd{color:#333; float:left; height:27px; text-align:center; vertical-align:middle; width:90px}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd.on a,.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd a:hover{background-color:#38b; color:#fff!important}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd a{color:#333; display:inline; height:20px; line-height:20px; padding:4px 8px; text-decoration:none}
.tg_classify .dl_left{width:88px; float:left}
.tg_classify .dl_right{width:995px; float:left}
.tg_sort{background-color:#f9f9f9; border-bottom:1px solid #eaeaea; position: relative}
.tg_sort .tg_classify_wrap{float:left}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle{height:38px; margin:-1px -1px -2px 0; overflow:hidden; padding:0 15px 0 18px; position:relative; border-right:1px solid #eaeaea}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt,.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt{font-size:12px; height:38px; line-height:38px; text-align:center}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt a{color:#333; display:block; height:38px; text-decoration:none}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt a span{color:#333; padding:0 5px 0 3px; font-weight:normal}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt a b{background-position:-5px -83px; background-repeat:no-repeat; display:inline-block!important; height:8px; overflow:hidden; padding-bottom:2px; vertical-align:middle; width:8px}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt.on span,.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt span:hover{color:#38b}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt.on a b{background-position:-5px -65px; background-repeat:no-repeat; display:inline-block!important; height:8px; overflow:hidden; padding-bottom:2px; vertical-align:middle; width:8px}

.tg_sort .tg_classify_wrap .tg_classify_simplecheck{height:38px; padding:0 0 0 30px}
.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt a{text-decoration:none}
.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt a i{background-position:-5px -427px; background-repeat:no-repeat; display:inline-block!important; height:14px; overflow:hidden; vertical-align:-9%; width:14px; margin-right:1px}
.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt.on a i{background-position:-5px -475px}
.list{position:relative}
.list .list_main{margin:15px 8px 0 8px}
.list .list_main .per{background-color:#fff; border:1px solid #ddd; float:left; margin:0 12px 15px 0; width:260px; position:relative}
.list .list_main .per:hover{border-bottom:1px solid #4ba6e5; box-shadow:0 0 10px rgba(0,0,0,0.2)}
.list .img_link{height:350px; width:260px; display:block; text-align:center; overflow:hidden; vertical-align:middle}
.list .img_link img{vertical-align:middle}
.list .foot{border-top:1px solid #f2f2f2}
.list .foot p.title{height:22px; line-height:22px; margin:4px 0 3px}
.list .foot p.tags{height:22px; margin:0 0 6px; overflow:hidden}
/*.list .foot p.tags a{display:inline-block; margin-left:6px; padding:2px 6px; background-color:#cbcbcb; color:#fff; text-decoration:none; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px}*/
.list .foot p.title a{margin-left:10px; width:242px; display:block; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
.list .foot .statics{border-top:1px solid #f2f2f2; padding:6px 0 6px 10px; height:18px; color:#999;white-space: nowrap;overflow: hidden}
.list .foot .statics .last{border-right:0; margin-right:0}
.list .foot .statics a{border-right:1px solid #eee; display:inline-block; margin:0; color:#999}
.list .foot .statics a.download em{color:#b57c5b}
.list .foot .statics a.comment em{color:#38b}
.list .foot .statics a.scores em{color:#c00}
.list .foot .statics a.modalnum em{color:#666}
.list .foot .statics a.citecommon em{font-family:arial; font-weight:700; margin-right:6px}
#footer{background:none repeat scroll 0 0 #fff; margin:12px 0 0; padding:23px 0 65px}
#footer .footer_main{width:1100px; margin:0 auto}
#footer li{padding:5px 0; color:gray}
#footer a{color:gray}
#footer .guide,#footer .stores,#footer .rebate,#footer .follow{border-right:1px dashed #eaeaea; float:left; margin:0 20px 17px 0; padding:5px 0 0 50px; position:relative}
#footer .follow{border-right-width:0; margin-right:0}
#footer .guide .guide_icon,#footer .stores .guide_icon,#footer .rebate .guide_icon,#footer .follow .guide_icon,#footer .guide .stores_icon,#footer .stores .stores_icon,#footer .rebate .stores_icon,#footer .follow .stores_icon,#footer .guide .rebate_icon,#footer .stores .rebate_icon,#footer .rebate .rebate_icon,#footer .follow .rebate_icon,#footer .guide .follow_icon,#footer .stores .follow_icon,#footer .rebate .follow_icon,#footer .follow .follow_icon{height:36px; left:2px; position:absolute; top:2px; width:36px}
#footer .guide,#footer .stores,#footer .rebate,#footer .follow{width:208px}

#footer .guide strong,#footer .stores strong,#footer .rebate strong,#footer .follow strong{color:#404040; font-size:14px}
#footer .friendly{border-top:1px solid #dfdfdf; clear:both; padding-top:20px; text-align:center}
.foot_menu{margin:15px 0 0}
#footer .friendly a{margin:0 8px}
#footer .friendly strong{font-weight:normal; color:#555}
#footer .address{color:#555}
#footer .link_exchange{text-align:left}
.breadcrumbs a{color:#5e5e5e}
.breadcrumbs span{margin:0 5px}
.detail{width:810px; background-color:#FFF; overflow:hidden}
.detail .head{border-bottom:1px solid #d1cdcd; height:50px; padding:10px 0}
.detail .head .head_inner,.detail .content .detail_content{width:762px; margin:0 auto}
.detail .content a,.comment_listBox a{color:#369; font-size:13px}
.detail .content a{text-decoration:underline}
.detail a:hover{color:#ff8400}
.detail .content .detail_content p{line-height:24px; margin:6px auto; text-indent:2em}
.detail .content .detail_content h4{font-size:14px; height:36px; line-height:36px; margin:0}
.detail .content .detail_content pre{border:1px solid #d7d7d7; background:#fafafa; border-left-width:5px; padding:4px; margin:6px auto; font-size:12px; white-space:pre-wrap; word-wrap:break-word}
.detail .content .buttons{text-align:center}
.detail .head h1{font-size:20px; height:26px; line-height:26px; font-family:"微软雅黑","黑体"; font-weight:normal}
.detail .head .info{margin:4px 0 0 0; color:#999; height:26px}
.detail .head .info a{color:#999}
.detail .head .info .addtime{margin:0 10px}
.detail .content{margin:20px auto 15px; width:760px}
.detail .content p{line-height:24px; margin:6px auto; text-indent:2em; word-wrap:break-word; word-break:break-all}
.detail .content h3{font-size:14px; height:36px; line-height:36px}
.detail .content .big_image{text-align:center}
.detail .content .description h3{border-bottom:1px solid #ddd}
.detail .content .description h3 a{float:right; font-weight:normal; margin:5px 0 0}
.detail .content .buttons .btnbox{display:inline-block; width:229px; margin:0 15px; padding:20px 0 0 0}
.detail .content .buttons .btnbox .demo{background-position:0 0}
.detail .content .buttons .btnbox .demo:hover{background-position:-229px 0}
.detail .content .buttons .btnbox .download{background-position:0 -57px}
.detail .content .buttons .btnbox .download:hover{background-position:-229px -57px}
.detail .content .buttons .btnbox span strong{font-weight:800; font-size:18px; margin-right:5px}
.detail .content .buttons .btnbox span.dlnum{background-position:0 -89px}
.detail .content .buttons .btnbox span.dlcount{background-position:0 -65px}
.detail .tagged_with{height:38px}
.detail .tagged_with a{margin-right:15px}
.sidebar{float:right; width:277px}

.btn{-webkit-border-radius:3px; -moz-border-radius:3px; -ms-border-radius:3px; -o-border-radius:3px; border-radius:3px; background-color:#ff8400; color:#fff; display:inline-block; height:28px; line-height:28px; text-align:center; width:72px; transition:background-color .2s linear 0s; border:0; cursor:pointer}
.btn:hover{opacity:0.9; filter:alpha(opacity=90);}
.button3{display:inline-block; text-decoration:none; font:bold 12px/12px HelveticaNeue,Arial; padding:8px 11px; color:#555; border:1px solid #dedede; cursor:pointer}
.button3.white{background:#f5f5f5; filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f9f9f9',endColorstr='#f0f0f0'); background:-webkit-gradient(linear,left top,left bottom,from(#f9f9f9),to(#f0f0f0)); background:-moz-linear-gradient(top,#f9f9f9,#f0f0f0); border-color:#dedede #d8d8d8 #d3d3d3; color:#555; text-shadow:0 1px 0 #fff; -webkit-box-shadow:0 1px 1px #eaeaea,inset 0 1px 0 #fbfbfb; -moz-box-shadow:0 1px 1px #eaeaea,inset 0 1px 0 #fbfbfb; box-shadow:0 1px 1px #eaeaea,inset 0 1px 0 #fbfbfb; border-radius:1.3em; -moz-border-radius:1.3em; -webkit-border-radius:1.3em}
.button3.white:hover{border-color:#c7c7c7 #c3c3c3 #bebebe; text-shadow:0 1px 0 #fdfdfd; -webkit-box-shadow:0 1px 1px #ebebeb,inset 0 1px 0 #f3f3f3; -moz-box-shadow:0 1px 1px #ebebeb,inset 0 1px 0 #f3f3f3; box-shadow:0 1px 1px #ebebeb,inset 0 1px 0 #f3f3f3}
#windown_box{width:480px; background-color:#fff}
#windown_box .pop_close:hover{color:#f04848}
#windown_box .pop_close:hover{-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg); transform:rotate(180deg)}
#windown_box .pop_title{border-bottom:1px solid #dcdcdc; height:60px; line-height:60px; overflow:hidden; padding:0 20px; position:relative}
#windown_box .pop_title .pop_name{float:left; font-family:"Microsoft YaHei"; font-size:20px}
#windown_box .pop_title a.a_underline{float:right; font-size:12px}
#windown_box .pop_content{font-size:12px; padding:0 90px 40px}

.two_weeks .loginbox_reg{margin-left:126px}
.notice_error{color:#f46060; padding-bottom:10px; text-align:center}
.two_weeks .ckeckBox{color:#999}
.two_weeks label{color:#666; cursor:pointer; padding-right:26px}
.modal_backdrop{position:fixed; top:0; right:0; bottom:0; left:0; z-index:1040; background-color:#000}
.modal_backdrop.fade{opacity:0}
.modal_backdrop,.modal_backdrop.fade.in{opacity:.8; filter:alpha(opacity=80)}

.modal.fade{top:-25%; -webkit-transition:opacity .3s linear,top .3s ease-out; -moz-transition:opacity .3s linear,top .3s ease-out; -o-transition:opacity .3s linear,top .3s ease-out; transition:opacity .3s linear,top .3s ease-out}
.modal.fade.in{top:18%}
.detail_foot{width:760px; margin:0 auto; overflow:hidden}
.comments .title{font-family:"Microsoft YaHei"; font-size:18px; font-weight:normal; height:40px; line-height:40px; overflow:hidden}
.comments .num_area{color:#999; font-size:12px; font-weight:normal}
.comments .comment_send{font-size:12px; position:relative; padding:20px 0; border-top:1px solid #dcdcdc;}
.comment_avatar{float:left; width:60px; text-align:center}
.userPic{display:block}
.comments .comment_send .userPic{height:60px; margin-right:20px; width:60px}
.userPic img{-webkit-border-radius:100%; -moz-border-radius:100%; -ms-border-radius:100%; -o-border-radius:100%; border-radius:100%}
.textarea_comment{width:658px; border:1px solid #dcdcdc; -webkit-border-radius:5px; -moz-border-radius:5px; -ms-border-radius:5px; -o-border-radius:5px; border-radius:5px; color:#ccc; font-size:12px; height:60px; line-height:20px; margin-bottom:10px; padding:10px; overflow:hidden}
.comments .comment_sendPart{padding-left:80px; position:relative}
.comments .btn_p{position:relative}
.comment_send .comment_tip{top:36px; position:absolute; right:180px; font-size:12px; height:0; overflow:hidden; color:#f04848}
.comment_wrap .comment_tip{top:29px; position:absolute; right:120px; font-size:12px; height:0; overflow:hidden; color:#f04848}
span.emotion:hover{background-position:2px -28px}
.btn_p .btn_subGrey{-webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; color:#fff; font-size:14px; height:40px; text-align:center; width:150px; border:0; float:right}
.comment_list{border-bottom:1px solid #dcdcdc; margin-bottom:16px; padding-bottom:20px}
.comment_list .comment_avatar{font-size:12px; padding-right:16px; position:relative; text-align:center; width:36px; float:left}
.comment_list .userPic{height:36px; margin-bottom:4px; width:36px}
.grey{color:#999}
.comment_conBox{color:#666; float:left; width:700px}
.comment_conBox img{position:relative; top:2px}
.comment_avatar_time{overflow:hidden; height:26px}
.comment_avatar_time .time{float:right; margin-top:2px}
.time{color:#999; font-size:12px}
.blockquote_wrap{margin-bottom:10px; padding-top:8px}
.comment_blockquote{background-color:#f8f8f8; border:1px solid #dcdcdc; margin-top:-1px; padding:15px 19px}
.reply_area{display:none}
.reply_area textarea{height:40px; margin:5px 0 12px; padding:5px; width:688px; color:#666}
.reply_area .btn{width:70px; height:28px; font-size:12px; line-height:26px}
.comment_floor{color:#999; float:right; margin:-14px -12px 0 0}
.comment_con{overflow:hidden; padding-right:15px; width:650px}
.comment_con p{display:inline; word-break:break-all; word-wrap:break-word}
.comment_action{text-align:right; float:right}
.comment_action a,.comment_action_sub a{color:#999; font-size:12px; padding-left:12px; text-decoration:none}
.smileBoxOuter{background-color:#f5f5f5; border:1px solid #dcdcdc; clear:both; height:176px; padding:12px; position:absolute; width:386px; display:none; z-index:800}
ul.smileBox{width:386px; height:140px}
ul.smileBox li{width:36px; height:36px; float:left; margin:-1px 0 0 -1px; padding:0; border-bottom:0}
ul.smileBox li a:hover{border:1px solid #f04848; background-color:#f9f9f9; position:relative; z-index:2}

.smilePage{text-align:right; width:384px; line-height:24px; padding-top:12px}
.smilePage a{display:inline-block; width:24px; height:24px; margin-left:10px; text-align:center; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px}
.smilePage a:hover,.smilePage a.current{background-color:#f04848; color:#fff; font-weight:bold; text-decoration:none}
.pagination{text-align:center; margin:20px 0; overflow:hidden}
.pagination li{display:inline; min-width:24px; height:24px; line-height:24px; padding-right:10px; color:#5188a6}
.pagination li.jumpToPage{color:#999; padding-left:10px}
.pagination a{display:inline-block; padding:0 8px; color:#5188a6}
.pagination a:hover,.pagination .pageCurrent,.pagination .pageCurrent:hover{background-color:#f04848; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; color:#fff; font-weight:bold}
.pagination .pageup a:hover,.pagination .pagedown a:hover{background-color:#fff; -webkit-border-radius:0; -moz-border-radius:0; -ms-border-radius:0; -o-border-radius:0; border-radius:0; color:#5188a6; font-weight:normal; text-decoration:underline}
.pagination .noClick a,.pagination .noClick a:hover{background-color:#fff; -webkit-border-radius:0; -moz-border-radius:0; -ms-border-radius:0; -o-border-radius:0; border-radius:0; color:#999; font-weight:normal; text-decoration:none}
.pagination span{font-family:"SimSun"; font-size:12px}
.input_num{height:22px; line-height:22px; border:1px solid #dcdcdc; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; padding:0 5px; color:#666; width:26px; margin:0 5px}
.pagination .a_jumpTo{width:36px; height:24px; line-height:24px; background-color:#f04848; color:#fff; padding:0; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px}
.pagination .a_jumpTo:hover{font-weight:normal}
.searchReslut_nav{padding-top:10px; overflow:hidden}
.searchReslut_nav li{display:inline; padding-right:30px; height:39px; line-height:39px}
.searchReslut_nav li h2{display:inline; font-size:14px; font-weight:normal}
.searchReslut_nav li.selected_nav{float:right; padding-right:0}
.searchReslut_nav li.selected_nav h1{font-size:14px}
.searchReslut_nav li a{display:inline-block; height:37px; color:#333}
.searchReslut_nav li a:hover{color:#5188a6}
.searchReslut_nav li.current_nav a,.searchReslut_nav li.current_nav a:hover{border-bottom:2px solid #f04848; font-weight:bold; color:#333}
.searchReslut_nav li span{color:#999; font-size:12px; font-weight:normal}
.bshare{float:right; margin:3px 0 0}
.banner{height:250px; position:relative; overflow:hidden; width:600px; float:right}
.banner img{width:600px; height:250px}
.banner .banner_page{position:absolute; right:5px; bottom:10px}
.banner .banner_page_left{background-position:0 0; left:0}
.banner .banner_page_left:hover{background-position:-30px 0}
.banner .banner_page_right{background-position:0 -75px; right:0}
.banner .banner_page_right:hover{background-position:-30px -75px}
.banner_page a{width:20px; height:20px; line-height:19px; display:inline-block; background-color:#999; color:#FFF; text-align:center; margin-right:7px; border-radius:30px; -moz-border-radius:30px; -webkit-border-radius:30px}
.banner_page a.current,.banner_page a:hover{background-color:#fe4800; text-decoration:none}
.merchant_cats{width:180px; border:1px solid #ddd; position:relative; background-color:#fff}
.merchant_cats .head{background-color:#f9f9f9; height:34px; line-height:34px; border-bottom:1px solid #eee}
.merchant_cats .head h3{color:#666; font-size:16px; font-weight:normal; margin-left:17px}
.merchant_cats .content{padding:5px 0; font-size:14px}
.merchant_cats .content a{height:30px; line-height:30px; padding:2px 22px 2px 24px; vertical-align:middle; display:block; position:relative; color:#484848; font-size:14px}
.merchant_cats .content a span{-webkit-transition:-webkit-transform .2s linear; -moz-transition:-moz-transform .2s linear; -o-transition:-o-transform .2s linear; transition:transform .2s linear; display:inline-block}
.merchant_cats .content a:hover span{-webkit-transform:translateX(8px); -moz-transform:translateX(8px); -ms-transform:translateX(8px); -o-transform:translateX(8px); transform:translateX(8px)}
.merchant_cats .content a.on{background-color:#f7ffe7}
rchant_cats .content .merchant_arrow{display:inline-block; float:right; margin:12px 0 0}
.index_left{width:782px}
.sidebar_per{border:1px solid #DDD; border-top:6px solid #333; float:right; width:308px; background-color:#fff; height:445px; margin-bottom:12px}
.sidebar .sidebar_per{width:275px; height:auto}
.sidebar .sidebar_per dd.sidebar_articles a{width:185px}
.sidebar .sidebar_per dt a.more{margin-right:9px}
.container .index_first{height:250px}
.index_first .sidebar_first{height:243px;position: relative}
.sidebar_per dt{height:40px}
.sidebar_per dt strong{color:#414141; display:inline-block; font-size:18px; margin:5px 9px 0; font-weight:normal}
.sidebar_per dt a{float:right; margin:11px 12px 0 0}
.sidebar_per dd.sidebar_articles a{display:block; width:225px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.apply .btn{width:auto; padding:0 10px; text-decoration:none}
.arrow-right-menu{border-top:5px solid transparent; border-bottom:5px solid transparent; border-left:5px solid #f63; display:none; top:32px}
.sidebar_per dd.sidebar_articles span{float:right; color:#ccc}
span.more-sign{font-family:"SimSun"}
.index_per{margin:12px 0 0; overflow:hidden}
.sidebar_per dt strong .name-en{color:#ddd}
.index_recommend{border:1px solid #e5e5e5; background-color:#fff; width:782px; margin-bottom:12px; height:450px; overflow:hidden}
.index_recommend .head{border-bottom:2px solid #bbb; height:40px; line-height:40px}
.index_recommend .head strong{color:#333; font-size:18px; font-weight:normal; margin-left:17px; width:115px; display:block; float:left}
.index_recommend .head ul{float:left; width:606px;}
.index_recommend .head ul li{float:left; width:86px; height:40px; line-height:42px; font-size:13px; text-align:center; position:relative; cursor:pointer; color:#fff}
.index_recommend .head ul li:hover{color:#f63}
.index_recommend .head ul li.current{border-bottom:2px solid #f63; color:#f63}
.index_recommend .head ul li.current .arrow-up-menu{display:block; left:47%; top:35px}
.index_recommend .head .more{float:right; font-size:12px; margin-right:10px; display:block; position:relative; top:1px}
.more{color:#999}
.index_recommend .content{width:758px; margin:0 0 0 24px; padding:8px 0 0}
.index_recommend .content .per{display:none}
.index_recommend .content .per.current{display:block}
.index_recommend .content ul li{float:left}
.index_recommend .content .ul_pics{height:202px}
.index_recommend .content .ul_pics li{height:190px; margin:12px 14px 0 0; width:235px; overflow:hidden}
.index_recommend .content .ul_pics li a{color:#666; display:block; overflow:hidden}
.index_recommend .content .ul_pics li a:hover,.index_recommend .content ul.ul_words li a:hover,.sidebar_per dd a:hover{color:#ff8400}
.index_recommend .content .ul_pics li a img{margin:0 0 3px; width:233px; height:160px; border:1px solid #ddd}
.index_recommend .content .ul_pics li.three{margin-right:0}
.index_recommend .content ul.ul_words li a{color:#444; display:block; width:219px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.apply{text-align:center}
.template_description{text-align:left; text-indent:2em}
.template_feature{text-align:left; text-indent:2em; margin:15px 0 8px}
.feature{margin:0 20px 0 0}
.sitemap_li{float:left; width:190px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden}
.description h4{padding:8px 0}
pre{border:1px solid #d7d7d7; background:#fafafa; border-left-width:5px; padding:4px; margin:6px auto; font-size:12px; white-space:pre-wrap; word-wrap:break-word}
.detail .content .demo_image{text-align:center}
.detail .content .demo_image img{border:1px solid #d3d3d3; padding:5px; max-width:760px}
.table_parameters{border-left:1px solid #d3d3d3; border-top:1px solid #d3d3d3; margin:6px auto}
.table_parameters tr.tr_head{background:none repeat scroll 0 0 #f7f7f7; font-weight:bold; padding:6px; text-align:center}
.table_parameters td{border-bottom:1px solid #d3d3d3; border-right:1px solid #d3d3d3; line-height:26px; padding:2px 2px 2px 5px}
.detail .content .table_parameters p{text-indent:0}
.search_select{float:left; width:30px; height:34px}
.like_merge{height:32px; right:6px; overflow:hidden; position:absolute; top:6px; width:115px; display:none}
.like_merge .poster_forward,.like_merge .poster_likes,.like_merge .poster_del,.like_merge .poster_dellike{background:linear-gradient(#fffcfc,#f3f0f0) repeat scroll 0 0; border:1px solid #d6d6d1; border-radius:3px; cursor:pointer; font-size:14px; height:30px; line-height:30px; margin-right:2px; overflow:hidden; padding:0 5px; text-align:center}
.lm_like{background-position:-101px -67px; padding:0 8px;margin-right: 3px}
.lm_liked{background-position:-127px -67px; padding:0 8px}
.lm_shouji{background-position:-158px -66px; padding:0 6px}
.like_merge .poster_likes{line-height:32px}
.declare{background:none repeat scroll 0 0 #e8f5fe; border:1px solid #abcee4; margin:4px 0; padding:6px}
.declare a,.page_nav a{color:#369}
.declare span{font-weight:bold}
.page_nav{background:none repeat scroll 0 0 #f7f7f7; height:26px; line-height:26px; margin:10px auto; padding:4px 2px}
.alipay{margin-top:10px}
.alipay_img img{width:150px}
.sidebar_tags a{background-color:#428bca; color:#fff; display:inline-block; line-height:21px; margin:0 5px 5px 0; opacity:.8; padding:0 6px}
.sidebar_tags{padding:3px 0 8px 16px}
.sidebar_tags a:nth-child(9n){background-color:#4a4a4a}
.sidebar_tags a:nth-child(9n+1){background-color:#428bca}
.sidebar_tags a:nth-child(9n+2){background-color:#5cb85c}
.sidebar_tags a:nth-child(9n+3){background-color:#d9534f}
.sidebar_tags a:nth-child(9n+4){background-color:#567e95}
.sidebar_tags a:nth-child(9n+5){background-color:#b433ff}
.sidebar_tags a:nth-child(9n+6){background-color:#00aba9}
.sidebar_tags a:nth-child(9n+7){background-color:#b37333}
.sidebar_tags a:nth-child(9n+8){background-color:#f60}
.sidebar_tags a{opacity:.80; filter:alpha(opacity=80); color:#fff; background-color:#428bca; display:inline-block; margin:0 5px 5px 0; padding:0 6px; line-height:21px; border-radius:2px; -moz-border-radius:2px; -webkit-border-radius:2px}
.sidebar_per .sidebar_tags a:hover{opacity:1; filter:alpha(opacity=100); text-decoration:none; color:#fff}
.tag_head{background-color:#f7f7f7; border-bottom:1px solid #dcdcdc; padding:10px 20px}
.tag_head h1{font-size:18px; color:#333; font-weight:normal}
.tag_head h1 strong{color:#f60; font-weight:normal}
.ul_foot a{display:inline-block; width:100px}
.disabled{opacity:0.6; filter:alpha(opacity=60);cursor:default;}
.disabled:hover{opacity:0.6; filter:alpha(opacity=60);cursor:default;}
.setting-verify{padding:30px 60px 120px; text-align:center}
.setting-verify h1{font-size:18px}
.setting-verify p{font-size:20px; margin:14px 0 20px}
.verified-status{color:#2ea7e0}
.setting-verify .verify-un{color:#fcb700; display:inline-block; padding-bottom:6px}
.setting-verify .btn{font-size:14px; height:40px; line-height:40px; width:160px; margin-top:20px}
.btn-green{background-color:#39b94e}
.btn-green:hover{background-color:#33a646}
.setting-verify .btn-blue{background-color:#58b9e6; color:#fff; margin-left:15px}
.setting-verify .btn-blue:hover{background-color:#2ea7e0}
.setting-resetpwd{margin:0; padding:30px 60px 60px 70px}
.wlfg-wrap .label-name{color:#656e73; float:left; font-size:14px; height:40px; line-height:40px; text-align:right; width:120px}
.wlfg-wrap .btn-green{font-size:14px; height:40px; line-height:40px; width:160px}
.rlf-tip-wrap{font-size:12px; height:30px; position:relative; top:10px; left:10px}
.detail .head .info a.collection-btn{margin:0 0 0 4px; position:relative; top:1px}
.detail .head .info a.collection-btn:hover{text-decoration:none}
.mmsg-box{border:2px solid #fff; border-radius:2px; box-shadow:0 2px 4px rgba(0,0,0,0.1); left:50%; position:fixed; top:50%; z-index:9999; display:none}
.mmsg-content{color:#fff; font-size:18px; padding:10px 20px 10px 47px}
.mmsg-box-info .mmsg-icon{background-position:0 -40px}
.mmsg-box-info .mmsg-background{background:none repeat scroll 0 0 #2ea7e0; bottom:0; left:0; opacity:.9; position:absolute; right:0; top:0; z-index:-1}
.info .poster_likes{margin-left:5px}
.comment_action_sub{visibility:hidden; float:right; text-align:right}
.blockquote_wrap .reply_area textarea{width:649px}
.order-page{position: absolute; right: 0; top: 8px; z-index: 1;}
.order-page .find_results_num{display: inline-block; text-align: right; width: 205px;}
.order-page .page-small{display: inline-block; margin-right: 5px; text-align: right; width: 115px;}
.order-page a.page-btn{border: 1px solid #dddddd; display: inline-block; height: 22px; margin: 0 5px; position: relative; vertical-align: middle; width: 22px;}
.order-page .arrow-left-none{border-right: 5px solid #ccc;}
.order-page .arrow-left{border-bottom: 5px solid transparent; border-right: 5px solid #666666; border-top: 5px solid transparent; left: 8px; top: 7px;}
.order-page .arrow-right{border-bottom: 5px solid transparent; border-left: 5px solid #666666; border-top: 5px solid transparent; left: 9px; top: 7px;}
.order-page .arrow-left-none{border-right: 5px solid #ccc;}
.order-page .arrow-right-none{border-left: 5px solid #ccc;}
.dl{overflow: hidden;}
.dl dt{clear: both; margin: 20px 0;}
.dl dd{float: left; height: 184px; margin: 0 0 20px 30px; text-align: center; width: 280px;}
.dl img{display: inline-block; margin-bottom: 3px; padding: 5px; vertical-align: middle;}
.dl a{margin: 0 10px;}

.co_login{color: #999; text-align: center;}
.co_login a{padding-left: 12px;}
.tg_classify_all .on .red{color:#FFF}
body .hot-label:hover,body .list-tag:hover{text-decoration: none}
.hot-label, .list-tag {
  background: #edf1f2 none repeat scroll 0 0;
  color: #787d82;
  float: left;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  margin-left:6px;
  padding: 0 10px;
  transition: all 0.25s ease 0s;
  white-space: nowrap;
  word-wrap: break-word;
}
.hot-label:link, .hot-label:visited, .list-tag:link, .list-tag:visited {
  color: #787d82;
}
.hot-label:hover, .list-tag:hover, .custom-content .hot-label.curr, .custom-content .list-tag.curr {
  background-color: #d0d6d9;
  color: #14191e !important;
}

.topic .detail .content p {
  text-indent: 0;
}
.content .short_tit a{margin-right: 5px}
.table_parameters pre{word-wrap: break-word;word-break: normal; max-width:490px;margin:0}

.share-list {
  display: inline-block;
  padding: 0 10px 0 17px;
}

.share-list b {

  width: 12px;
  display: inline-block;
  height: 12px;
}



.infoCommentBlock {
  padding: 20px 0;
  border-bottom: 1px dashed #e5e5e5;
  overflow: hidden
}
.infoCommentBlock.last,.infoPerBlock.last{
  border-bottom: none
}
.infoCommentBlock .leftPicBlock, .infoCommentBlock .leftPicBlock a {
  display: block;
  height: 36px;
  width: 36px;
}
.infoCommentBlock .leftPicBlock img {
  border-radius: 100%;
  height:36px;width:36px;
}

.infoCommentBlock .centerBlock {
  font-size: 12px;
  width: 557px;
}
.infoCommentBlock span.title {
  color: #888;
  display: inline-block;
  margin-bottom: 5px;
}
.infoCommentBlock .centerBlock a.blue {
  font-weight: bold;
  padding-right: 5px;
}

.infoCommentBlock .infoNews {
  color: #555;
}
.infoCommentBlock .infoNews p {
  color: #555;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
}
.y_adresslist li{position:relative;float:left;width:280px;height:200px;padding:30px 10px 0 35px;border:1px solid #c9c9c9;background:#fff;margin:0 23px 23px 0;-webkit-transition:border 0.3s;transition:border 0.3s;}
.y_adresslist li.m_active{border: 1px solid red; }
.y_adresslist li:hover{border-color:#969696;box-shadow: 0 0 20px rgba(0,0,0,.4);}
.y_adresslist li h3{font-size:18px;color:#333;font-weight:normal;margin-bottom:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.y_adresslist li p{font-size:14px;line-height:24px;}
.y_adresslist li .y_adressbtn{position:absolute;bottom:9px;right:40px;width:20px;height:20px;cursor:pointer;background:url(../assets/y_adressbg.png) 0 -72px no-repeat;}
.y_adresslist li .y_deletbtn{right:14px;background-position:0 -92px;}
.y_adresslist li .y_editbtn:hover{background-position:-20px -72px;}
.y_adresslist li .y_deletbtn:hover{background-position:-20px -92px;}
.y_adresslist li.y_addlist{padding:0;text-align:center;}
.y_adresslist li.y_addlist .y_addlistbtn{display:block;height:100%;overflow:hidden;font-size:14px;color:#999;cursor:pointer;-webkit-transition:color 0.3s;transition:color 0.3s;}
.y_adresslist li.y_addlist .y_addlistbtn .y_ico{display:block;width:36px;height:36px;margin:64px auto 11px;background:url(../assets/y_adressbg.png) 0 -36px no-repeat;}
.y_adresslist li.y_addlist .y_addlistbtn:hover{color:#333;}
.y_adresslist li.y_addlist .y_addlistbtn:hover .y_ico{background-position:0 0;}
.y_adresslist .addr-li.active{border-color:#f00;}
.y_adresslist .addr-li.active h3{color:#f00;}

.y_adresslist li{position:relative;float:left;width:280px;height:200px;padding:30px 10px 0 35px;border:1px solid #c9c9c9;background:#fff;margin-right:23px;-webkit-transition:border 0.3s;transition:border 0.3s;}
.y_adresslist li:hover{border-color:#969696}
.y_adresslist li h3{font-size:18px;color:#333;font-weight:normal;margin-bottom:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.y_adresslist li p{font-size:14px;line-height:24px;}
.y_adresslist li .y_adressbtn{position:absolute;bottom:9px;right:40px;width:20px;height:20px;cursor:pointer;background:url(../assets/y_adressbg.png) 0 -72px no-repeat;}
.y_adresslist li .y_deletbtn{right:14px;background-position:0 -92px;}
.y_adresslist li .y_editbtn:hover{background-position:-20px -72px;}
.y_adresslist li .y_deletbtn:hover{background-position:-20px -92px;}
.y_adresslist li.y_addlist{padding:0;text-align:center;}
.y_adresslist li.y_addlist .y_addlistbtn{display:block;height:100%;overflow:hidden;font-size:14px;color:#999;cursor:pointer;-webkit-transition:color 0.3s;transition:color 0.3s;}
.y_adresslist li.y_addlist .y_addlistbtn .y_ico{display:block;width:36px;height:36px;margin:64px auto 11px;background:url(../assets/y_adressbg.png) 0 -36px no-repeat;}
.y_adresslist li.y_addlist .y_addlistbtn:hover{color:#333;}
.y_adresslist li.y_addlist .y_addlistbtn:hover .y_ico{background-position:0 0;}
@media (max-height:900px) and (max-width:1440px){
  .y_adresslist li{width:220px;height:160px;}
  .y_adresslist li:nth-child(3n){margin-right:0;}
  .y_adresslist li.y_addlist .y_addlistbtn .y_ico{margin-top:50px;}
  .y_adresslist li{padding: 15px 10px 0 20px;}
  .y_adresslist li p{font-size:12px;line-height:1.8em}
}
.y_safelist li .y_ico{float:left;width:28px;height:33px;margin:10px 0 0 30px;background:url(../assets/y_safebg.png) no-repeat;}
.y_safelist li.y_ico2 .y_ico{background-position:0 -33px;}
.y_safelist li.y_ico3 .y_ico{background-position:0 -66px;}



a:link, a:visited {
  color: #5188a6;
}
.l {
  float: left;
}
.r {
  float: right;
}
@font-face {
  font-family: 'icomoon';

  font-weight: normal;
  font-style: normal;
}
[class^="icon-"],
[class*=" icon-"] {
  font-family: 'icomoon';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-stroke-width: 0.2px;
}
.icon-tick:before {
  content: "\e600";
}

.icon-clock:before {
  content: "\e602";
}
.icon-chat:before {
  content: "\e603";
}
.icon-msg:before {
  content: "\e604";
}

.icon-user:before {
  content: "\e607";
}

.icon-plan:before {
  content: "\e609";
}
.icon-note:before {
  content: "\e60a";
}

.icon-ques:before {
  content: "\e615";
}

.icon-code:before {
  content: "\e61b";
}
ul.space-data {
  padding: 20px;
  color: #60686b;
}
.space-data li,
.space-item li {
  height: 28px;
  line-height: 28px;
  position: relative;
  padding-left: 22px;
  font-size: 12px;
}
.space-data li a,
.space-item li a {
  color: #60686b;
}
.space-data li a:hover,
.space-item li a:hover {
  color: #c9394a;
  text-decoration: underline;
}
ul.space-data .icon,
.space-item .icon {
  position: absolute;
  left: 0;
  top: 8px;
  font-size: 15px;
  *top: 7px;
}
ul.space-data .icon-clock,
.space-item .icon-clock {
  *background-position: 0 0;
}
ul.space-data .icon-tick,
.space-item .icon-tick {
  *background-position: 0 -36px;
}
ul.space-data .icon-ques,
.space-item .icon-ques {
  *background-position: 0 -72px;
}
ul.space-data .icon-chat,
.space-item .icon-chat {
  *background-position: 0 -108px;
}
ul.space-data .icon-note,
.space-item .icon-note {
  *background-position: 0 -143px;
}
ul.space-data .icon-code,
.space-item .icon-code {
  *background-position: 0 -178px;
}
.container{margin-top: 20px;}
.member_right{width:220px;float:left}
.member_per{background-color: #FFFFFF;background: #ffffff;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);}
.panel {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #14191e;
  margin-bottom: 20px;
  padding: 15px 20px;
}

.myname {
  color: #363d40;
  font-size: 16px;
  font-weight: normal

}

.job-title {
  line-height: 22px;
  margin-top: 3px;
  font-size: 12px;color:#999;
}
.name-job{float:left;margin-top: -2px;width:121px}

.sign-wrap{position: relative}
.signed_edit {

  bottom: 4px;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  position: absolute;
  right: 0;
  width: 20px;
}
.signed_textarea {
  border: 1px solid transparent;
  font-size: 12px;
  height: 40px;
  line-height: 20px;
  margin: 0;
  resize: none;
  width: 156px;
  margin: 10px 0;
  color: #99a1a6;
  background-color: #FFF;
  overflow: auto
}
.signed_error{color:red;font-size: 12px;}
.member_main{
  background: none repeat scroll 0 0 #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px 20px 20px 20px;
  width: 825px;
  position: relative;
  float:left
}


.perInfo .titleInfoBorder {
  margin-bottom: 10px;
}
.titleInfoBorder {
  border-bottom: 1px solid #dcdcdc;
  height: 40px;
  margin-bottom: 20px;
  position: relative;
}

.titleInfoBorder span {
  display: block;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
}

.titleInfoBorder a.want {
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 4px;
  height: 26px;
  line-height: 26px;
  margin-top: 3px;
}

.infoCommentBlock {
  padding: 20px 0;
  border-bottom: 1px dashed #e5e5e5;
  overflow: hidden
}
.infoCommentBlock.last,.infoPerBlock.last{
  border-bottom: none
}

.infoCommentBlock .leftPicBlock, .infoCommentBlock .leftPicBlock a {
  display: block;
  height: 36px;
  width: 36px;
}
.leftPicBlock {
  float: left;
  text-align: center;
  width:50px;
  overflow: hidden;
}
.infoCommentBlock .leftPicBlock img {
  border-radius: 100%;
  height:36px;width:36px;
}

.infoCommentBlock .centerBlock {
  font-size: 12px;
  width: 557px;
}
.centerBlock {
  float: left;
  line-height: 22px;
  padding-left: 10px;
}

.infoCommentBlock span.title {
  color: #888;
  display: inline-block;
  margin-bottom: 5px;
}

span.title a.blue:link, span.title a.blue:visited {
  color: #5188a6;
  text-decoration: none;
}
.infoCommentBlock .centerBlock a.blue {
  font-weight: bold;
  padding-right: 5px;
}

.infoCommentBlock .infoNews {
  color: #555;
}
.infoNews, .infoWords {
  color: #888;
  font-size: 12px;
  line-height: 1.6em;
  margin-bottom: 5px;
}

.infoCommentBlock .infoNews p {
  color: #555;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
}

.objectBlock {
  border: 1px solid #e6e6e6;
  display: block;
  height: 56px;
  overflow: hidden;
  padding: 10px;
  width: 585px;
}

.objectBlock .pic, .relaObj .pic {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  display: block;
  float: left;
  height: 50px;
  padding: 2px;
  text-align: center;
  width: 50px;
}


.objectBlock .objTitle, .relaObj .objTitle {
  display: inline-block;
  font-size: 14px;
  margin-bottom: 4px;
  padding-left: 10px;
  width: 515px;
}

.rightBlock {
  float: right;
  text-align: right;
  width: 100px;
}

.infoCommentBlock .time {
  height: auto;
  line-height: 22px;
  margin-bottom: 4px;
}
.rightBlock .time {
  height: 26px;
  line-height: 26px;
}
.rightBlock .time {
  color: #999;
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
}

.clear {
  clear: both;
  font-size: 0;
  height: 0;
  overflow: hidden;
}

.myspace-list {
  position: absolute;
  left: -50px;
  top: 0;
  width: 50px;
  z-index: 99;
}



.myspace-list a {
  display: block;
  height: 50px;
  margin-bottom: 1px;
  position: relative;
  width: 50px;
}

.myspace-list a span {

  color: #ffffff;
  display: none;
  height: 29px;
  left: 60px;
  line-height: 25px;
  position: absolute;
  text-indent: 21px;
  top: 12px;
  width: 67px;
  z-index: 99;
}
.myspace-list a:hover span {
  display: block;
}

.myspace-courselist {
  background: none repeat scroll 0 0 #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  width: 870px;
}
#courseSelect {
  color: #656e73;
  font-family: "Microsoft Yahei","Hiragino Sans GB",Helvetica,"Helvetica Neue","微软雅黑",Tahoma,Arial,sans-serif;
  font-size: 12px;
  margin-top: 11px;
}
p.tags a {
  background-color: #cbcbcb;
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  margin-left: 6px;
  padding: 2px 6px;
  text-decoration: none;
}

.main-user {
  height: 236px;
}

.main-user .avatar img {
  border-radius: 100px;
  left: 24px;
  position: absolute;
  top: 24px;
}
.main-user .profile {
  color: #ffffff;
  padding: 30px 0 0;
  position: relative;
  width: 828px;
}
.main-user .profile h4 {
  color: #ffffff;
  font-size: 28px;
  line-height: 24px;
  font-weight: normal

}
.main-user .profile h4 a {
  margin-left: 10px;
}
.main-user .profile .icon {

  width: 24px;
}
.main-user .icon-teacher {

  display: inline-block;
  height: 24px;
  position: relative;
  width: 24px;
}
.main-user .icon-teacher i {

  display: none;
  height: 22px;
  left: -16px;
  position: absolute;
  top: -25px;
  width: 57px;
}
.main-user .icon-teacher:hover i {
  display: block;
}
.main-user .aboutme {
  color: #d6d8d9;
  margin-top: 25px;
  overflow: hidden;
  white-space: pre-wrap;
  width: 520px;
  word-wrap: break-word;
}
.main-user .aboutjob {
  color: #ffffff;
  font-size: 14px;
  line-height: 40px;
}
.main-user .web {
  position: absolute;
  right: 30px;
  top: 50px;
}
.main-user .web li {
  float: left;
  height: 20px;
  margin: 0 5px;
}
.main-user .web .icon {
  height: 20px;
  text-indent: -9999em;
  width: 20px;
}
.main-user .web .icon-wb {
  background-position: 0 0;
}
.main-user .web .icon-wb:hover {
  background-position: -35px 0;
}
.main-user .web .icon-qwb {
  background-position: 0 -35px;
}
.main-user .web .icon-qwb:hover {
  background-position: -35px -35px;
}
.main-user .web .icon-qq {
  background-position: 0 -71px;
}
.main-user .web .icon-qq:hover {
  background-position: -35px -71px;
}
.main-user .web .icon-qzone {
  background-position: 0 -106px;
}
.main-user .web .icon-qzone:hover {
  background-position: -35px -106px;
}
.main-user .btn {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding: 0 33px 0 53px;
  position: absolute;
  right: 30px;
  top: 125px;
  color:#FFF;
  font-weight: normal
}
.profile a:hover{
  text-decoration: none
}
.main-user .btn .icon {
  height: 20px;
  left: 28px;
  margin-top: -10px;
  position: absolute;
  top: 50%;
  width: 20px;
}
.main-user .add-frd .icon {
  background-position: 0 -213px;
}
.main-user .send-msg {
  background-color: rgba(46, 167, 224, 0.5);
}
.main-user .send-msg:hover {
  background-color: #2ea7e0;
}
.main-user .send-msg .icon {
  background-position: 0 -246px;
}
.main-user .profile h4 a:hover span {
  color: #b4bbbf;
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
}
.bodybg {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.main-aside {
  width: 260px;
}
.main-aside .main-hd h3 {
  font-size: 14px;
  padding: 0;
}
.space-course .icon {
  display: inline-block;
  height: 16px;
  width: 16px;
}
ul.space-data {
  color: #60686b;
  padding: 20px;
}
.space-data li, .space-item li {
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  padding-left: 22px;
  position: relative;
}
.space-data li a, .space-item li a {
  color: #60686b;
}
.space-data li a:hover, .space-item li a:hover {
  color: #c9394a;
  text-decoration: underline;
}
ul.space-data .icon, .space-item .icon {
  font-size: 15px;
  left: 0;
  position: absolute;
  top: 8px;
}
ul.space-data .icon-clock, .space-item .icon-clock {
}
ul.space-data .icon-tick, .space-item .icon-tick {
}
ul.space-data .icon-ques, .space-item .icon-ques {
}
ul.space-data .icon-chat, .space-item .icon-chat {
}
ul.space-data .icon-note, .space-item .icon-note {
}
ul.space-data .icon-code, .space-item .icon-code {
}
.space-visitors li {
  border-bottom: 1px solid #edf1f2;
  min-height: 35px;
  padding: 15px 0 15px 50px;
  position: relative;
}
.space-visitors li p {
  color: #787d82;
  font-size: 12px;
  height: 14px;
  line-height: 14px;
  margin-top: -5px;
}
.space-visitors li:last-child {
  border-bottom: 0 none;
}
.space-visitors .avatar {
  border-radius: 20px;
  display: block;
  height: 40px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 10px;
  width: 40px;
}
.space-visitors .nickname {
  display: block;
  max-height: 42px;
  overflow: hidden;
  position: relative;
  top: -5px;
}
.space-visitors .nickname:hover {
  text-decoration: underline;
}
.mymain-content {
  position: relative;
  width: 960px;
}
.studyright {
  margin-bottom: -4000px;
  padding-bottom: 4000px;
}
.space-menu {
  border-bottom: 1px solid #d1d6da;
  height: 50px;
  line-height: 50px;
}
.space-menu li {
  color: #60686b;
  float: left;
  height: 100%;
  text-align: center;
  width: 120px;
}
.space-menu a {
  display: block;
  font-size: 14px;
  height: 100%;
}
.space-menu a span {
  display: block;
  height: 16px;
  line-height: 16px;
  position: relative;
  top: 19px;
}
.space-menu a.active, .space-menu a:hover {
  border-bottom: 2px solid #c9394a;
  color: #c9394a;
  height: 50px;
  text-decoration: none;
}
.container_profile {
  color: #656e73;
  width: 1100px;
  margin:0 auto
}

.mp-uspace {
  margin-top: 10px;
  position: relative;
}
.mp-uspace .mp-num {
  color: #ffffff;
  padding: 0 18px 0 3px;
}
.mp-num {
  color: #364247;
  font-size: 16px;
  font-weight: bolder;
}

.mp-uspace .mp-title {
  color: #a5abac;
}
.mp-title {
  color: #969b9e;
  font-size: 12px;
}

.firstTabBox {
  color: #666;
  font-size: 12px;
  height: 26px;
  position: relative;
  width: 100%;
}

.firstTabBox .currentTab {
  color: #333;
  font-weight: bold;
  padding-bottom: 10px;
}
.firstTabBox span,.firstTabBox a{
  cursor: pointer;
  display: inline-block;
  padding-right: 20px;
}

.lineSpace span.line {
  margin: 0 15px;
}

.setting-right-wrap {
  min-height: 600px;
  padding: 30px 60px;
  position: relative;
}

.setting-profile {
  padding: 25px 0 20px 5px;
}
.wlfg-wrap{
  margin-bottom: 30px
}
.wlfg-wrap .label-name {
  color: #656e73;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  width: 120px;
  display: inline-block;
  margin-right: 20px;

}
.wlfg-wrap .label {
  color: #656e73;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  width: 120px;
  display: inline-block;
  margin-right: 20px;

}
.wlfg-wrap .label_right {
  color: #656e73;
  font-size: 14px;
  height: 40px;
  line-height: 40px;

  width: 160px;
  display: inline-block;

}
.wlfg-wrap .label_signature {
  vertical-align: top
}


.wlfg-wrap .rlf-group {
  margin-left: 130px;
}

.setting-profile .rlf-input {
  width: 360px;
  color:#555
}
.rlf-input {

  border: 1px solid #d0d6d9;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  padding: 7px 7px 7px 48px;
  transition: padding 0.15s ease 0s;
  width: 260px;
}
.rlf-input-nick {
  background-position: -80px -726px;
}


.setting-profile .rlf-select {
  width: 415px;
}
.rlf-select {
  border: 1px solid #d0d6d9;
  display: inline-block;
  font-size: 14px;
  height: 38px;
  outline: medium none;
  padding: 7px;
  transition: border-color 0.2s ease 0s;
  width: 315px;
}
select {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #555;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 4px 6px;
  vertical-align: middle;
}

.rlf-radio-group input {
  display: inline-block;
  vertical-align: middle;
}

.textarea {
  border: 1px solid #d0d6d9;
  font-size: 14px;
  line-height: 1.6em;
  padding: 7px;
  resize: none;
  transition: border-color 0.2s ease 0s;
  width: 400px;
  color:#999;
  font-size: 12px;
}



.file {
  position: relative;
  display: inline-block;
  background: #D0EEFF;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #AADFFD;
  border-color: #78C3F3;
  color: #004974;
  text-decoration: none;
}
.setting-bindsns-inner {
  padding-top: 60px;
}

.setting-bindsns-inner div {
  margin: 0 30px;
  text-align: center;
}
.setting-bindsns-inner i {
  color: #d0d6d9;
  display: inline-block;
  font-size: 80px;
  height: 80px;
  margin-bottom: 20px;
  width: 80px;
}

.btn-green{
  background-color: #39b94e;
  display: inline-block;

  cursor: pointer;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  transition: background-color 0.2s ease 0s;
  width: 160px;
}
.btn-green:hover {
  background-color: #33a646;
  text-decoration: none
}
.setting-bindsns-inner .btn-green {
  color: #FFF;
  margin-top: 50px;
}

.infoPerBlock {
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
  padding: 16px 0 12px;
}
.centerBlock p.tags a {
  margin: 0 6px 0;
}
.infoNoData {
  padding: 50px 0 300px;
  text-align: center;
}
#member_index .infoNoData{
  padding: 50px 0;
}
.table_sign{
  background:#ffffff; margin:30px 0; text-align:center; border:1px solid #D9D9D9;line-height:38px;
  border-spacing:2px;border-collapse:separate;width:100%
}
.table_sign thead tr{
  color:black; background:#EEEEEE;
}
.table_sign tbody tr{
  height:80px;
}
.table_sign th{
  font-weight: normal
}
.table_sign td{
  width:90px
}
.today{
  background-color:#00bb00;
  cursor:pointer;
}

.tishi {
  background-color: #ffffe1;
  border: 1px solid #ffcc81;
  color: #ff6600;
  line-height: 26px;
  margin: 10px 0;
  overflow: hidden;
  padding: 6px 10px;
}

.tishi_text {
  color: #ff0000;
}

.tishi_span {
  color: #ff0000;
  font-weight: bold;
}

.rank-points {
  border-top: 1px solid #d0d6d9;
  margin-top: 15px;
}
.mp-item {
  padding-top: 8px;
  position: relative;
  text-align: center;
  width: 100%;
}

.mp-atag span {
  display: block;
  text-align: center;
}
.mp-title {
  color: #969b9e;
  font-size: 12px;
}
.mp-num {
  color: #364247;
  font-size: 16px;
  font-weight: bolder;
}
.mp-atag:hover{text-decoration: none}
.table_member {
  width:100%
}
.table_member tr {
  border-bottom: 1px solid #eff0f1;
  height: 55px;
}
.red,.error{color:red}.green{color:green}
.binded-weibo i, .binded-weibo p {
  color: #df7c87;
}
.binded-qq i, .binded-qq p {
  color: #65aede;
}

.member_per .nav li {
  border-bottom: 1px solid #edf1f2;
  height: 60px;
}

.member_per .nav a {
  color: #14191e;
  font-size: 14px;
  font-weight: bold;
  line-height: 60px;
  text-decoration:none
}

.member_per .nav .got-num {
  font-size: 12px;
  padding-left: 5px;
}
.member_per .nav a i{ margin-right:10px}
.member_per .nav .icon-nav {
  font-size: 18px;
}
.member_per .nav a:hover, .member_per .nav a.active {
  color: #f01400;
}
.myquelist {
  padding-left: 10px;
  padding-right: 10px;
}
.wenda-listcon {
  border-bottom: 1px solid #e3e5e5;
  padding: 20px 0;
  position: relative;
}

.wendaslider {
  min-height: 85px;
  padding: 10px 103px 0 0;
  position: relative;
  word-break: break-all;
  word-wrap: break-word;
}

.wendaslider .replynumber {
  color: #787d82;
  font-size: 12px;
  height: 51px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 10px;
}

.hasanswernum .ys {
  color: #00b33b;
}
.ys, .browsenum {
  float: left;
  height: 31px;
  margin: 10px 0;
  width: 50px;
}

.wendaslider .replynumber .number {
  height: 12px;
  line-height: 12px;
  padding-bottom: 7px;
}

.wendaslider .replynumber  {
  line-height: 12px;
}
.hasanswernum .ys {
  color: #00b33b;
}

.wendaslider .replynumber  {
  height: 12px;
  line-height: 12px;
  padding-bottom: 7px;
}

.wendaslider .replynumber .number {
  line-height: 12px;
}

.wendaslider  {
  color: #363d40;
  font-size: 14px;
  line-height: 20px;
  position: relative;
}
.wendaslider .wendaquetitle  {
  color: #0088cc;
}




.wendaslider .wendaquetitle  {
  font-weight: bold;
  line-height: 20px;
  padding-left: 8px;
}


.replymegfooter .keyword-list, .replymegfooter .wenda-time {
  float: left;
  margin-right: 20px;
}

.replymegfooter .keyword-list, .replymegfooter .wenda-time {
  float: left;
  margin-right: 20px;
}


p,ul,li,h1,h2,h3,h4,body,dd,dt,dl,blockquote{margin:0; padding:0}
img{border:0}
li{list-style-type:none}
a{color:#555; font-size:12px; cursor:pointer; text-decoration:none}
a:hover{color:#ff8400; text-decoration:underline}
table{empty-cells:show; border-collapse:collapse; border-spacing:0}
.clearfix:after{visibility:hidden; display:block; font-size:0; content:" "; clear:both; height:0}
*:first-child+html .clearfix{zoom:1}
em{font-style:normal}
.orange{color:#f63}
body{font:12px/1.5 "Hiragino Sans GB","Microsoft YaHei",simsun; font-size:13px; color:#211922; background-color:#ebebeb}

.round-image{width:50px; height:50px; float:left; margin-right:9px; -webkit-transition:all .3s ease-in; -moz-transition:all .3s ease-in; transition:all .3s ease-in; border-radius:30px; -moz-border-radius:30px; -webkit-border-radius:30px}
.pager{text-align:center; padding:20px 0}
.pager a{padding:3px 8px; margin-left:7px; line-height:20px; background:#f9f9f9; border:1px solid #dbdbdb; text-decoration:none; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; color:#333}
.pager a:hover,.pager a.current{background-color:#f60; color:#fff; border:1px solid #f60; cursor:pointer}
.no_result{padding:25px 0; text-align:center}
.no_result p.words{color:#333; font-size:18px; line-height:38px}
.no_result p.words em{color:#ff8400}
#container,.search_result{width:1100px; margin:12px auto 0; background-color:#fff; border:1px solid #dcdcdc}
.container{width:1100px; margin:0 auto 0}
.search_result{font-size:16px; padding:10px 0 10px; text-indent:10px}
.search_result strong{color:#ff8400; font-weight:normal}
#site_nav{background-color:#FFF; border-bottom:1px solid #eee; color:#484848; height:30px; line-height:30px}
#site_nav .sn_container{width:1100px; margin:0 auto}
#site_nav .sn_container .sn_login,.head_pay_btn{color:#f60}
#site_nav .tg_tools{position:relative; z-index:999}
#site_nav .tg_tools .collect{color:#333}
#site_nav .tg_tools li{float:left; padding-right:10px; line-height:32px; cursor:pointer; position:relative; height:30px; z-index:999; overflow:hidden; color:#666}
#site_nav .tg_tools li span{padding:0 3px}
#site_nav .tg_tools li span a{color:#666}
#site_nav .tg_tools li span a:hover{color:#38b; text-decoration:none}
#site_nav .tg_tools li b{transform:rotate(0deg); -webkit-transform:rotate(0deg); -o-transform:rotate(0deg); -moz-transform:rotate(0deg); -ms-transform:rotate(0deg); transform-origin:50% 20%; -ms-transform-origin:50% 20%; -webkit-transform-origin:50% 20%; -moz-transform-origin:50% 20%; -o-transform-origin:50% 20%; transition:transform .2s linear; -webkit-transition:-webkit-transform .2s linear; -moz-transition:-moz-transform .2s linear; -o-transition:-o-transform .2s linear; background-position:-5px -5px; background-repeat:no-repeat; overflow:hidden; display:block; width:7px; height:4px; display:inline-block!important; vertical-align:middle; padding-bottom:2px}
#site_nav .tg_tools li:hover{text-decoration:none; border:1px solid #dedede; border-top:0; border-bottom:0; overflow:visible; margin-right:-1px; padding-right:10px; margin-left:-11px; padding-left:10px; z-index:1000; height:31px; margin-bottom:-1px}
#site_nav .tg_tools li.box_color:hover{background-color:#fff}
#site_nav .tg_tools li:hover b,.tg_tools li.hover b,.tg_tools li:hover span,.tg_tools li.hover span{position:relative; z-index:1001}
#site_nav .tg_tools li:hover ul,.tg_tools li.hover ul{*display:block; *width:85px; height:auto; overflow:hidden; opacity:1; filter:Alpha(opacity=100); transition:opacity .4s linear; -webkit-transition:opacity .4s linear; -moz-transition:opacity .4s linear; -o-transition:opacity .4s linear}
#site_nav .tg_tools li.nav_home:hover ul,.tg_tools li.nav_home.hover ul{*width:81px}
#site_nav .tg_tools li:hover ul li,.tg_tools li.hover ul li{border:0; margin-top:0; transition:margin-top .2s linear; -webkit-transition:margin-top .2s linear; -moz-transition:margin-top .2s linear; -o-transition:margin-top .2s linear}
#site_nav .tg_tools li:hover b,.tg_tools li.hover b{transform:rotate(-180deg); -webkit-transform:rotate(-180deg); -o-transform:rotate(-180deg); -moz-transform:rotate(-180deg); -ms-transform:rotate(-180deg); transform-origin:50% 20%; -ms-transform-origin:50% 20%; -webkit-transform-origin:50% 20%; -moz-transform-origin:50% 20%; -o-transform-origin:50% 20%; transition:transform .2s linear; -webkit-transition:-webkit-transform .2s linear; -moz-transition:-moz-transform .2s linear; -o-transition:-o-transform .2s linear}
#site_nav .tg_tools li.no-hover{border:0; margin-right:0; padding-right:10px; padding-left:0; margin-left:0; height:30px}
#site_nav .tg_tools li ul{position:relative; display:block; height:0; overflow:visible; *display:none; opacity:0; filter:Alpha(opacity=0); background-color:#fff; border:1px solid #dedede; width:auto; margin:0 -11px; margin-bottom:-100%; border-top:0; z-index:1000; padding-bottom:5px; margin-top:-2px}
#site_nav .tg_tools li ul li{float:none; line-height:30px; border:0; margin:0; margin-top:-20px; zoom:1; height:30px; width:100%}
#site_nav .tg_tools li ul li:hover{margin:0; padding:0; height:30px}
#site_nav .tg_tools li ul li a{text-indent:10px; line-height:24px; float:left; display:block; width:100%; margin-top:3px}
#site_nav .tg_tools li ul li a:hover{margin:0; margin-top:3px; width:100%; background-color:#f2f2f2; color:#38b; text-decoration:none; transition:background-color .1s linear; -webkit-transition:background-color .1s linear; -moz-transition:background-color .1s linear; -o-transition:background-color .1s linear}
#site_nav .tg_tools li.tg-line{background-position:-5px -126px; background-repeat:no-repeat; overflow:hidden; display:block; width:1px; height:14px; padding:0!important; padding-right:10px!important; margin:0!important; margin-top:9px!important; border:none!important; cursor:default}

#site_nav .tg_tools li.tg_tools_home{color:#f63}
#header{background-color:#fff; padding-bottom:12px}
#header .tg_tools_home{margin:0 auto; width:1100px; height:80px}
#header .logo{width:272px; float:left; margin-top:8px}
#header .bbs_enter{float:right; overflow:hidden; margin:12px 0 0}
#search{width:466px; margin:17px 0 0 10px; float:left; position:relative}
#search .search_area{height:33px; line-height:33px; border:2px solid #ff8400; font-size:15px}
#search .search_area .search_input{height:31px; width:303px; margin-left:5px; border:0; font-family:"微软雅黑"; outline:0; line-height:31px; float:left; color:#999; *height:30px}
#search .search_area .btn_search{background-color:#ff8400; border:0; color:#FFF; width:86px; height:33px; vertical-align:top; font-family:"微软雅黑"; float:right; outline:0; cursor:pointer}
#search .search_keywords{height:22px; margin-top:5px; overflow:hidden}
#search .search_keywords a,#search .search_keywords span{color:#666}
#search .search_keywords a{margin-right:10px}
#search .search_keywords a.red{color:red}
.search_box{background-color:#fff; border:1px solid #e3e3e3; left:0; position:absolute; top:37px; width:464px; z-index:100}
.search_box a{color:#333; cursor:pointer; display:block; line-height:30px; padding:0 12px}
.search_box a:hover,.search_box a.on{background-color:#eaeaea; color:#38b; text-decoration:none}
.search_box a em{color:#ff8400}
.search_box a .tips{color:#999; float:right; font-size:12px; line-height:30px; padding-left:10px}
#nav{background-color:#ff8400; height:38px; line-height:38px}
#nav .nav_main{width:1100px; margin:0 auto; position:relative}
#nav .nav_main a{width:115px; height:100%; display:block; font-size:16px; color:#FFF; text-align:center; float:left; transition:background-color .2s linear 0s}
#nav .nav_main a.current,#nav .nav_main a:hover{background-color:#e95a00; text-decoration:none}
.tg_classify{position:relative; width:1100px; margin:12px auto 0; background-color:#FFF; border:1px solid #eaeaea}
.tg_classify .tg_tab_box{border-top:1px solid #eaeaea}
.tg_tab_box{border:1px solid #eaeaea; overflow:hidden}
.tg_classify .tg_tab_box .tg_classify_wrap:first-child{border-top:0}
.tg_classify .tg_tab_box .tg_classify_wrap{border-top:1px solid #eaeaea; margin:0 0 0 15px; padding:15px 0}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat{line-height:27px; position:relative}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dt{border-right:1px solid #eaeaea; color:#333; font-size:13px; height:27px; text-indent:26px}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat.tg_classify_all dt i{background-position:-5px -334px; background-repeat:no-repeat; display:block; height:13px; overflow:hidden; top:6px; width:13px}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dt i{left:0; margin-right:10px; position:absolute}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd{color:#333; float:left; height:27px; text-align:center; vertical-align:middle; width:90px}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd.on a,.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd a:hover{background-color:#38b; color:#fff!important}
.tg_classify .tg_tab_box .tg_classify_wrap dl.tg_classify_flat dd a{color:#333; display:inline; height:20px; line-height:20px; padding:4px 8px; text-decoration:none}
.tg_classify .dl_left{width:88px; float:left}
.tg_classify .dl_right{width:995px; float:left}
.tg_sort{background-color:#f9f9f9; border-bottom:1px solid #eaeaea; position: relative}
.tg_sort .tg_classify_wrap{float:left}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle{height:38px; margin:-1px -1px -2px 0; overflow:hidden; padding:0 15px 0 18px; position:relative; border-right:1px solid #eaeaea}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt,.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt{font-size:12px; height:38px; line-height:38px; text-align:center}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt a{color:#333; display:block; height:38px; text-decoration:none}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt a span{color:#333; padding:0 5px 0 3px; font-weight:normal}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt a b{background-position:-5px -83px; background-repeat:no-repeat; display:inline-block!important; height:8px; overflow:hidden; padding-bottom:2px; vertical-align:middle; width:8px}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt.on span,.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt span:hover{color:#38b}
.tg_sort .tg_classify_wrap dl.tg_classify_toggle dt.on a b{background-position:-5px -65px; background-repeat:no-repeat; display:inline-block!important; height:8px; overflow:hidden; padding-bottom:2px; vertical-align:middle; width:8px}

.tg_sort .tg_classify_wrap .tg_classify_simplecheck{height:38px; padding:0 0 0 30px}
.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt a{text-decoration:none}
.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt a i{background-position:-5px -427px; background-repeat:no-repeat; display:inline-block!important; height:14px; overflow:hidden; vertical-align:-9%; width:14px; margin-right:1px}
.tg_sort .tg_classify_wrap .tg_classify_simplecheck dt.on a i{background-position:-5px -475px}
.list{position:relative}
.list .list_main{margin:15px 8px 0 8px}
.list .list_main .per{background-color:#fff; border:1px solid #ddd; float:left; margin:0 12px 15px 0; width:260px; position:relative}
.list .list_main .per:hover{border-bottom:1px solid #4ba6e5; box-shadow:0 0 10px rgba(0,0,0,0.2)}
.list .img_link{height:350px; width:260px; display:block; text-align:center; overflow:hidden; vertical-align:middle}
.list .img_link img{vertical-align:middle}
.list .foot{border-top:1px solid #f2f2f2}
.list .foot p.title{height:22px; line-height:22px; margin:4px 0 3px}
.list .foot p.tags{height:22px; margin:0 0 6px; overflow:hidden}
/*.list .foot p.tags a{display:inline-block; margin-left:6px; padding:2px 6px; background-color:#cbcbcb; color:#fff; text-decoration:none; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px}*/
.list .foot p.title a{margin-left:10px; width:242px; display:block; overflow:hidden; white-space:nowrap; text-overflow:ellipsis}
.list .foot .statics{border-top:1px solid #f2f2f2; padding:6px 0 6px 10px; height:18px; color:#999;white-space: nowrap;overflow: hidden}
.list .foot .statics .last{border-right:0; margin-right:0}
.list .foot .statics a{border-right:1px solid #eee; display:inline-block; margin:0; color:#999}
.list .foot .statics a.download em{color:#b57c5b}
.list .foot .statics a.comment em{color:#38b}
.list .foot .statics a.scores em{color:#c00}
.list .foot .statics a.modalnum em{color:#666}
.list .foot .statics a.citecommon em{font-family:arial; font-weight:700; margin-right:6px}
#footer{background:none repeat scroll 0 0 #fff; margin:12px 0 0; padding:23px 0 65px}
#footer .footer_main{width:1100px; margin:0 auto}
#footer li{padding:5px 0; color:gray}
#footer a{color:gray}
#footer .guide,#footer .stores,#footer .rebate,#footer .follow{border-right:1px dashed #eaeaea; float:left; margin:0 20px 17px 0; padding:5px 0 0 50px; position:relative}
#footer .follow{border-right-width:0; margin-right:0}
#footer .guide .guide_icon,#footer .stores .guide_icon,#footer .rebate .guide_icon,#footer .follow .guide_icon,#footer .guide .stores_icon,#footer .stores .stores_icon,#footer .rebate .stores_icon,#footer .follow .stores_icon,#footer .guide .rebate_icon,#footer .stores .rebate_icon,#footer .rebate .rebate_icon,#footer .follow .rebate_icon,#footer .guide .follow_icon,#footer .stores .follow_icon,#footer .rebate .follow_icon,#footer .follow .follow_icon{height:36px; left:2px; position:absolute; top:2px; width:36px}
#footer .guide,#footer .stores,#footer .rebate,#footer .follow{width:208px}

#footer .guide strong,#footer .stores strong,#footer .rebate strong,#footer .follow strong{color:#404040; font-size:14px}
#footer .friendly{border-top:1px solid #dfdfdf; clear:both; padding-top:20px; text-align:center}
.foot_menu{margin:15px 0 0}
#footer .friendly a{margin:0 8px}
#footer .friendly strong{font-weight:normal; color:#555}
#footer .address{color:#555}
#footer .link_exchange{text-align:left}
.breadcrumbs a{color:#5e5e5e}
.breadcrumbs span{margin:0 5px}
.detail{width:810px; background-color:#FFF; overflow:hidden}
.detail .head{border-bottom:1px solid #d1cdcd; height:50px; padding:10px 0}
.detail .head .head_inner,.detail .content .detail_content{width:762px; margin:0 auto}
.detail .content a,.comment_listBox a{color:#369; font-size:13px}
.detail .content a{text-decoration:underline}
.detail a:hover{color:#ff8400}
.detail .content .detail_content p{line-height:24px; margin:6px auto; text-indent:2em}
.detail .content .detail_content h4{font-size:14px; height:36px; line-height:36px; margin:0}
.detail .content .detail_content pre{border:1px solid #d7d7d7; background:#fafafa; border-left-width:5px; padding:4px; margin:6px auto; font-size:12px; white-space:pre-wrap; word-wrap:break-word}
.detail .content .buttons{text-align:center}
.detail .head h1{font-size:20px; height:26px; line-height:26px; font-family:"微软雅黑","黑体"; font-weight:normal}
.detail .head .info{margin:4px 0 0 0; color:#999; height:26px}
.detail .head .info a{color:#999}
.detail .head .info .addtime{margin:0 10px}
.detail .content{margin:20px auto 15px; width:760px}
.detail .content p{line-height:24px; margin:6px auto; text-indent:2em; word-wrap:break-word; word-break:break-all}
.detail .content h3{font-size:14px; height:36px; line-height:36px}
.detail .content .big_image{text-align:center}
.detail .content .description h3{border-bottom:1px solid #ddd}
.detail .content .description h3 a{float:right; font-weight:normal; margin:5px 0 0}
.detail .content .buttons .btnbox{display:inline-block; width:229px; margin:0 15px; padding:20px 0 0 0}
.detail .content .buttons .btnbox .demo{background-position:0 0}
.detail .content .buttons .btnbox .demo:hover{background-position:-229px 0}
.detail .content .buttons .btnbox .download{background-position:0 -57px}
.detail .content .buttons .btnbox .download:hover{background-position:-229px -57px}
.detail .content .buttons .btnbox span strong{font-weight:800; font-size:18px; margin-right:5px}
.detail .content .buttons .btnbox span.dlnum{background-position:0 -89px}
.detail .content .buttons .btnbox span.dlcount{background-position:0 -65px}
.detail .tagged_with{height:38px}
.detail .tagged_with a{margin-right:15px}
.sidebar{float:right; width:277px}

.btn{-webkit-border-radius:3px; -moz-border-radius:3px; -ms-border-radius:3px; -o-border-radius:3px; border-radius:3px; background-color:#ff8400; color:#fff; display:inline-block; height:28px; line-height:28px; text-align:center; width:72px; transition:background-color .2s linear 0s; border:0; cursor:pointer}
.btn:hover{opacity:0.9; filter:alpha(opacity=90);}
.button3{display:inline-block; text-decoration:none; font:bold 12px/12px HelveticaNeue,Arial; padding:8px 11px; color:#555; border:1px solid #dedede; cursor:pointer}
.button3.white{background:#f5f5f5; filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f9f9f9',endColorstr='#f0f0f0'); background:-webkit-gradient(linear,left top,left bottom,from(#f9f9f9),to(#f0f0f0)); background:-moz-linear-gradient(top,#f9f9f9,#f0f0f0); border-color:#dedede #d8d8d8 #d3d3d3; color:#555; text-shadow:0 1px 0 #fff; -webkit-box-shadow:0 1px 1px #eaeaea,inset 0 1px 0 #fbfbfb; -moz-box-shadow:0 1px 1px #eaeaea,inset 0 1px 0 #fbfbfb; box-shadow:0 1px 1px #eaeaea,inset 0 1px 0 #fbfbfb; border-radius:1.3em; -moz-border-radius:1.3em; -webkit-border-radius:1.3em}
.button3.white:hover{border-color:#c7c7c7 #c3c3c3 #bebebe; text-shadow:0 1px 0 #fdfdfd; -webkit-box-shadow:0 1px 1px #ebebeb,inset 0 1px 0 #f3f3f3; -moz-box-shadow:0 1px 1px #ebebeb,inset 0 1px 0 #f3f3f3; box-shadow:0 1px 1px #ebebeb,inset 0 1px 0 #f3f3f3}
#windown_box{width:480px; background-color:#fff}
#windown_box .pop_close:hover{color:#f04848}
#windown_box .pop_close:hover{-webkit-transform:rotate(180deg); -moz-transform:rotate(180deg); transform:rotate(180deg)}
#windown_box .pop_title{border-bottom:1px solid #dcdcdc; height:60px; line-height:60px; overflow:hidden; padding:0 20px; position:relative}
#windown_box .pop_title .pop_name{float:left; font-family:"Microsoft YaHei"; font-size:20px}
#windown_box .pop_title a.a_underline{float:right; font-size:12px}
#windown_box .pop_content{font-size:12px; padding:0 90px 40px}

.two_weeks .loginbox_reg{margin-left:126px}
.notice_error{color:#f46060; padding-bottom:10px; text-align:center}
.two_weeks .ckeckBox{color:#999}
.two_weeks label{color:#666; cursor:pointer; padding-right:26px}
.modal_backdrop{position:fixed; top:0; right:0; bottom:0; left:0; z-index:1040; background-color:#000}
.modal_backdrop.fade{opacity:0}
.modal_backdrop,.modal_backdrop.fade.in{opacity:.8; filter:alpha(opacity=80)}

.modal.fade{top:-25%; -webkit-transition:opacity .3s linear,top .3s ease-out; -moz-transition:opacity .3s linear,top .3s ease-out; -o-transition:opacity .3s linear,top .3s ease-out; transition:opacity .3s linear,top .3s ease-out}
.modal.fade.in{top:18%}
.detail_foot{width:760px; margin:0 auto; overflow:hidden}
.comments .title{font-family:"Microsoft YaHei"; font-size:18px; font-weight:normal; height:40px; line-height:40px; overflow:hidden}
.comments .num_area{color:#999; font-size:12px; font-weight:normal}
.comments .comment_send{font-size:12px; position:relative; padding:20px 0; border-top:1px solid #dcdcdc;}
.comment_avatar{float:left; width:60px; text-align:center}
.userPic{display:block}
.comments .comment_send .userPic{height:60px; margin-right:20px; width:60px}
.userPic img{-webkit-border-radius:100%; -moz-border-radius:100%; -ms-border-radius:100%; -o-border-radius:100%; border-radius:100%}
.textarea_comment{width:658px; border:1px solid #dcdcdc; -webkit-border-radius:5px; -moz-border-radius:5px; -ms-border-radius:5px; -o-border-radius:5px; border-radius:5px; color:#ccc; font-size:12px; height:60px; line-height:20px; margin-bottom:10px; padding:10px; overflow:hidden}
.comments .comment_sendPart{padding-left:80px; position:relative}
.comments .btn_p{position:relative}
.comment_send .comment_tip{top:36px; position:absolute; right:180px; font-size:12px; height:0; overflow:hidden; color:#f04848}
.comment_wrap .comment_tip{top:29px; position:absolute; right:120px; font-size:12px; height:0; overflow:hidden; color:#f04848}
span.emotion:hover{background-position:2px -28px}
.btn_p .btn_subGrey{-webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; color:#fff; font-size:14px; height:40px; text-align:center; width:150px; border:0; float:right}
.comment_list{border-bottom:1px solid #dcdcdc; margin-bottom:16px; padding-bottom:20px}
.comment_list .comment_avatar{font-size:12px; padding-right:16px; position:relative; text-align:center; width:36px; float:left}
.comment_list .userPic{height:36px; margin-bottom:4px; width:36px}
.grey{color:#999}
.comment_conBox{color:#666; float:left; width:700px}
.comment_conBox img{position:relative; top:2px}
.comment_avatar_time{overflow:hidden; height:26px}
.comment_avatar_time .time{float:right; margin-top:2px}
.time{color:#999; font-size:12px}
.blockquote_wrap{margin-bottom:10px; padding-top:8px}
.comment_blockquote{background-color:#f8f8f8; border:1px solid #dcdcdc; margin-top:-1px; padding:15px 19px}
.reply_area{display:none}
.reply_area textarea{height:40px; margin:5px 0 12px; padding:5px; width:688px; color:#666}
.reply_area .btn{width:70px; height:28px; font-size:12px; line-height:26px}
.comment_floor{color:#999; float:right; margin:-14px -12px 0 0}
.comment_con{overflow:hidden; padding-right:15px; width:650px}
.comment_con p{display:inline; word-break:break-all; word-wrap:break-word}
.comment_action{text-align:right; float:right}
.comment_action a,.comment_action_sub a{color:#999; font-size:12px; padding-left:12px; text-decoration:none}
.smileBoxOuter{background-color:#f5f5f5; border:1px solid #dcdcdc; clear:both; height:176px; padding:12px; position:absolute; width:386px; display:none; z-index:800}
ul.smileBox{width:386px; height:140px}
ul.smileBox li{width:36px; height:36px; float:left; margin:-1px 0 0 -1px; padding:0; border-bottom:0}
ul.smileBox li a:hover{border:1px solid #f04848; background-color:#f9f9f9; position:relative; z-index:2}

.smilePage{text-align:right; width:384px; line-height:24px; padding-top:12px}
.smilePage a{display:inline-block; width:24px; height:24px; margin-left:10px; text-align:center; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px}
.smilePage a:hover,.smilePage a.current{background-color:#f04848; color:#fff; font-weight:bold; text-decoration:none}
.pagination{text-align:center; margin:20px 0; overflow:hidden}
.pagination li{display:inline; min-width:24px; height:24px; line-height:24px; padding-right:10px; color:#5188a6}
.pagination li.jumpToPage{color:#999; padding-left:10px}
.pagination a{display:inline-block; padding:0 8px; color:#5188a6}
.pagination a:hover,.pagination .pageCurrent,.pagination .pageCurrent:hover{background-color:#f04848; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; color:#fff; font-weight:bold}
.pagination .pageup a:hover,.pagination .pagedown a:hover{background-color:#fff; -webkit-border-radius:0; -moz-border-radius:0; -ms-border-radius:0; -o-border-radius:0; border-radius:0; color:#5188a6; font-weight:normal; text-decoration:underline}
.pagination .noClick a,.pagination .noClick a:hover{background-color:#fff; -webkit-border-radius:0; -moz-border-radius:0; -ms-border-radius:0; -o-border-radius:0; border-radius:0; color:#999; font-weight:normal; text-decoration:none}
.pagination span{font-family:"SimSun"; font-size:12px}
.input_num{height:22px; line-height:22px; border:1px solid #dcdcdc; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px; padding:0 5px; color:#666; width:26px; margin:0 5px}
.pagination .a_jumpTo{width:36px; height:24px; line-height:24px; background-color:#f04848; color:#fff; padding:0; -webkit-border-radius:2px; -moz-border-radius:2px; -ms-border-radius:2px; -o-border-radius:2px; border-radius:2px}
.pagination .a_jumpTo:hover{font-weight:normal}
.searchReslut_nav{padding-top:10px; overflow:hidden}
.searchReslut_nav li{display:inline; padding-right:30px; height:39px; line-height:39px}
.searchReslut_nav li h2{display:inline; font-size:14px; font-weight:normal}
.searchReslut_nav li.selected_nav{float:right; padding-right:0}
.searchReslut_nav li.selected_nav h1{font-size:14px}
.searchReslut_nav li a{display:inline-block; height:37px; color:#333}
.searchReslut_nav li a:hover{color:#5188a6}
.searchReslut_nav li.current_nav a,.searchReslut_nav li.current_nav a:hover{border-bottom:2px solid #f04848; font-weight:bold; color:#333}
.searchReslut_nav li span{color:#999; font-size:12px; font-weight:normal}
.bshare{float:right; margin:3px 0 0}
.banner{height:250px; position:relative; overflow:hidden; width:600px; float:right}
.banner img{width:600px; height:250px}
.banner .banner_page{position:absolute; right:5px; bottom:10px}
.banner .banner_page_left{background-position:0 0; left:0}
.banner .banner_page_left:hover{background-position:-30px 0}
.banner .banner_page_right{background-position:0 -75px; right:0}
.banner .banner_page_right:hover{background-position:-30px -75px}
.banner_page a{width:20px; height:20px; line-height:19px; display:inline-block; background-color:#999; color:#FFF; text-align:center; margin-right:7px; border-radius:30px; -moz-border-radius:30px; -webkit-border-radius:30px}
.banner_page a.current,.banner_page a:hover{background-color:#fe4800; text-decoration:none}
.merchant_cats{width:180px; border:1px solid #ddd; position:relative; background-color:#fff}
.merchant_cats .head{background-color:#f9f9f9; height:34px; line-height:34px; border-bottom:1px solid #eee}
.merchant_cats .head h3{color:#666; font-size:16px; font-weight:normal; margin-left:17px}
.merchant_cats .content{padding:5px 0; font-size:14px}
.merchant_cats .content a{height:30px; line-height:30px; padding:2px 22px 2px 24px; vertical-align:middle; display:block; position:relative; color:#484848; font-size:14px}
.merchant_cats .content a span{-webkit-transition:-webkit-transform .2s linear; -moz-transition:-moz-transform .2s linear; -o-transition:-o-transform .2s linear; transition:transform .2s linear; display:inline-block}
.merchant_cats .content a:hover span{-webkit-transform:translateX(8px); -moz-transform:translateX(8px); -ms-transform:translateX(8px); -o-transform:translateX(8px); transform:translateX(8px)}
.merchant_cats .content a.on{background-color:#f7ffe7}
rchant_cats .content .merchant_arrow{display:inline-block; float:right; margin:12px 0 0}
.index_left{width:782px}
.sidebar_per{border:1px solid #DDD; border-top:6px solid #333; float:right; width:308px; background-color:#fff; height:445px; margin-bottom:12px}
.sidebar .sidebar_per{width:275px; height:auto}
.sidebar .sidebar_per dd.sidebar_articles a{width:185px}
.sidebar .sidebar_per dt a.more{margin-right:9px}
.container .index_first{height:250px}
.index_first .sidebar_first{height:243px;position: relative}
.sidebar_per dt{height:40px}
.sidebar_per dt strong{color:#414141; display:inline-block; font-size:18px; margin:5px 9px 0; font-weight:normal}
.sidebar_per dt a{float:right; margin:11px 12px 0 0}
.sidebar_per dd.sidebar_articles a{display:block; width:225px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.apply .btn{width:auto; padding:0 10px; text-decoration:none}
.arrow-right-menu{border-top:5px solid transparent; border-bottom:5px solid transparent; border-left:5px solid #f63; display:none; top:32px}
.sidebar_per dd.sidebar_articles span{float:right; color:#ccc}
span.more-sign{font-family:"SimSun"}
.index_per{margin:12px 0 0; overflow:hidden}
.sidebar_per dt strong .name-en{color:#ddd}
.index_recommend{border:1px solid #e5e5e5; background-color:#fff; width:782px; margin-bottom:12px; height:450px; overflow:hidden}
.index_recommend .head{border-bottom:2px solid #bbb; height:40px; line-height:40px}
.index_recommend .head strong{color:#333; font-size:18px; font-weight:normal; margin-left:17px; width:115px; display:block; float:left}
.index_recommend .head ul{float:left; width:606px;}
.index_recommend .head ul li{float:left; width:86px; height:40px; line-height:42px; font-size:13px; text-align:center; position:relative; cursor:pointer; color:#fff}
.index_recommend .head ul li:hover{color:#f63}
.index_recommend .head ul li.current{border-bottom:2px solid #f63; color:#f63}
.index_recommend .head ul li.current .arrow-up-menu{display:block; left:47%; top:35px}
.index_recommend .head .more{float:right; font-size:12px; margin-right:10px; display:block; position:relative; top:1px}
.more{color:#999}
.index_recommend .content{width:758px; margin:0 0 0 24px; padding:8px 0 0}
.index_recommend .content .per{display:none}
.index_recommend .content .per.current{display:block}
.index_recommend .content ul li{float:left}
.index_recommend .content .ul_pics{height:202px}
.index_recommend .content .ul_pics li{height:190px; margin:12px 14px 0 0; width:235px; overflow:hidden}
.index_recommend .content .ul_pics li a{color:#666; display:block; overflow:hidden}
.index_recommend .content .ul_pics li a:hover,.index_recommend .content ul.ul_words li a:hover,.sidebar_per dd a:hover{color:#ff8400}
.index_recommend .content .ul_pics li a img{margin:0 0 3px; width:233px; height:160px; border:1px solid #ddd}
.index_recommend .content .ul_pics li.three{margin-right:0}
.index_recommend .content ul.ul_words li a{color:#444; display:block; width:219px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
.apply{text-align:center}
.template_description{text-align:left; text-indent:2em}
.template_feature{text-align:left; text-indent:2em; margin:15px 0 8px}
.feature{margin:0 20px 0 0}
.sitemap_li{float:left; width:190px; white-space:nowrap; text-overflow:ellipsis; overflow:hidden}
.description h4{padding:8px 0}
pre{border:1px solid #d7d7d7; background:#fafafa; border-left-width:5px; padding:4px; margin:6px auto; font-size:12px; white-space:pre-wrap; word-wrap:break-word}
.detail .content .demo_image{text-align:center}
.detail .content .demo_image img{border:1px solid #d3d3d3; padding:5px; max-width:760px}
.table_parameters{border-left:1px solid #d3d3d3; border-top:1px solid #d3d3d3; margin:6px auto}
.table_parameters tr.tr_head{background:none repeat scroll 0 0 #f7f7f7; font-weight:bold; padding:6px; text-align:center}
.table_parameters td{border-bottom:1px solid #d3d3d3; border-right:1px solid #d3d3d3; line-height:26px; padding:2px 2px 2px 5px}
.detail .content .table_parameters p{text-indent:0}
.search_select{float:left; width:30px; height:34px}
.like_merge{height:32px; right:6px; overflow:hidden; position:absolute; top:6px; width:115px; display:none}
.like_merge .poster_forward,.like_merge .poster_likes,.like_merge .poster_del,.like_merge .poster_dellike{background:linear-gradient(#fffcfc,#f3f0f0) repeat scroll 0 0; border:1px solid #d6d6d1; border-radius:3px; cursor:pointer; font-size:14px; height:30px; line-height:30px; margin-right:2px; overflow:hidden; padding:0 5px; text-align:center}
.lm_like{background-position:-101px -67px; padding:0 8px;margin-right: 3px}
.lm_liked{background-position:-127px -67px; padding:0 8px}
.lm_shouji{background-position:-158px -66px; padding:0 6px}
.like_merge .poster_likes{line-height:32px}
.declare{background:none repeat scroll 0 0 #e8f5fe; border:1px solid #abcee4; margin:4px 0; padding:6px}
.declare a,.page_nav a{color:#369}
.declare span{font-weight:bold}
.page_nav{background:none repeat scroll 0 0 #f7f7f7; height:26px; line-height:26px; margin:10px auto; padding:4px 2px}
.alipay{margin-top:10px}
.alipay_img img{width:150px}
.sidebar_tags a{background-color:#428bca; color:#fff; display:inline-block; line-height:21px; margin:0 5px 5px 0; opacity:.8; padding:0 6px}
.sidebar_tags{padding:3px 0 8px 16px}
.sidebar_tags a:nth-child(9n){background-color:#4a4a4a}
.sidebar_tags a:nth-child(9n+1){background-color:#428bca}
.sidebar_tags a:nth-child(9n+2){background-color:#5cb85c}
.sidebar_tags a:nth-child(9n+3){background-color:#d9534f}
.sidebar_tags a:nth-child(9n+4){background-color:#567e95}
.sidebar_tags a:nth-child(9n+5){background-color:#b433ff}
.sidebar_tags a:nth-child(9n+6){background-color:#00aba9}
.sidebar_tags a:nth-child(9n+7){background-color:#b37333}
.sidebar_tags a:nth-child(9n+8){background-color:#f60}
.sidebar_tags a{opacity:.80; filter:alpha(opacity=80); color:#fff; background-color:#428bca; display:inline-block; margin:0 5px 5px 0; padding:0 6px; line-height:21px; border-radius:2px; -moz-border-radius:2px; -webkit-border-radius:2px}
.sidebar_per .sidebar_tags a:hover{opacity:1; filter:alpha(opacity=100); text-decoration:none; color:#fff}
.tag_head{background-color:#f7f7f7; border-bottom:1px solid #dcdcdc; padding:10px 20px}
.tag_head h1{font-size:18px; color:#333; font-weight:normal}
.tag_head h1 strong{color:#f60; font-weight:normal}
.ul_foot a{display:inline-block; width:100px}
.disabled{opacity:0.6; filter:alpha(opacity=60);cursor:default;}
.disabled:hover{opacity:0.6; filter:alpha(opacity=60);cursor:default;}
.setting-verify{padding:30px 60px 120px; text-align:center}
.setting-verify h1{font-size:18px}
.setting-verify p{font-size:20px; margin:14px 0 20px}
.verified-status{color:#2ea7e0}
.setting-verify .verify-un{color:#fcb700; display:inline-block; padding-bottom:6px}
.setting-verify .btn{font-size:14px; height:40px; line-height:40px; width:160px; margin-top:20px}
.btn-green{background-color:#39b94e}
.btn-green:hover{background-color:#33a646}
.setting-verify .btn-blue{background-color:#58b9e6; color:#fff; margin-left:15px}
.setting-verify .btn-blue:hover{background-color:#2ea7e0}
.setting-resetpwd{margin:0; padding:30px 60px 60px 70px}
.wlfg-wrap .label-name{color:#656e73; float:left; font-size:14px; height:40px; line-height:40px; text-align:right; width:120px}
.wlfg-wrap .btn-green{font-size:14px; height:40px; line-height:40px; width:160px}
.rlf-tip-wrap{font-size:12px; height:30px; position:relative; top:10px; left:10px}
.detail .head .info a.collection-btn{margin:0 0 0 4px; position:relative; top:1px}
.detail .head .info a.collection-btn:hover{text-decoration:none}
.mmsg-box{border:2px solid #fff; border-radius:2px; box-shadow:0 2px 4px rgba(0,0,0,0.1); left:50%; position:fixed; top:50%; z-index:9999; display:none}
.mmsg-content{color:#fff; font-size:18px; padding:10px 20px 10px 47px}
.mmsg-box-info .mmsg-icon{background-position:0 -40px}
.mmsg-box-info .mmsg-background{background:none repeat scroll 0 0 #2ea7e0; bottom:0; left:0; opacity:.9; position:absolute; right:0; top:0; z-index:-1}
.info .poster_likes{margin-left:5px}
.comment_action_sub{visibility:hidden; float:right; text-align:right}
.blockquote_wrap .reply_area textarea{width:649px}
.order-page{position: absolute; right: 0; top: 8px; z-index: 1;}
.order-page .find_results_num{display: inline-block; text-align: right; width: 205px;}
.order-page .page-small{display: inline-block; margin-right: 5px; text-align: right; width: 115px;}
.order-page a.page-btn{border: 1px solid #dddddd; display: inline-block; height: 22px; margin: 0 5px; position: relative; vertical-align: middle; width: 22px;}
.order-page .arrow-left-none{border-right: 5px solid #ccc;}
.order-page .arrow-left{border-bottom: 5px solid transparent; border-right: 5px solid #666666; border-top: 5px solid transparent; left: 8px; top: 7px;}
.order-page .arrow-right{border-bottom: 5px solid transparent; border-left: 5px solid #666666; border-top: 5px solid transparent; left: 9px; top: 7px;}
.order-page .arrow-left-none{border-right: 5px solid #ccc;}
.order-page .arrow-right-none{border-left: 5px solid #ccc;}
.dl{overflow: hidden;}
.dl dt{clear: both; margin: 20px 0;}
.dl dd{float: left; height: 184px; margin: 0 0 20px 30px; text-align: center; width: 280px;}
.dl img{display: inline-block; margin-bottom: 3px; padding: 5px; vertical-align: middle;}
.dl a{margin: 0 10px;}

.co_login{color: #999; text-align: center;}
.co_login a{padding-left: 12px;}
.tg_classify_all .on .red{color:#FFF}
body .hot-label:hover,body .list-tag:hover{text-decoration: none}
.hot-label, .list-tag {
  background: #edf1f2 none repeat scroll 0 0;
  color: #787d82;
  float: left;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  margin-left:6px;
  padding: 0 10px;
  transition: all 0.25s ease 0s;
  white-space: nowrap;
  word-wrap: break-word;
}
.hot-label:link, .hot-label:visited, .list-tag:link, .list-tag:visited {
  color: #787d82;
}
.hot-label:hover, .list-tag:hover, .custom-content .hot-label.curr, .custom-content .list-tag.curr {
  background-color: #d0d6d9;
  color: #14191e !important;
}

.topic .detail .content p {
  text-indent: 0;
}
.content .short_tit a{margin-right: 5px}
.table_parameters pre{word-wrap: break-word;word-break: normal; max-width:490px;margin:0}

.share-list {
  display: inline-block;
  padding: 0 10px 0 17px;
}

.share-list b {

  width: 12px;
  display: inline-block;
  height: 12px;
}

</style>
