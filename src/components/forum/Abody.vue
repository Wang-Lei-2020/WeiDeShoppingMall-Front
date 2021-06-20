<!--<template>-->
<!--    <div class="abody">-->

<!--        <el-header>-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item :to="{ path: '/forum' }">未得商城论坛</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item>{{contents.plate}}</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item>帖子详情</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--      </el-header>-->

<!--      <el-main>-->
<!--        <el-row><Content :contents= "contents" :users= "users" /></el-row>-->
<!--        <el-row><Comment :comments= "comments" :contents= "contents" :users= "users"/></el-row>-->
<!--        <el-form ref="form"  label-width="80px">-->
<!--          <el-form-item label="回复">-->
<!--            <el-input v-model= "message" type="textarea" @input="change()"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="onSubmit">评论</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-main>-->

<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--import Content from "@/components/forum/Content.vue"-->
<!--import Comment from "@/components/forum/Comment.vue"-->
<!--    export default {-->
<!--      name: "Abody",-->
<!--      props: ['contents','comments','users'],-->
<!--      components: {-->
<!--        Content,-->
<!--        Comment,-->
<!--      },-->
<!--      data() {-->
<!--      return {-->
<!--        article:{-->
<!--          message: "",-->
<!--          editorOption: {},-->
<!--          postid:"",-->
<!--          cilds: [],-->
<!--          data: {}-->
<!--        }-->
<!--      };-->
<!--      },-->
<!--      methods: {-->
<!--        submit () {-->
<!--          console.log(this.$refs.text.value)-->
<!--        },-->
<!--        change(){-->
<!--          this.$forceUpdate()-->
<!--        },-->
<!--        onSubmit(){-->
<!--          const _this = this;-->
<!--          let formData = new FormData();-->
<!--          formData.append('postId',localStorage.getItem("postid"));-->
<!--          formData.append('userId',localStorage.getItem('userId'));-->
<!--          formData.append('content',_this.message);-->
<!--          this.$axios.post('/forum/comment/postComent', formData, {-->
<!--          headers: {-->
<!--            "Content-Type": "application/json;charset=utf-8"-->
<!--          },-->
<!--          withCredentials: true-->

<!--        }).then(function (response) {-->
<!--            _this.data = response.data.data;-->
<!--            location.reload();-->
<!--        }).catch(function (response) {-->
<!--          // 这里是处理错误的回调-->
<!--          console.log(response)-->
<!--        });-->
<!--        }-->

<!--      },-->
<!--      created(){-->
<!--      }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--</style>-->
<template>
  <div class="abody">

    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/forum' }">未得商城论坛</el-breadcrumb-item>
        <el-breadcrumb-item>{{contents.plate}}</el-breadcrumb-item>
        <el-breadcrumb-item>帖子详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main>
      <el-row><Content :contents= "contents" :users= "user1" /></el-row>
      <el-row><Comment :comments= "comments" :contents= "contents" :users= "users"/></el-row>
      <el-form ref="form"  label-width="80px">
        <el-form-item label="回复">
          <el-input v-model= "message" type="textarea" @input="change()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">评论</el-button>
        </el-form-item>
      </el-form>
    </el-main>

  </div>
</template>

<script>
import Content from "@/components/forum/Content.vue"
import Comment from "@/components/forum/Comment.vue"
export default {
  name: "Abody",
  props: ['contents','comments','users'],
  components: {
    Content,
    Comment,
  },
  data() {
    return {
      article:{
        message: "",
        editorOption: {},
        postid:"",
        cilds: [],
        data: {},
        user1: {},
      }
    };
  },
  methods: {
    submit () {
      console.log(this.$refs.text.value)
    },
    change(){
      this.$forceUpdate()
    },
    onSubmit(){
      const _this = this;
      let formData = new FormData();
      formData.append('postId',localStorage.getItem("postid"));
      formData.append('userId',1);
      formData.append('content',_this.message);
      this.$axios.post('/forum/comment/postComent', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true

      }).then(function (response) {
        _this.data = response.data.data;
        location.reload();
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    }

  },
  created(){
    const _this = this;
    let formData = new FormData();
    formData.append('id',this.contents.userId);
    this.$axios.post('/forum/findUrlByUserId', formData, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      withCredentials: true
    }).then(function (response) {
      _this.user1 = response.data.data;
    }).catch(function (response) {
      // 这里是处理错误的回调
      console.log(response)
    });
  }
}
</script>
<style>
</style>
