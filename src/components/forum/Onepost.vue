<template>
<div class="onepost">
  <el-container>
    <el-main>
      <el-col>
        <el-link class="title" :underline="false" style="font-size: 25px;font-family: 'PingFang SC';">
          {{apost.topic}}
        </el-link>
      </el-col>
      <el-col>
        <el-link class="content" :underline="false" style="font-size: 18px;font-family: 'PingFang SC';">
          {{apost.content}}
        </el-link>
      </el-col>
    </el-main>
    <el-footer style="font-size: 10px;font-family: 'PingFang SC';">
      <el-col>
        讨论&nbsp;{{apost.commentNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        浏览&nbsp;{{apost.click}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        楼主&nbsp;{{apost.userName}}
      </el-col>
      <el-divider direction="horizontal" content-position="center"/>
    </el-footer>
  </el-container>
</div>
</template>

<script>
    export default {
      name: "Onepost",
      props: ['apost'],
      data() {
      return {
      };
      },
    }

</script>
<style>
</style>
