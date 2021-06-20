<template>
<div>
  <el-row :gutter="20">
    <el-col :span="24">
      <Head/>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="14" :offset="2">
      <div>
        <Abody :contents = "content" :comments= "cilds" :users = "user"/>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24" style="margin-top: 5%;">
      <div>
        <el-divider direction="horizontal" content-position="center"/>
      </div>
      </el-col>
  </el-row>
</div>
</template>
<script>
import Head from '@/components/forum/Header.vue'
// import NavMenu from '@/components/Navmenu.vue'
import Abody from '@/components/forum/Abody.vue'



  export default {
      name: "Article",
      components: {
        Head,
        // NavMenu,
        Abody,
      },
      methods: {
      },
      data(){
        return{
          postid: "",
          content:{},
          cilds: [],
          user: {},
        }

      },
      created(){
          const _this = this;
          let formData = new FormData();
          this.postid=localStorage.getItem("postid");
          _this.postid=this.postid;
          formData.append('id',parseInt(_this.postid));
          this.$axios.post('/forum/findById', formData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true

        }).then(function (response) {
            _this.content = response.data.data;
        }).catch(function (response) {
          // 这里是处理错误的回调
          console.log(response)
        });

        let formData_a = new FormData();
        formData_a.append('postId',parseInt(_this.postid));
        this.$axios.post('/forum/comment/commentReplyList', formData_a, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
        }).then(function (response) {
            _this.cilds = response.data.data;
        }).catch(function (response) {
          // 这里是处理错误的回调
          console.log(response)
        });

        let formData_u = new FormData();
        formData_u.append('id',localStorage.getItem('userId'));
        this.$axios.post('/forum/findUrlByUserId', formData_u, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
        }).then(function (response) {
            _this.user = response.data.data;
        }).catch(function (response) {
          // 这里是处理错误的回调
          console.log(response)
        });
      }
}
</script>
<style>
 .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
