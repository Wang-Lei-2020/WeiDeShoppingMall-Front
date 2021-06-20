<template>
<div class="rank">
  <el-container style="background:#F5F5F5;">
    <el-main style= "font-size: 20px;font-family: 'PingFang SC';">
      <el-col>
        <el-divider direction="vertical" content-position="center"/>
        近期热点
      </el-col>
          <div class="list" >
            <div v-for="(item,i) in postlist_c" :key="i">
              <el-col >
                <el-link icon="el-icon-news">{{item.topic}}</el-link>
              </el-col>
            </div>
          </div>
    </el-main>
  </el-container>
</div>
</template>

<script>
    export default {
      name: "Rank",
      data() {
      return {
        postlist_c: [],
        pageNum: 1,
        pageSize: 5,
      };
      },
      created(){
      const _this = this;
      let formData = new FormData();
      formData.append('pageNum',_this.pageNum);
      formData.append('pageSize',_this.pageSize);

      this.$axios.post('/forum/postListByClick', formData, {
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
.el-divider--vertical{
  display:inline-block;
  width:1px;
  height:15px;
  vertical-align:middle;
  position:relative;
}

</style>
