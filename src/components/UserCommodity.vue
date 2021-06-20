<!--<template>-->
<!--  <div>-->
<!--    <div v-if="dialogVisible">-->
<!--      <el-dialog-->
<!--          title="购买商品"-->
<!--          :visible.sync="dialogVisible"-->
<!--          :before-close="handleClose"-->
<!--          width="50%">-->
<!--          <BuyForm></BuyForm>-->
<!--      </el-dialog>-->
<!--    </div>-->

<!--    <el-container>-->
<!--      <el-aside width="10%"></el-aside>-->
<!--      <el-main>-->
<!--        <div>-->
<!--          <el-row class="headline">-->
<!--            <h1>欢迎进入 {{sellerName}} 的商铺</h1>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="6" v-for="(commodity, index) in commodityList" :key="commodity.name" :offset="index%3 === 0 ? 2 : 1">-->
<!--              <el-card style="margin-top: 20px" class="shopCard" :title="commodity.name">-->
<!--                <div>-->
<!--                  <img :src="commodity.url" alt="商品封面" width="100%" class="image">-->
<!--                  <div style="padding: 10px;">-->
<!--                    <el-row>-->
<!--                    <el-col span="15">商品名: {{ commodity.name }} </el-col>-->
<!--                    <el-col span="9">-->
<!--&lt;!&ndash;                      <el-icon  v-on:click="favorite(commodity.id)" :title="收藏"></el-icon>&ndash;&gt;-->
<!--                      <i v-if="!commodity.favorite" @click="addFavorite(commodity.id)" class="star el-icon-star-off" title="收藏"></i>-->
<!--                      <i v-if="commodity.favorite" @click="cancelFavorite(commodity.id)" class="star el-icon-star-on" title="已收藏"></i>-->
<!--                    </el-col>-->
<!--                    </el-row>-->
<!--                    <div class="bottom clearfix">-->
<!--                      <div class="shopKind" style="height: 1em"> 商品价格: ￥{{ commodity.price }}</div>-->
<!--                      <div class="shopKind" style="height: 1em"> 剩余数量: {{ commodity.leftNum }}  件</div>-->
<!--                      <div class="shopKind" style="height: 1em"> 已售数量: {{ commodity.soldNum }}  件</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div>-->
<!--                  <el-button type="success" class="largeButton2"-->
<!--                             v-on:click="buy(commodity.id,commodity.name,commodity.price,commodity.leftNum,commodity.soldNum)" :title="buyNow">购买</el-button>-->
<!--                  <el-button type="warning" icon="el-icon-shopping-cart-2" class="largeButton1"-->
<!--                             v-on:click="addToShoppingCart(commodity.id)" :title="addToCart">购物车</el-button>-->
<!--                  <el-button type="primary" icon="el-icon-message" class="largeButton3"-->
<!--                             v-on:click="commentMethod(commodity.id,commodity.name,commodity.price,commodity.soldNum,commodity.leftNum,commodity.url)" :title="comment"></el-button>-->
<!--&lt;!&ndash;                  <el-button type="success" icon="el-icon-message" circle class="button"&ndash;&gt;-->
<!--&lt;!&ndash;                             v-on:click="commentMethod(commodity.id,commodity.name,commodity.price,commodity.soldNum,commodity.leftNum)" :title="comment"></el-button>&ndash;&gt;-->
<!--                </div>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--        <div style="margin-right: 80px; margin-top: 20px">-->
<!--          <el-pagination-->
<!--              background-->
<!--              layout="prev, pager, next"-->
<!--              :page-size="pageSize"-->
<!--              :total="totalCommodity"-->
<!--              @current-change="handleCurrentChange"-->
<!--              style="float: right">-->
<!--          </el-pagination>-->
<!--        </div>-->
<!--      </el-main>-->
<!--      &lt;!&ndash;      <el-aside width="10%"></el-aside>&ndash;&gt;-->
<!--      <el-aside width="15%">-->
<!--        <el-button @click="toHome" type="primary" icon="el-icon-back" circle-->
<!--                   size="medium"-->
<!--                   style="margin-top: 12px">返回</el-button>-->
<!--      </el-aside>-->
<!--    </el-container>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import BuyForm from "@/components/BuyForm";-->

<!--export default {-->
<!--  name: "UserCommodity",-->
<!--  components:{BuyForm},-->
<!--  data() {-->
<!--    return {-->
<!--      commodity: {-->
<!--        id: "",-->
<!--        name: "",-->
<!--        price: "",-->
<!--        leftNum: "",-->
<!--        soldNum: "",-->
<!--        favorite: false,-->
<!--        url:""-->
<!--      },-->
<!--      commodityInfoList: {-->
<!--        soldNum: "",-->
<!--        leftNum: "",-->
<!--      },-->
<!--      commodityList: {},-->
<!--      totalCommodity: 6,-->
<!--      pageNum: 1,-->
<!--      pageSize: 6,-->
<!--      sellerName: "",-->
<!--      buyNow: "立即购买",-->
<!--      addToCart: "加入购物车",-->
<!--      comment: "查看商品评论",-->
<!--      dialogVisible: false,-->
<!--      selectNum: 1,-->
<!--      userId: "",-->
<!--      sellerId: "",-->
<!--    }-->
<!--  },-->
<!--  //页面初始化完成后要加载的东西-->
<!--  created() {-->
<!--    this.userId = localStorage.getItem('userId');-->
<!--    this.sellerId = localStorage.getItem('sellerId')-->
<!--    this.getUserCommodityList();-->
<!--    if (this.$route.params.isReload == 'true') {-->
<!--      this.$router.go(0);-->
<!--    }-->
<!--    this.getSellerName();-->
<!--  },-->
<!--  methods: {-->
<!--    cancelFavorite: function(commodityId){-->
<!--      const _this = this;-->
<!--      let formData = new FormData;-->
<!--      formData.append('userId', _this.userId);-->
<!--      formData.append('commodityId', commodityId);-->
<!--      formData.append('sellerId', _this.sellerId);-->
<!--      this.$axios.post('/commodity/cancelFavoriteCommodity', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->
<!--      }).then(function () {-->
<!--        _this.$message({-->
<!--          message : "取消收藏",-->
<!--          type: 'success'-->
<!--        })-->
<!--        _this.$router.go(0);-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      })-->
<!--    },-->
<!--    addFavorite: function(commodityId){-->
<!--      const _this = this;-->
<!--      let formData = new FormData;-->
<!--      formData.append('userId', _this.userId);-->
<!--      formData.append('commodityId', commodityId);-->
<!--      formData.append('sellerId', _this.sellerId);-->
<!--      this.$axios.post('/commodity/favoriteCommodity', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->
<!--      }).then(function () {-->
<!--        _this.$message({-->
<!--          message : "收藏成功",-->
<!--          type: 'success'-->
<!--        })-->
<!--        _this.$router.go(0);-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      })-->
<!--    },-->
<!--    buy: function(commodityId,commodityName,commodityPrice,commodityLeftNum,commoditySoldNum) {-->
<!--      localStorage.setItem('commodityId',commodityId);-->
<!--      localStorage.setItem('commodityName',commodityName);-->
<!--      localStorage.setItem('commodityPrice',commodityPrice);-->
<!--      localStorage.setItem('commodityLeftNum',commodityLeftNum);-->
<!--      localStorage.setItem('commoditySoldNum',commoditySoldNum);-->
<!--      this.dialogVisible = true;-->
<!--    },-->
<!--    addToShoppingCart: function(commodityId) {-->
<!--      const _this = this;-->
<!--      let formData = new FormData;-->
<!--      formData.append('userId', _this.userId);-->
<!--      formData.append('commodityId', commodityId);-->
<!--      formData.append('selectNum', _this.selectNum);-->
<!--      formData.append('sellerId', _this.sellerId);-->
<!--      this.$axios.post('/cart/selectCommodity', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->
<!--      }).then(function () {-->
<!--        _this.$message({-->
<!--          message : "成功加入到购物车中",-->
<!--          type: 'warning'-->
<!--        })-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      })-->
<!--    },-->
<!--    toHome: function() {-->
<!--      this.$router.push({name: 'Home', params: {isReload: 'true'}})-->
<!--    },-->
<!--    toDetail: function(commodityID){-->
<!--      this.$message({-->
<!--        message : commodityID+"为商品ID",-->
<!--        type: 'success'-->
<!--      })-->
<!--    },-->
<!--    getUserCommodityList: function () {-->
<!--      const _this = this;-->
<!--      let formData = new FormData;-->
<!--      formData.append('pageNum', _this.pageNum);-->
<!--      formData.append('pageSize', _this.pageSize);-->
<!--      formData.append('userId', localStorage.getItem('userId'));-->
<!--      formData.append('sellerId', localStorage.getItem('sellerId'));-->
<!--      this.$axios.post('/commodity/getUserCommodityList', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->
<!--      }).then(function (response) {-->
<!--        // 这里是处理正确的回调-->
<!--        _this.commodityList = response.data.data.list;-->
<!--        _this.totalCommodity = response.data.data.total;-->
<!--        _this.pageNum = response.data.data.pageNum;-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      })-->
<!--    },-->
<!--    handleCurrentChange: function (pageNum) {-->
<!--      this.pageNum = pageNum;-->
<!--      this.getUserCommodityList();-->
<!--    },-->
<!--    handleClose(done) {-->
<!--      this.getUserCommodityList();-->
<!--      done();-->
<!--    },-->
<!--    getSellerName: function(){-->
<!--      this.sellerName = localStorage.getItem("sellerName");-->
<!--    },-->
<!--    commentMethod: function(commodityID,commodityName,commodityPrice,commoditySoldNum,commodityLeftNum,commodityUrl){-->
<!--      localStorage.setItem('commodityID',commodityID);-->
<!--      localStorage.setItem('commodityName',commodityName);-->
<!--      localStorage.setItem('commodityPrice',commodityPrice);-->
<!--      localStorage.setItem('commoditySoldNum',commoditySoldNum);-->
<!--      localStorage.setItem('commodityLeftNum',commodityLeftNum);-->
<!--      localStorage.setItem('commodityUrl',commodityUrl);-->

<!--      this.$router.push({name: 'UserComment', params: {isReload: 'true'}});-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.star{-->
<!--  margin-left: 10px;-->
<!--  font-size: 25px;-->
<!--}-->

<!--.largeButton1{-->
<!--  padding: 0;-->
<!--  height: 40px;-->
<!--  width: 90px;-->
<!--  float: right;-->
<!--  margin-left: 10px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.largeButton2{-->
<!--  padding: 0;-->
<!--  height: 40px;-->
<!--  width: 60px;-->
<!--  float: right;-->
<!--  margin-left: 10px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.largeButton3{-->
<!--  padding: 0;-->
<!--  height: 40px;-->
<!--  width: 50px;-->
<!--  float: right;-->
<!--  margin-left: 5px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.headline{-->
<!--  font-family:courier;-->
<!--  padding-left: 430px;-->
<!--  font-size: 18px;-->
<!--  color: #999;-->
<!--}-->

<!--.shopKind {-->
<!--  font-size: 13px;-->
<!--  color: #999;-->
<!--  overflow: hidden;-->
<!--}-->

<!--.bottom {-->
<!--  margin-top: 10px;-->
<!--  line-height: 13px;-->
<!--}-->

<!--.image {-->
<!--  width: 230px;-->
<!--  height:170px;-->
<!--  display: block;-->
<!--}-->

<!--.clearfix:before,-->
<!--.clearfix:after {-->
<!--  display: table;-->
<!--  content: "";-->
<!--}-->

<!--.clearfix:after {-->
<!--  clear: both-->
<!--}-->

<!--.shopCard:hover {-->
<!--  cursor: pointer;-->
<!--  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);-->
<!--}-->
<!--</style>-->




<template>
  <div>
    <div v-if="dialogVisible">
      <el-dialog
          title="购买商品"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <BuyForm></BuyForm>
      </el-dialog>
    </div>

    <el-container>
      <el-aside width="10%"></el-aside>
      <el-main>
        <div class="main-wrapper">
          <!-- Begin Hiraola's Breadcrumb Area -->
          <div class="breadcrumb-area">
            <div class="container">
              <div class="breadcrumb-content">
              </div>
            </div>
          </div>
          <!-- Hiraola's Breadcrumb Area End Here -->

          <!-- Begin Hiraola's Content Wrapper Area -->
          <div class="hiraola-content_wrapper">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 order-2 order-lg-1">
                  <div class="hiraola-sidebar-catagories_area">
                    <div class="hiraola-sidebar_categories">
                      <div class="hiraola-categories_title">
                        <h3>{{sellerName}}</h3>
                      </div>
                      <h5>欢迎来到{{sellerName}}</h5>

                    </div>
                    <div class="hiraola-sidebar_categories">
                      <div class="hiraola-categories_title">
                        <h5>本店商品</h5>
                      </div>
                      <ul class="sidebar-checkbox_list">
                        <li>
                          <a href="javascript:void(0)">活动款</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">促销款</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">限量款</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">全部商品</a>
                        </li>
                      </ul>
                    </div>
                    <div class="category-module hiraola-sidebar_categories">
                      <div class="category-module_heading">
                        <h5>Categories</h5>
                      </div>
                      <div class="module-body">
                        <ul class="module-list_item">
                          <li>
                            <a href="javascript:void(0)">电子</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">运动</a>
                            <a href="javascript:void(0)">食品</a>
                            <a href="javascript:void(0)">服饰</a>
                            <a href="javascript:void(0)">金银首饰</a>
                            <a href="javascript:void(0)">生活用品</a>
                            <a href="javascript:void(0)">其他</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="col-lg-9 order-1 order-lg-2">
                  <div class="shop-toolbar">
                    <div class="product-view-mode">
                      <a class="active grid-3" data-target="gridview-3" data-toggle="tooltip" data-placement="top" title="Grid View"><i class="fa fa-th"></i></a>
                    </div>
                    <div class="product-item-selection_area">
                      <div class="product-short">
                        <label class="select-label">排序:</label>
                        <select class="nice-select">
                          <option value="1">默认</option>

                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="shop-product-wrap grid gridview-3 row">


                    <el-row>
                      <el-col :span="6" v-for="(commodity, index) in commodityList" :key="commodity.name" :offset="index%3 === 0 ? 2 : 1">
                        <el-card style="margin-top: 20px" class="shopCard" :title="commodity.name">
                          <div>
                            <img :src="commodity.url" alt="商品封面" width="100%" class="image">
                            <div style="padding: 10px;">
                              <el-row>
                                <el-col span="15">商品名: {{ commodity.name }} </el-col>
                                <el-col span="9">
                                  <!--                      <el-icon  v-on:click="favorite(commodity.id)" :title="收藏"></el-icon>-->
                                  <i v-if="!commodity.favorite" @click="addFavorite(commodity.id)" class="star el-icon-star-off" title="收藏"></i>
                                  <i v-if="commodity.favorite" @click="cancelFavorite(commodity.id)" class="star el-icon-star-on" title="已收藏"></i>
                                </el-col>
                              </el-row>
                              <div class="bottom clearfix">
                                <div class="shopKind" style="height: 1em"> 商品价格: ￥{{ commodity.price }}</div>
                                <div class="shopKind" style="height: 1em"> 剩余数量: {{ commodity.leftNum }}  件</div>
                                <div class="shopKind" style="height: 1em"> 已售数量: {{ commodity.soldNum }}  件</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <el-button type="success" class="largeButton2"
                                       v-on:click="buy(commodity.id,commodity.name,commodity.price,commodity.leftNum,commodity.soldNum,commodity.url)" :title="buyNow">购买</el-button>
                            <el-button type="warning" icon="el-icon-shopping-cart-2" class="largeButton1"
                                       v-on:click="addToShoppingCart(commodity.id)" :title="addToCart">购物车</el-button>
                            <el-button type="primary" icon="el-icon-message" class="largeButton3"
                                       v-on:click="commentMethod(commodity.id,commodity.name,commodity.price,commodity.soldNum,commodity.leftNum)" :title="comment"></el-button>
                            <!--                  <el-button type="success" icon="el-icon-message" circle class="button"-->
                            <!--                             v-on:click="commentMethod(commodity.id,commodity.name,commodity.price,commodity.soldNum,commodity.leftNum)" :title="comment"></el-button>-->
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>


                  </div>
                  <div style="margin-right: 80px; margin-top: 20px">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :total="totalCommodity"
                        @current-change="handleCurrentChange"
                        style="float: right">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Hiraola's Content Wrapper Area End Here -->

        </div>

      </el-main>
      <!--      <el-aside width="10%"></el-aside>-->
      <el-aside width="15%">
        <el-button @click="toHome" type="primary" icon="el-icon-back" circle
                   size="medium"
                   style="margin-top: 12px">返回</el-button>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import BuyForm from "@/components/BuyForm";

export default {
  name: "UserCommodity",
  components:{BuyForm},
  data() {
    return {
      commodity: {
        id: "",
        name: "",
        price: "",
        leftNum: "",
        soldNum: "",
        favorite: false,
      },
      commodityInfoList: {
        soldNum: "",
        leftNum: "",
      },
      commodityList: {},
      totalCommodity: 6,
      pageNum: 1,
      pageSize: 6,
      sellerName: "",
      buyNow: "立即购买",
      addToCart: "加入购物车",
      comment: "查看商品评论",
      dialogVisible: false,
      selectNum: 1,
      userId: "",
      sellerId: "",
    }
  },
  //页面初始化完成后要加载的东西
  created() {
    this.userId = localStorage.getItem('userId');
    this.sellerId = localStorage.getItem('sellerId')
    this.getUserCommodityList();
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
    this.getSellerName();
  },
  methods: {
    cancelFavorite: function(commodityId){
      const _this = this;
      let formData = new FormData;
      formData.append('userId', _this.userId);
      formData.append('commodityId', commodityId);
      formData.append('sellerId', _this.sellerId);
      this.$axios.post('/commodity/cancelFavoriteCommodity', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        _this.$message({
          message : "取消收藏",
          type: 'success'
        })
        _this.$router.go(0);
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    addFavorite: function(commodityId){
      const _this = this;
      let formData = new FormData;
      formData.append('userId', _this.userId);
      formData.append('commodityId', commodityId);
      formData.append('sellerId', _this.sellerId);
      this.$axios.post('/commodity/favoriteCommodity', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        _this.$message({
          message : "收藏成功",
          type: 'success'
        })
        _this.$router.go(0);
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    buy: function(commodityId,commodityName,commodityPrice,commodityLeftNum,commoditySoldNum,commodityUrl) {
      localStorage.setItem('commodityId',commodityId);
      localStorage.setItem('commodityName',commodityName);
      localStorage.setItem('commodityPrice',commodityPrice);
      localStorage.setItem('commodityLeftNum',commodityLeftNum);
      localStorage.setItem('commoditySoldNum',commoditySoldNum);
      localStorage.setItem('commodityUrl',commodityUrl);
      this.dialogVisible = true;
    },
    addToShoppingCart: function(commodityId) {
      const _this = this;
      let formData = new FormData;
      formData.append('userId', _this.userId);
      formData.append('commodityId', commodityId);
      formData.append('selectNum', _this.selectNum);
      formData.append('sellerId', _this.sellerId);
      this.$axios.post('/cart/selectCommodity', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        _this.$message({
          message : "成功加入到购物车中",
          type: 'warning'
        })
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    toHome: function() {
      this.$router.push({name: 'Home', params: {isReload: 'true'}})
    },
    toDetail: function(commodityID){
      this.$message({
        message : commodityID+"为商品ID",
        type: 'success'
      })
    },
    getUserCommodityList: function () {
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('sellerId', localStorage.getItem('sellerId'));
      this.$axios.post('/commodity/getUserCommodityList', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.commodityList = response.data.data.list;
        _this.totalCommodity = response.data.data.total;
        _this.pageNum = response.data.data.pageNum;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getUserCommodityList();
    },
    handleClose(done) {
      this.getUserCommodityList();
      done();
    },
    getSellerName: function(){
      this.sellerName = localStorage.getItem("sellerName");
    },
    commentMethod: function(commodityID,commodityName,commodityPrice,commoditySoldNum,commodityLeftNum){
      localStorage.setItem('commodityID',commodityID);
      localStorage.setItem('commodityName',commodityName);
      localStorage.setItem('commodityPrice',commodityPrice);
      localStorage.setItem('commoditySoldNum',commoditySoldNum);
      localStorage.setItem('commodityLeftNum',commodityLeftNum);

      this.$router.push({name: 'UserComment', params: {isReload: 'true'}});
    }
  }
}
</script>

<style scoped>
.star{
  margin-left: 10px;
  font-size: 25px;
}

.largeButton1{
  font-size: 13px;
  padding: 0;
  height: 35px;
  width: 60px;
  float: right;
  margin-left: 5px;
  margin-bottom: 10px;
}

.largeButton2{
  font-size: 13px;
  padding-left: 1px;
  height: 35px;
  width: 50px;
  float: right;
  margin-left: 6px;
  margin-bottom: 10px;
}

.largeButton3{
  font-size: 13px;
  padding: 0;
  height: 35px;
  width: 40px;
  float: right;
  margin-bottom: 10px;
}

.headline{
  font-family:courier;
  padding-left: 430px;
  font-size: 18px;
  color: #999;
}

.shopKind {
  font-size: 13px;
  color: #999;
  overflow: hidden;
}

.bottom {
  margin-top: 10px;
  line-height: 13px;
}

.image {
  width: 230px;
  height:170px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.shopCard:hover {
  cursor: pointer;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
}
</style>
<style src="../css/style3.css" scoped></style>
<!--<style src="../css/style.min3.css" scoped>-->
<!--</style>-->
