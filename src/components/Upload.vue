<template>
  <el-upload
      class="avatar-uploader"
      :multiple="false"
      :action="actionPath"
      accept="image/jpeg,image/gif,image/png,image/bmp"
      :before-upload="beforeAvatarUpload"
      :data="postData"
      :on-success="handleAvatarSuccess">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>

<!--  <el-upload-->
<!--      class="avatar-uploader"-->
<!--      action="https://jsonplaceholder.typicode.com/posts/"-->
<!--      :show-file-list="false"-->
<!--      :on-success="handleAvatarSuccess"-->
<!--      :before-upload="beforeAvatarUpload">-->
<!--    <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--  </el-upload>-->
</template>

<script>
import {genUpToken} from "./qiniuToken";

export default {
  name: "Upload",
  created(){
    var token;
    var policy = {};
    var bucketName = 'wanglei2021';
    var AK ='hNl-AywgdWuBco20kCxR6rPMUB-uOV8Hlih7o_gI';
    var SK = 'LZOs_CcKGSsPac8krncFZFJU38Hgd6lCipLZli6x';
    var deadline = Math.round(new Date().getTime() / 1000) + 3600;
    policy.scope = bucketName;
    policy.deadline = deadline;
    token=genUpToken(AK, SK, policy);
    this.postData.token=token;
  },
  data() {
    return {
      imageUrl: '',
      actionPath:'https://upload-z1.qiniup.com',
      postData:{
        token:"",
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    getImgUrl:function(){
      return this.imageUrl;
    }
  },

}

</script>

<style scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
