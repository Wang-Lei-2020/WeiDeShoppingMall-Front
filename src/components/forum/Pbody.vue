<template>
<div>
    <div class="pbody">
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/forum' }">未得商城论坛</el-breadcrumb-item>
          <el-breadcrumb-item>{{plate}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>

      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="最新发帖" name="first">
          <template class="infinite-list-wrapper" style="overflow:auto">
            <div  class="list" >
            <div v-for="(item,i) in postlist_t" :key="i" @click="toArticle(item)">
              <Onepost :apost="item" ></Onepost>
            </div>
            </div>
                <!-- <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p> -->
            </template>
        </el-tab-pane>
        <el-tab-pane label="推荐阅读">
          <template class="infinite-list-wrapper" style="overflow:auto">
            <div class="list" >
            <div v-for="(item,i) in postlist_c" :key="i" @click="toArticle(item)">
              <Onepost :apost="item" ></Onepost>
            </div>
            </div>
                <!-- <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p> -->
            </template>
        </el-tab-pane>
      </el-tabs>
   </div>
</div>
</template>
<script>
import Onepost from "@/components/forum/Onepost.vue"
    export default {
      name: "Pbody",
      components: {
        Onepost
      },
      data() {
      return {
        plate: localStorage.getItem("plate"),
        postlist_t: [],
        postlist_c: [],
        pageNum: 1,
        pageSize: 5,
        activeName: 'first',
        loading: false
      }
      },
      computed: {
        noMore () {
            return this.count >= 20;
        },
        disabled () {
            return this.loading || this.noMore;
        }
      },
      methods: {
      toArticle(item){
        localStorage.setItem("postid",item.id);
        this.$router.push("/forum/article");
      },
    },
    created(){
      const _this = this;
      let formData = new FormData();
      formData.append('pageNum',_this.pageNum);
      formData.append('pageSize',_this.pageSize);
      formData.append('plate',_this.plate);

      this.$axios.post('/forum/postListByPlateByTime', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true

      }).then(function (response) {
          _this.postlist_t = response.data.data.list;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      }); 
      
      this.$axios.post('/forum/postListByPlateByClick', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true

      }).then(function (response) {
          _this.postlist_c = response.data.data.list;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      }); 
    }
}

</script>
<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
