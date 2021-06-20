<template>
    <div>
        <el-col :span="3">
            <el-avatar :size="75" :src="getPhotoUrl"></el-avatar>
        </el-col>
        <el-col :span="10">
            <el-row>
                <sapn style="font-size: 20px;font-family: 'PingFang SC';">
                    {{users.user.name}}
                </sapn>
            </el-row>
            <el-row>
                <span style="font-size: 10px;font-family: 'PingFang SC';">
                    发布于{{date.sendTime}}
                </span>
            </el-row>
        </el-col>
    </div>
</template>

<script>
export default {
  name: "User",
  props: ['users','date'],
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  computed:{
    getPhotoUrl:function(){
      return localStorage.getItem('userPhotoUrl');
    }
  },
  methods:{

  }
}

</script>
<style>
</style>
