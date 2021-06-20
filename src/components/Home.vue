<!--<template>-->
<!--  <div>-->
<!--    <el-container>-->
<!--      <el-aside width="10%"></el-aside>-->
<!--      <el-main>-->
<!--        <div>-->
<!--          <el-row>-->

<!--            <el-col :span="6" v-for="(seller, index) in sellerList" :key="seller.id" :offset="index%3 === 0 ? 2 : 1">-->
<!--              <el-card style="margin-top: 40px" class="shopCard" :title="seller.name">-->
<!--                <div v-on:click="toSeller(seller.name,seller.id)">-->
<!--                  <img :src="seller.url" alt="店铺封面" width="100%" class="image">-->
<!--                  <div style="padding: 10px;">-->
<!--                    <span>{{ seller.name }} 的店铺 </span>-->
<!--                    <div class="bottom clearfix">-->
<!--                      <div class="shopKind" style="height: 2em"> 商品类型: {{ seller.kind }}</div>-->
<!--                      <div class="shopKind" style="height: 1em"> 联系方式: {{ seller.telephone }}</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--&lt;!&ndash;                <div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-button v-if="isManager" type="danger" icon="el-icon-delete" circle class="button"&ndash;&gt;-->
<!--&lt;!&ndash;                             v-on:click="onDelete(book.id)"></el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-button type="primary" icon="el-icon-download" circle class="button"&ndash;&gt;-->
<!--&lt;!&ndash;                             v-on:click="onDownload(book.id,book.name)"></el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--        <div style="margin-right: 80px; margin-top: 20px">-->
<!--          <el-pagination-->
<!--              background-->
<!--              layout="prev, pager, next"-->
<!--              :page-size="pageSize"-->
<!--              :total="totalSeller"-->
<!--              @current-change="handleCurrentChange"-->
<!--              style="float: right">-->
<!--          </el-pagination>-->
<!--        </div>-->
<!--      </el-main>-->
<!--      <el-aside width="10%"></el-aside>-->
<!--&lt;!&ndash;      <el-aside width="15%">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button v-if="!isManager" @click="dialogVisible = true" type="primary" icon="el-icon-plus" circle&ndash;&gt;-->
<!--&lt;!&ndash;                   size="medium"&ndash;&gt;-->
<!--&lt;!&ndash;                   style="margin-top: 10px"></el-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-aside>&ndash;&gt;-->
<!--    </el-container>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: "Home",-->
<!--  data() {-->
<!--    return {-->
<!--      sellerList: {},-->
<!--      totalSeller: 90,-->
<!--      pageNum: 1,-->
<!--      pageSize: 6,-->
<!--      dialogVisible: false,-->
<!--      kindList:{},-->
<!--      kind:{-->
<!--        id:"",-->
<!--        plate:""-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  //页面初始化完成后要加载的东西-->
<!--  created() {-->
<!--    this.getSellerList();-->
<!--    this.getKindList();-->
<!--    if (this.$route.params.isReload == 'true') {-->
<!--      this.$router.go(0);-->
<!--    }-->
<!--   // if (localStorage.getItem("role") == 'manager') {-->
<!--   //   this.isManager = true;-->
<!--   // }-->
<!--  },-->
<!--  methods: {-->
<!--    getKindList: function() {-->
<!--      let formData = new FormData-->
<!--      const _this = this;-->
<!--      this.$axios.post('/register/plate', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->
<!--      }).then(function (response) {-->
<!--        // 这里是处理正确的回调-->
<!--        _this.kindList = response.data.data;-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      })-->
<!--    },-->
<!--    getSellerList: function () {-->
<!--      //print();-->
<!--      const _this = this;-->
<!--      let formData = new FormData;-->
<!--      formData.append('pageNum', _this.pageNum);-->
<!--      formData.append('pageSize', _this.pageSize);-->
<!--      this.$axios.post('/home/sellerlist', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->
<!--      }).then(function (response) {-->
<!--        // 这里是处理正确的回调-->
<!--        _this.sellerList = response.data.data.list;-->
<!--        _this.totalSeller = response.data.data.total;-->
<!--        _this.pageNum = response.data.data.pageNum;-->

<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      })-->
<!--    },-->
<!--  //  readBook: function (bookId) {-->
<!--  //    localStorage.setItem('bookId', bookId);-->
<!--  //    this.$router.push("/content");-->
<!--   // },-->
<!--   //  onDownload: function (bookId, bookName) {-->
<!--   //    const _this = this;-->
<!--   //    console.log(bookId);-->
<!--   //    let formData = new FormData;-->
<!--   //    formData.append('bookId', bookId);-->
<!--   //    this.$axios.post('/book/download', formData, {-->
<!--   //      headers: {-->
<!--   //        "Content-Type": "application/json;charset=utf-8"-->
<!--   //      },-->
<!--   //      withCredentials: true-->
<!--   //    }).then(function (response) {-->
<!--   //      // 这里是处理正确的回调-->
<!--   //      if(response.data.code == '503'){-->
<!--   //        if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token-->
<!--   //          let flag = false;-->
<!--   //          _this.$store.commit('login', flag);-->
<!--   //          localStorage.clear();-->
<!--   //          _this.$router.go(0);-->
<!--   //          _this.$message('您的登录已超时，请重新登录');-->
<!--   //        }else{-->
<!--   //          _this.$message(response.data.msg);-->
<!--   //        }-->
<!--   //      }else{-->
<!--   //        let url = window.URL.createObjectURL(new Blob([response.data]));-->
<!--   //        let link = document.createElement("a");-->
<!--   //        link.style.display = "none";-->
<!--   //        link.href = url;-->
<!--   //        link.setAttribute("download", bookName + ".txt"); //指定下载后的文件名，防跳转-->
<!--   //        document.body.appendChild(link);-->
<!--   //        link.click();-->
<!--   //      }-->
<!--   //-->
<!--   //    }).catch(function (response) {-->
<!--   //      // 这里是处理错误的回调-->
<!--   //      console.log(response)-->
<!--   //    })-->
<!--   //  },-->
<!--   //  onDelete: function (bookId) {-->
<!--   //    console.log(bookId);-->
<!--   //    this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {-->
<!--   //      confirmButtonText: '确定',-->
<!--   //      cancelButtonText: '取消',-->
<!--   //      type: 'warning'-->
<!--   //    }).then(() => {-->
<!--   //      const _this = this;-->
<!--   //      let formData = new FormData;-->
<!--   //      formData.append('bookId', bookId);-->
<!--   //      this.$axios.post('/book/delbook', formData, {-->
<!--   //        headers: {-->
<!--   //          "Content-Type": "application/json;charset=utf-8"-->
<!--   //        },-->
<!--   //        withCredentials: true-->
<!--   //      }).then(function (response) {   // 这里是处理正确的回调-->
<!--   //        console.log(response)-->
<!--   //        if(response.data.code == '503'){-->
<!--   //          if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token-->
<!--   //            let flag = false;-->
<!--   //            _this.$store.commit('login', flag);-->
<!--   //            localStorage.clear();-->
<!--   //            _this.$router.go(0);-->
<!--   //            _this.$message('您的登录已超时，请重新登录');-->
<!--   //          }else{-->
<!--   //            _this.$message(response.data.msg);-->
<!--   //          }-->
<!--   //        }else{-->
<!--   //          _this.$message({-->
<!--   //            message: '删除成功！',-->
<!--   //            type: 'success'-->
<!--   //          });-->
<!--   //          // _this.$router.go(0);-->
<!--   //          _this.getBookList();-->
<!--   //        }-->
<!--   //      }).catch(function (response) {-->
<!--   //        // 这里是处理错误的回调-->
<!--   //        console.log(response)-->
<!--   //      })-->
<!--   //    }).catch(() => {-->
<!--   //      this.$message({-->
<!--   //        type: 'info',-->
<!--   //        message: '已取消删除'-->
<!--   //      });-->
<!--   //    });-->
<!--   //  },-->
<!--    handleCurrentChange: function (pageNum) {-->
<!--      this.pageNum = pageNum;-->
<!--      this.getSellerList();-->
<!--    },-->
<!--    handleClose(done) {-->
<!--      this.getSellerList();-->
<!--      done();-->
<!--    },-->
<!--    toSeller: function(sellerName,sellerId){-->
<!--      localStorage.setItem('sellerName',sellerName);-->
<!--      localStorage.setItem('sellerId',sellerId);-->
<!--      // this.$message({-->
<!--      //   message : "成功进入 "+sellerName+" 的商铺",-->
<!--      //   type: 'success'-->
<!--      // })-->
<!--      this.$router.push({name: 'UserCommodity', params: {isReload: 'true'}})-->
<!--    }-->

<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.shopKind {-->
<!--  font-size: 13px;-->
<!--  color: #999;-->
<!--  overflow: hidden;-->
<!--}-->

<!--.bottom {-->
<!--  margin-top: 10px;-->
<!--  line-height: 13px;-->
<!--}-->

<!--.button {-->
<!--  padding: 0;-->
<!--  float: right;-->
<!--  margin-left: 20px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.image {-->
<!--  width: 100%;-->
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
    <div id="sideBox">
      <h3 class="sideHead">店铺分类</h3>
      <div class="sideLi">
        <h5 @click="getUserCommodityListByPlate(plate.dianzi)" class="sideLih">电子</h5>
        <h5 @click="getUserCommodityListByPlate(plate.yundong)" class="sideLih">运动</h5>
        <h5 @click="getUserCommodityListByPlate(plate.shipin)" class="sideLih">食品</h5>
        <h5 @click="getUserCommodityListByPlate(plate.fushi)" class="sideLih">服饰</h5>
        <h5 @click="getUserCommodityListByPlate(plate.jinyinshoushi)" class="sideLih">金银首饰</h5>
        <h5 @click="getUserCommodityListByPlate(plate.shenghuoyongpin)" class="sideLih">生活用品</h5>
        <h5 @click="getUserCommodityListByPlate(plate.qita)" class="sideLih">其他</h5>
        <h5 @click="getSellerList" class="sideLih">所有</h5>
      </div>
    </div>
    <iframe src="/headImg.html" scrolling="no" style="width: 100%;height: 450px;" frameborder="0"></iframe>
    <div class="search bar7">
      <el-form onsubmit="return false">
        <input v-model="searchArea" type="text" placeholder="请输入您要搜索的内容...">
        <button @click="searchShop()"></button>
      </el-form>
    </div>

    <el-container>
      <el-aside width="10%"></el-aside>
      <el-main>
        <div>
          <el-row>
            <el-col :span="6" v-for="(seller, index) in sellerList" :key="seller.id" :offset="index%3 === 0 ? 2 : 1">
              <el-card style="margin-top: 40px" class="shopCard" :title="seller.name">
                <div v-on:click="toSeller(seller.name,seller.id)">
                  <img :src="seller.url" alt="店铺封面" width="100%" class="image">
                  <div style="padding: 10px;">
                    <span>{{ seller.name }} 的店铺 </span>
                    <div class="bottom clearfix">
                      <div class="shopKind" style="height: 2em"> 商品类型: {{ seller.kind }}</div>
                      <div class="shopKind" style="height: 1em"> 联系方式: {{ seller.telephone }}</div>
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
              :total="totalSeller"
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
  name: "Home",
  data() {
    return {
      sellerList: {},
      totalSeller: 90,
      pageNum: 1,
      pageSize: 6,
      dialogVisible: false,
      plate:{
        dianzi:"电子",
        yundong:"运动",
        shipin:"食品",
        fushi:"服饰",
        jinyinshoushi:"金银首饰",
        shenghuoyongpin:"生活用品",
        qita:"其他",
      },
      searchArea:"",
    }
  },
  //页面初始化完成后要加载的东西
  created() {
    this.getSellerList();
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
  },
  methods: {
    searchShop:function(){
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('search', _this.searchArea);
      this.$axios.post('/login/seller/searchSeller', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.sellerList = response.data.data.list;
        _this.totalSeller = response.data.data.total;
        _this.pageNum = response.data.data.pageNum;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    getUserCommodityListByPlate:function(plate){
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('plate', plate);
      this.$axios.post('/commodity/getUserCommodityListByPlate', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.sellerList = response.data.data.list;
        _this.totalSeller = response.data.data.total;
        _this.pageNum = response.data.data.pageNum;

      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    getSellerList: function () {
      localStorage.setItem('first',"no");
      //print();
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      this.$axios.post('/home/sellerlist', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.sellerList = response.data.data.list;
        _this.totalSeller = response.data.data.total;
        _this.pageNum = response.data.data.pageNum;

      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getSellerList();
    },
    handleClose(done) {
      this.getSellerList();
      done();
    },
    toSeller: function(sellerName,sellerId){
      localStorage.setItem('sellerName',sellerName);
      localStorage.setItem('sellerId',sellerId);
      this.$router.push({name: 'UserCommodity', params: {isReload: 'true'}})
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
  width: 250px;
  height:190px;
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
<style  scoped>
/**********public**********/
*{
  margin: 0;
  padding: 0;
}
ul{
  list-style-type: none;
}
body{
  background: #fcfcfc;
}
a{
  text-decoration-line: none;
}
/**********Nav Public**********/
#sideBox,
.sideLih,
.sideHead{
  background: #6E6E6E;
}
.sideLih,
.sideHead{
  border-bottom: 1px solid #fff;
  color: #fff;
}
#sideBox,
.sideLiUl{
  box-shadow: 1px 0 3px #324B4E;
}
/**********Nav Box**********/
#sideBox{
  position: fixed;
  left: 0;
  top:30%;
  width: 150px;
  padding: 0 0 20px 0;
}

/**********Nav header**********/
.sideHead{
  height: 55px;
  line-height: 55px;
  color: #fff;
  text-align: center;
  text-shadow: 1px 0px 0px #ccc;
}

/**********Nav body**********/
.sideLi{
  position: relative;
  left: 0;
  top:0;
}
.sideLih{
  padding: 10px 0px 10px 20px;
  font-weight: lighter;
}
.sideLiUl{
  background:#A9E2F3;
  position: absolute;
  left: 150px;
  top:0;
  width: 306px;
  display: none;
  opacity:0;
  overflow: hidden;
  border: 1px solid #324B4E;
  border-left: none;
  border-radius: 3px 5px 5px 3px;
}
.sidebottom{
  top:-300%;
}
.sideLiUl li{
  color: #fff;
  float: left;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 5px;
  display: inline-block;
  width: 90px;
}
.sideLiUl li a{
  color: #fff;
  font-weight: lighter;
  font-size:12px;
}
.sideLi h5:hover,
.sideLiUl li:hover{
  cursor: pointer;
}
.sideLiUl li:hover{
  text-decoration-line: underline;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #494A5F;
  font-weight: 500;
  font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;
}

div.search {padding: 30px 0;}

form {
  position: relative;
  width: 300px;
  margin: 0 auto;
}

input, button {
  border: none;
  outline: none;
}

input {
  width: 100%;
  height: 42px;
  padding-left: 13px;
}

button {
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: absolute;
}

/*搜索框7*/
.bar7 {background: #fff;}
.bar7 form {
  height: 20px;
}
.bar7 input {
  width: 250px;
  border-radius: 42px;
  border: 2px solid #324B4E;
  background: #F9F0DA;
  transition: .3s linear;
  float: right;
}
.bar7 input:focus {
  width: 300px;
}
.bar7 button {
  background: none;
  top: -2px;
  right: 0;
}
.bar7 button:before{
  content: "\f002";
  font-family: FontAwesome;
  color: #324b4e;
}

</style>

<style src="../font-awesome-4.7.0/css/font-awesome.min.css">
</style>


