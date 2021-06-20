<template>
    <div class="comment" style="border: 1px solid black">
        <el-container>
            <el-header style="margin-top: 3%;">
                <span style="font-size: 20px;font-family: 'PingFang SC';">全部讨论({{contents.comment}})</span>
            </el-header>
            <el-main>
                <div v-for="(onecomment,index) in comments" class="list-comment" :key="index">
                        <Onecomment :onecomments="onecomment" :index="index" :users="users"/>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Onecomment from "@/components/forum/Onecomment.vue"
    export default {
      name: "Comment",
      props: ['comments','contents','users'],
      components: {
        Onecomment,
      },
      data() {
      return {
      };
      }
    }

</script>
<style>
</style>
