<!--<template>-->
<!--<div>-->
<!--  <el-row :gutter="20">-->
<!--    <el-col :span="24">-->
<!--      <Head/>-->
<!--    </el-col>-->
<!--  </el-row>-->
<!--  <el-row :gutter="20">-->
<!--    <el-col :span="8" :offset="8">-->
<!--      <el-form ref="form" label-width="80px">-->
<!--        <el-form-item label="板块">-->
<!--          <el-select v-model= "plate" placeholder="请选择帖子板块" @input="change()">-->
<!--            <el-option label="电子" value="电子"></el-option>-->
<!--            <el-option label="运动" value="运动"></el-option>-->
<!--            <el-option label="食品" value="食品"></el-option>-->
<!--            <el-option label="服饰" value="服饰"></el-option>-->
<!--            <el-option label="金银首饰" value="金银首饰"></el-option>-->
<!--            <el-option label="生活用品" value="生活用品"></el-option>-->
<!--            <el-option label="其他" value="其他"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="题目">-->
<!--          <el-input v-model= "title" @input="change()"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="内容">-->
<!--          <el-input v-model= "content" type="textarea" @input="change()"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">发布</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-col>-->
<!--  </el-row>-->

<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--import Head from '@/components/forum/Header.vue'-->

<!--  export default {-->
<!--      name: "Newpost",-->
<!--      components: {-->
<!--        Head,-->
<!--      },-->
<!--      methods: {-->
<!--        onSubmit(){-->
<!--           const _this = this;-->
<!--            let formData = new FormData();-->
<!--            formData.append('userId',1);-->
<!--            formData.append('topic',_this.title);-->
<!--             formData.append('plate',_this.plate);-->
<!--            formData.append('content',_this.content);-->
<!--            this.$axios.post('/forum/addPost', formData, {-->
<!--            headers: {-->
<!--              "Content-Type": "application/json;charset=utf-8"-->
<!--            },-->
<!--            withCredentials: true-->
<!--          }).then(function (response) {-->
<!--              _this.data = response.data.data;-->
<!--          }).catch(function (response) {-->
<!--            // 这里是处理错误的回调-->
<!--            console.log(response)-->
<!--          });-->
<!--        },-->
<!--         change(){-->
<!--          this.$forceUpdate()-->
<!--        },-->
<!--      },-->
<!--      data(){-->
<!--        return{-->
<!--          title:"",-->
<!--          content:"",-->
<!--          plate: "",-->
<!--          data:{}-->
<!--        }-->

<!--      }-->
<!--  }-->
<!--</script>-->
<!--<style>-->
<!-- .el-row {-->
<!--    margin-bottom: 20px;-->
<!--  }-->
<!--  .el-col {-->
<!--    border-radius: 4px;-->
<!--  }-->
<!--  .bg-purple-dark {-->
<!--    background: #99a9bf;-->
<!--  }-->
<!--  .bg-purple {-->
<!--    background: #d3dce6;-->
<!--  }-->
<!--  .bg-purple-light {-->
<!--    background: #e5e9f2;-->
<!--  }-->
<!--  .grid-content {-->
<!--    border-radius: 4px;-->
<!--    min-height: 36px;-->
<!--  }-->
<!--  .row-bg {-->
<!--    padding: 10px 0;-->
<!--    background-color: #f9fafc;-->
<!--  }-->

<!--</style>-->

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <Head/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <el-form ref="form" label-width="80px">
          <el-form-item label="板块">
            <el-select v-model= "plate" placeholder="请选择帖子板块" @input="change()">
              <el-option label="电子" value="电子"></el-option>
              <el-option label="运动" value="运动"></el-option>
              <el-option label="食品" value="食品"></el-option>
              <el-option label="服饰" value="服饰"></el-option>
              <el-option label="金银首饰" value="金银首饰"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目">
            <el-input v-model= "title" @input="change()"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model= "content" type="textarea" @input="change()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import Head from '@/components/forum/Header.vue'

export default {
  name: "Newpost",
  components: {
    Head,
  },
  methods: {
    onSubmit(){
      const _this = this;
      let formData = new FormData();
      formData.append('userId',1);
      formData.append('topic',_this.title);
      formData.append('plate',_this.plate);
      formData.append('content',_this.content);
      this.$axios.post('/forum/addPost', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        _this.data = response.data.data;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
      this.$router.push("/forum");
    },
    change(){
      this.$forceUpdate()
    },
  },
  data(){
    return{
      title:"",
      content:"",
      plate: "",
      data:{}
    }

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

