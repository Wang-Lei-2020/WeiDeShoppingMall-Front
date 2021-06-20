<template>
  <el-form>
    <el-container>
      <el-main>
        <div>
          <div>
            <el-row class="top">
              <el-col span="5" class="buyNum"> 收货人地址信息: </el-col>
              <el-col span = 15 class="input">
                <el-select v-model="address" placeholder="请选择收货人地址" style="width: 90%">
                  <el-option v-for="address in addressList" :key="address.id" :label="address.name+address.addressInfo" :value="address.id" >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>

            <el-row class="top">
              <el-col span="5" class="buyNum"> 收货人姓名: </el-col>
              <el-col span = 15 class="input">
                <el-input v-model="localAddress.receiver" type="tel" style="width: 90%" placeholder="请输入收货人姓名" readonly></el-input>
              </el-col>
            </el-row>

            <el-row class="top">
              <el-col span="5" class="buyNum"> 收货人联系方式: </el-col>
              <el-col span = 15 class="input">
                <el-input v-model="localAddress.phone" type="text" style="width: 90%" placeholder="请输入收货人的联系方式" readonly></el-input>
              </el-col>
            </el-row>

            <el-row class="top">
              <el-col span="5" class="buyNum"> 订单备注: </el-col>
              <el-col span = 15 class="input">
                <el-input v-model="remark" type="text" style="width: 90%" placeholder="请输入备注信息" clearable></el-input>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="6" class="buyNum"> 请选择支付方式: </el-col>
              <el-col span="15" class="top">
                <el-button type="success" class="largeButton2"
                           v-on:click="weChat()">WeChat</el-button>
                <el-button type="primary" class="largeButton1"
                           v-on:click="zhifubao()">支付宝</el-button>
                <el-button type="warning" class="largeButton1"
                           v-on:click="qianbao()">钱包</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
      <!--      <el-aside width="10%"></el-aside>-->
    </el-container>
  </el-form>
</template>

<script>
export default {
  name: "BuyFormCart",
  data() {
    return {
      commodity: {
        id: "",
        name: "",
        price: "",
        leftNum: "",
        soldNum: ""
      },
      addressList:{},
      localAddress: {
        id:"",
        userId:"",
        name:"",
        addressInfo:"",
        phone:"",
        receiver:"",
      },
      order: {
        userId:"",
        commodityId:"",
        sellerId:"",
        payId:"",
        addressId:"",
        price:0,
      },
      buyNum: 1,
      telephone: "",
      totalAddress: "",
      remark: "",
      isWeChat: false,
      isZhiFuBao: false,
      isQianBao: false,
      pageNum:1,
      pageSize:100,
      address:"",
      payId:1,
      price:0,
    }
  },
  watch:{
    address(newName){
      localStorage.setItem('addressId',newName);
      this.selectAddress();
    }
  },
  created() {
    this.getAddressList();
    this.price = localStorage.getItem('commodityPrice');
  },
  computed: {
    getCommodityName: function() {
      return localStorage.getItem('commodityName');
    },
    getCommodityPrice: function() {
      return localStorage.getItem('commodityPrice');
    },
    getCommodityLeft: function() {
      return localStorage.getItem('commodityLeftNum');
    },
    getCommoditySold: function() {
      return localStorage.getItem('commoditySoldNum');
    }
  },
  methods: {
    selectAddress: function(){
      const _this = this;
      let formData = new FormData;
      formData.append('addressId', localStorage.getItem('addressId'));
      this.$axios.post('/order/pay/selectAddress', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.localAddress.id = response.data.data.id;
        _this.localAddress.userId = response.data.data.userId;
        _this.localAddress.name = response.data.data.name;
        _this.localAddress.addressInfo = response.data.data.addressInfo;
        _this.localAddress.phone = response.data.data.phone;
        _this.localAddress.receiver = response.data.data.receiver;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    getAddressList: function() {
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('userId', localStorage.getItem('userId'));
      this.$axios.post('/address/addressList', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.addressList = response.data.data.list;
        _this.totalAddress = response.data.data.total;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    weChat: function(){
      this.isWeChat = true;
      this.isZhiFuBao = false;
      this.isQianBao = false;
      this.payId = 1;
      localStorage.setItem('payId',"1");
    },
    zhifubao: function(){
      this.isWeChat = false;
      this.isZhiFuBao = true;
      this.isQianBao = false;
      this.payId = 2;
      localStorage.setItem('payId',"2");
    },
    qianbao: function(){
      this.isWeChat = false;
      this.isZhiFuBao = false;
      this.isQianBao = true;
      this.payId = 3;
      localStorage.setItem('payId',"3");
    },
    paySuccess:function() {
      const _this = this;
      _this.order.userId = localStorage.getItem('userId');
      _this.order.commodityId = localStorage.getItem('commodityId');
      _this.order.sellerId = localStorage.getItem('sellerId');
      _this.order.payId = _this.payId;
      _this.order.addressId = localStorage.getItem('addressId');
      _this.order.price = _this.price * _this.buyNum;

      this.$axios.post('/order/pay/direct', _this.order, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        // 这里是处理正确的回调
        _this.$router.go(0);
        _this.$message({
          message : "购买成功",
          type: 'success'
        })
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    }
  }

}
</script>

<style scoped>
.shopKind {
  font-size: 13px;
  color: #999;
  overflow: hidden;
}

.bottom {
  margin-top: 10px;
  line-height: 13px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.info{
  margin-top: 100px;
}

.buyNum{
  font-size: 18px;
  margin-top: 20px;
  margin-left: 50px;
}

.button {
  padding: 0;
  float: right;
  margin-left: 10px;
}

.buttonRight{
  margin-right: 50px;
}

.top{
  margin-top: 10px;
}

.largeButton1{
  height: 40px;
  width: 100px;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}

.largeButton2{
  height: 40px;
  width: 90px;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
}

.input{
  margin-top: 15px;
}

.juzhong{
  margin-top: 20px;
  margin-left: 200px;
}

.payText{
  margin-left: 290px;
}

.paySuccess{
  margin-top: 140px;
}
</style>
