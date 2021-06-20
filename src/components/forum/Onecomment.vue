<!--<template>-->
<!--    <div class="Onecomment" >-->
<!--        <el-container>-->
<!--            <el-main>-->
<!--                <el-row :gutter="20">-->
<!--                    <User :users="users" :date="onecomments"/>-->
<!--                </el-row>-->
<!--                <el-row :gutter="20">-->
<!--                    <el-col span="3" offset="1">-->
<!--                        {{onecomments.content}}-->
<!--                    </el-col>-->
<!--                    <el-col span="5" offset="19">-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--                &lt;!&ndash; <el-row :gutter="20">-->
<!--                    <el-col span="3"><el-link :underline="false" icon="el-icon-chat-line-round">回复</el-link></el-col>-->
<!--                    <el-col span="3" offset="18"><span style="font-size: 13px;">{{index+2}}楼</span></el-col>-->
<!--                </el-row> &ndash;&gt;-->
<!--                <el-divider direction="horizontal" content-position="center"/>-->
<!--            </el-main>-->
<!--        </el-container>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--import User from "@/components/forum/User.vue"-->
<!--    export default {-->
<!--      name: "Onecomment",-->
<!--      props: ['onecomments','index','users'],-->
<!--      components: {-->
<!--        User,-->
<!--      },-->
<!--      data() {-->
<!--      return {-->
<!--      };-->
<!--      }-->
<!--    }-->

<!--</script>-->
<!--<style>-->
<!--</style>-->
<template>
  <div class="Onecomment" >
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <User :users="user1" :date="onecomments"/>
        </el-row>
        <el-row :gutter="20">
          <el-col span="3" offset="1">
            {{onecomments.content}}
          </el-col>
          <el-col span="5" offset="19">
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col span="3"><el-link :underline="false" icon="el-icon-chat-line-round">回复</el-link></el-col>
            <el-col span="3" offset="18"><span style="font-size: 13px;">{{index+2}}楼</span></el-col>
        </el-row> -->
        <el-divider direction="horizontal" content-position="center"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import User from "@/components/forum/User.vue"
export default {
  name: "Onecomment",
  props: ['onecomments','index','users'],
  components: {
    User,
  },
  data() {
    return {
      user1: {},
    };
  },
  created(){
    const _this = this;
    let formData = new FormData();
    formData.append('id',this.onecomments.userId);
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
