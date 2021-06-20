<template>
    <div class="content" style="border: 1px solid black;">
        <el-container>
            <el-header style="margin-left: 3%;">
                <el-col>
                    <span>{{contents.topic}}</span>
                </el-col>
                <el-col >
                    <span style="font-size: 10px;font-family: 'PingFang SC';">
                    浏览&nbsp;{{contents.click}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    讨论&nbsp;{{contents.comment}}
                    </span>
                </el-col>

            </el-header>
            <el-main>
                <el-row :gutter="20">
                    <User :users= "users" :date = "contents"/>
                </el-row>
                <el-row :gutter="20">
                    <span>{{contents.content}}</span>
                </el-row>
                <el-row :gutter="20">
                    <el-col span="3"><el-link :underline="false" icon="el-icon-chat-line-round" @click="reply">回复</el-link></el-col>
                    <el-col span="3"><el-link v-if="islike>0" :underline="false" icon="el-icon-allxihuan" @click="like">点赞({{contents.like}})</el-link></el-col>
                    <el-col span="3"><el-link v-if="islike<=0" :underline="false" icon="el-icon-alldianzan1" @click="unlike">已点赞({{contents.like+1}})</el-link></el-col>
                    <el-col span="3"><el-link v-if="isatt>0" :underline="false" icon="el-icon-star-off" @click="attention(contents.attentionNum)">收藏({{contents.attentionNum}})</el-link></el-col>
                    <el-col span="3"><el-link v-if="isatt<=0" :underline="false" icon="el-icon-star-on" @click="unattention(contents.attentionNum)">已收藏({{contents.attentionNum+1}})</el-link></el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import User from "@/components/forum/User.vue"
    export default {
      name: "Content",
      props: ['contents','users'],
      components: {
        User,
      },
      data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        islike: 1,
        isatt: 1,
        data: {}

      };
      },
    //   created(){
    //       localStorage.setItem("islike",1);
    //       localStorage.setItem("isatt",1);
    //   },
      methods:{
          reply(){
              window.scrollTo(0,50000);
          },
          like(){
              this.islike=this.islike-1;
              const _this = this;
                let formData = new FormData();
                formData.append('id',localStorage.getItem("postid"));
                this.$axios.post('/forum/like', formData, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true

                }).then(function (response) {
                    _this.data=response.data.data;
                }).catch(function (response) {
                // 这里是处理错误的回调
                console.log(response)
                });

          },
          unlike(){
              this.islike=this.islike+1;
              const _this = this;
                let formData = new FormData();
                formData.append('id',localStorage.getItem("postid"));
                this.$axios.post('/forum/cancelLike', formData, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true

                }).then(function (response) {
                    _this.data=response.data.data;
                }).catch(function (response) {
                // 这里是处理错误的回调
                console.log(response)
                });

          },
          attention(num){
                this.isatt=this.isatt-1;
                const _this = this;
                let formData = new FormData();
                formData.append('postId',localStorage.getItem("postid"));
                formData.append('userId',localStorage.getItem('userId'));
                this.$axios.post('/forum/favoritePost', formData, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true

                }).then(function (response) {
                    _this.data=response.data.data;
                }).catch(function (response) {
                // 这里是处理错误的回调
                console.log(response)
                });

                num=num+1;
                let formData1 = new FormData();
                formData1.append('id',localStorage.getItem("postid"));
                formData1.append('attentionNum',num);
                this.$axios.post('/forum/modifyFavorite', formData1, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true

                }).then(function (response) {
                    _this.data=response.data.data;
                }).catch(function (response) {
                // 这里是处理错误的回调
                console.log(response)
                });
          },
          unattention(num){
                 this.isatt=this.isatt+1;
                 const _this = this;
                let formData = new FormData();
                formData.append('id',localStorage.getItem("postid"));
                formData.append('userId',localStorage.getItem("userId"));
                this.$axios.post('/forum/cancelFavoritePost', formData1, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true

                }).then(function (response) {
                    _this.data=response.data.data;
                }).catch(function (response) {
                // 这里是处理错误的回调
                console.log(response)
                });

                num=num-1;
                let formData1 = new FormData();
                formData1.append('id',localStorage.getItem("postid"));
                formData1.append('attentionNum',num);
                this.$axios.post('/forum/modifyFavorite', formData1, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true

                }).then(function (response) {
                    _this.data=response.data.data;
                }).catch(function (response) {
                // 这里是处理错误的回调
                console.log(response)
                });
          },
      }
    }

</script>
<style>
</style>
