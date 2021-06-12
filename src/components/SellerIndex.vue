<template>
  <div>
    <el-container>
      <el-aside width="10%"></el-aside>
      <el-main>
        <div>
          <el-row>
            <el-col :span="6" v-for="(commodity, index) in commodityList" :key="commodity.id" :offset="index%3 === 0 ? 2 : 1">
              <el-card style="margin-top: 40px" class="shopCard" :title="commodity.id">
                <div v-on:click="detail(commodity.id)">
                  <img src="../assets/商铺.jpg" alt="商品封面" width="100%" class="image">
                  <div style="padding: 10px;">
                    <span>商品名： {{ commodity.name }}</span>
                    <div class="bottom clearfix">
                      <div class="shopKind" style="height: 2em"> 商品价格: {{ commodity.price }}</div>
<!--                      <div class="shopKind" style="height: 1em"> 联系方式: {{ commodity.left }}</div>-->
                    </div>
                  </div>
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
      </el-main>
      <el-aside width="10%"></el-aside>
    </el-container>
  </div>



</template>

<script>
export default {
name: "SellerIndex",
  data() {
    return {
      commodityList: {},
      totalCommodity: 90,
      pageNum: 1,
      pageSize: 6,
      dialogVisible: false
    }
  },
  //页面初始化完成后要加载的东西
  created() {
    //因为此方法还未实现，界面会卡在此处，不进行以下刷新页面操作
    this.getCommodityList();
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
  },
  method: {
    getCommodityList: function () {
      print();
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      this.$axios.post('/sellerIndex/commoditylist', formData, {
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
      this.getCommodityList();
    },
    handleClose(done) {
      this.getCommodityList();
      done();
    },
    detail: function (commodityID) {
      this.$message({
        message : commodityID+"为商品ID",
        type: 'success'
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

.button {
  padding: 0;
  float: right;
  margin-left: 20px;
  margin-bottom: 10px;
}

.image {
  width: 100%;
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
