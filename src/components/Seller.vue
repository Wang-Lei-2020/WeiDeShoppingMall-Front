<template>
  <div>
    <el-dialog
        title="添加商品"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="40%">
      <BookForm></BookForm>
    </el-dialog>

    <div v-if="dialogVisible2">
      <el-dialog
          title="修改商品信息"
          :visible.sync="dialogVisible2"
          :before-close="handleClose"
          width="40%">
        <ModifyCommodityForm></ModifyCommodityForm>
      </el-dialog>
    </div>

    <el-container>
      <el-aside width="10%"></el-aside>
      <el-main>
        <div>
          <el-row>
            <el-col :span="6" v-for="(commodity, index) in commodityList" :key="commodity.name" :offset="index%3 === 0 ? 2 : 1">
              <el-card style="margin-top: 40px" class="shopCard" :title="commodity.name">
                <div v-on:click="modifyCommodityMethod(commodity.id,commodity.name,commodity.price,commodity.leftNum)">
                  <img :src=commodity.url alt="商品封面" width="100%" class="image">
                  <div style="padding: 10px;">
                    <span>商品名: {{ commodity.name }} </span>
                    <div class="bottom clearfix">
                      <div class="shopKind" style="height: 1em"> 商品价格: ￥{{ commodity.price }}</div>
                      <div class="shopKind" style="height: 1em"> 剩余数量: {{ commodity.leftNum }}  件</div>
                      <div class="shopKind" style="height: 1em"> 已售数量: {{ commodity.soldNum }}  件</div>
                    </div>
                  </div>
                </div>
                <div>
                  <el-button v-if="!isManager" type="danger" icon="el-icon-delete" circle class="button"
                             v-on:click="onDelete(commodity.id,sellerName)" :title="deleteCommodity"></el-button>
                  <el-button type="primary" icon="el-icon-edit-outline" circle class="button"
                             v-on:click="modifyCommodityMethod(commodity.id,commodity.name,commodity.price,commodity.leftNum)" :title="modifyCommodity"></el-button>
                  <el-button type="success" icon="el-icon-message" circle class="button"
                             v-on:click="commentMethod(commodity.id,commodity.name,commodity.price,commodity.soldNum,commodity.leftNum,commodity.url)" :title="comment"></el-button>
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
      <!--      <el-aside width="10%"></el-aside>-->
      <el-aside width="15%">
        <el-button v-if="!isManager" @click="dialogVisible = true" type="primary" icon="el-icon-plus" circle
                   size="large" class="add" title="添加商品"></el-button>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import BookForm from "@/components/BookForm";
import ModifyCommodityForm from "@/components/ModifyCommodityForm";

export default {
  name: "Seller",
  components: {ModifyCommodityForm, BookForm},
  data() {
    return {
      commodity: {
        id: "",
        name: "",
        price: "",
        leftNum: "",
        soldNum: "",
        url:""
      },
      commodityInfoList: {
        soldNum: "",
        leftNum: "",
      },
      commodityList: {},
      totalCommodity: 6,
      pageNum: 1,
      pageSize: 6,
      dialogVisible: false,
      dialogVisible2: false,
      isManager : false,
      sellerName: "",
      deleteCommodity: "删除商品",
      modifyCommodity: "修改商品信息",
      comment: "查看商品评论",
    }
  },
  //页面初始化完成后要加载的东西
  created() {
    this.getCommodityList();
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
    this.getSellerName();
  },
  methods: {
    toDetail: function(commodityID){
      this.$message({
        message : commodityID+"为商品ID",
        type: 'success'
      })
    },
    getCommodityList: function () {
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('name', localStorage.getItem('username'));
      this.$axios.post('/seller/commoditylist', formData, {
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
    onDelete: function(commodityID,sellerName){
      //print();
      const _this = this;
      let formData = new FormData;
      formData.append('commodityId', commodityID);
      formData.append('sellerName', sellerName);
      _this.$axios.post('/commodity/deleteCommodity', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        //print();
        // 这里是处理正确的回调
        _this.$router.go(0);
        _this.$message({
          message : "删除商品成功",
          type: 'success'
        });
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    getSellerName: function(){
      this.sellerName = localStorage.getItem("username");
    },
    modifyCommodityMethod: function(commodityID,commodityName,commodityPrice,commodityLeftNum){
      localStorage.setItem('commodityID',commodityID)
      localStorage.setItem('commodityName',commodityName);
      localStorage.setItem('commodityPrice',commodityPrice);
      localStorage.setItem('leftNum',commodityLeftNum);
      this.dialogVisible2 = true;
    },
    commentMethod: function(commodityID,commodityName,commodityPrice,commoditySoldNum,commodityLeftNum,commodityUrl){
      localStorage.setItem('commodityID',commodityID);
      localStorage.setItem('commodityName',commodityName);
      localStorage.setItem('commodityPrice',commodityPrice);
      localStorage.setItem('commoditySoldNum',commoditySoldNum);
      localStorage.setItem('commodityLeftNum',commodityLeftNum);
      localStorage.setItem('commodityUrl',commodityUrl);

      this.$router.push({name: 'Comment', params: {isReload: 'true'}});
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
  margin-left: 10px;
  margin-bottom: 10px;
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

.add{
  height:80px;
  width:80px;
  margin-top: 200px;
  font-size: 50px;
}

</style>
