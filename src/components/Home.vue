<template>
  <div>

<!--    <el-dialog-->
<!--        title="上传书籍"-->
<!--        :visible.sync="dialogVisible"-->
<!--        :before-close="handleClose"-->
<!--        width="40%">-->
<!--      <BookForm></BookForm>-->
<!--    </el-dialog>-->
    <el-container>
      <el-aside width="10%"></el-aside>
      <el-main>
        <div>
          <el-row>
            <el-col :span="6" v-for="(seller, index) in sellerList" :key="seller.id" :offset="index%3 === 0 ? 2 : 1">
              <el-card style="margin-top: 40px" class="shopCard" :title="seller.kind">
                <div v-on:click="toSeller(seller.id)">
                  <img src="../assets/商铺.jpg" alt="店铺封面" width="100%" class="image">
                  <div style="padding: 10px;">
                    <span>{{ seller.name }} 的店铺 </span>
                    <div class="bottom clearfix">
                      <div class="shopKind" style="height: 2em"> 商品类型: {{ seller.kind }}</div>
                      <div class="shopKind" style="height: 1em"> 联系方式: {{ seller.telephone }}</div>
                    </div>
                  </div>
                </div>
<!--                <div>-->
<!--                  <el-button v-if="isManager" type="danger" icon="el-icon-delete" circle class="button"-->
<!--                             v-on:click="onDelete(book.id)"></el-button>-->
<!--                  <el-button type="primary" icon="el-icon-download" circle class="button"-->
<!--                             v-on:click="onDownload(book.id,book.name)"></el-button>-->
<!--                </div>-->
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
<!--      <el-aside width="15%">-->
<!--        <el-button v-if="!isManager" @click="dialogVisible = true" type="primary" icon="el-icon-plus" circle-->
<!--                   size="medium"-->
<!--                   style="margin-top: 10px"></el-button>-->
<!--      </el-aside>-->
    </el-container>
  </div>
</template>

<script>
//import BookForm from "@/components/BookForm";

export default {
  name: "Home",
  //components: {BookForm},
  data() {
    return {
      sellerList: {},
      totalSeller: 90,
      pageNum: 1,
      pageSize: 6,
      dialogVisible: false
    }
  },
  //页面初始化完成后要加载的东西
  created() {
    this.getSellerList();
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
   // if (localStorage.getItem("role") == 'manager') {
   //   this.isManager = true;
   // }
  },
  methods: {
    getSellerList: function () {
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
  //  readBook: function (bookId) {
  //    localStorage.setItem('bookId', bookId);
  //    this.$router.push("/content");
   // },
   //  onDownload: function (bookId, bookName) {
   //    const _this = this;
   //    console.log(bookId);
   //    let formData = new FormData;
   //    formData.append('bookId', bookId);
   //    this.$axios.post('/book/download', formData, {
   //      headers: {
   //        "Content-Type": "application/json;charset=utf-8"
   //      },
   //      withCredentials: true
   //    }).then(function (response) {
   //      // 这里是处理正确的回调
   //      if(response.data.code == '503'){
   //        if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token
   //          let flag = false;
   //          _this.$store.commit('login', flag);
   //          localStorage.clear();
   //          _this.$router.go(0);
   //          _this.$message('您的登录已超时，请重新登录');
   //        }else{
   //          _this.$message(response.data.msg);
   //        }
   //      }else{
   //        let url = window.URL.createObjectURL(new Blob([response.data]));
   //        let link = document.createElement("a");
   //        link.style.display = "none";
   //        link.href = url;
   //        link.setAttribute("download", bookName + ".txt"); //指定下载后的文件名，防跳转
   //        document.body.appendChild(link);
   //        link.click();
   //      }
   //
   //    }).catch(function (response) {
   //      // 这里是处理错误的回调
   //      console.log(response)
   //    })
   //  },
   //  onDelete: function (bookId) {
   //    console.log(bookId);
   //    this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
   //      confirmButtonText: '确定',
   //      cancelButtonText: '取消',
   //      type: 'warning'
   //    }).then(() => {
   //      const _this = this;
   //      let formData = new FormData;
   //      formData.append('bookId', bookId);
   //      this.$axios.post('/book/delbook', formData, {
   //        headers: {
   //          "Content-Type": "application/json;charset=utf-8"
   //        },
   //        withCredentials: true
   //      }).then(function (response) {   // 这里是处理正确的回调
   //        console.log(response)
   //        if(response.data.code == '503'){
   //          if (JSON.parse(localStorage.getItem('islogin'))) { //判断本地是否存在access_token
   //            let flag = false;
   //            _this.$store.commit('login', flag);
   //            localStorage.clear();
   //            _this.$router.go(0);
   //            _this.$message('您的登录已超时，请重新登录');
   //          }else{
   //            _this.$message(response.data.msg);
   //          }
   //        }else{
   //          _this.$message({
   //            message: '删除成功！',
   //            type: 'success'
   //          });
   //          // _this.$router.go(0);
   //          _this.getBookList();
   //        }
   //      }).catch(function (response) {
   //        // 这里是处理错误的回调
   //        console.log(response)
   //      })
   //    }).catch(() => {
   //      this.$message({
   //        type: 'info',
   //        message: '已取消删除'
   //      });
   //    });
   //  },
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getSellerList();
    },
    handleClose(done) {
      this.getSellerList();
      done();
    },
    toSeller: function(sellerId){
      this.$message({
        message : sellerId+"为商家ID",
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
