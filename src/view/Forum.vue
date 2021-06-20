<template>
<div>
  <el-row :gutter="20">
    <el-col :span="24">
      <Head/>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="4" :offset="1">
      <div>
      <el-menu
      active-text-color="#6666FF"
      :default-active="activeIndex"
      router
      style="min-height:100vh;width:230px;float:left">
      <NavMenu :navMenus="menuData"></Navmenu>

    </el-menu>
      </div>
    </el-col>
    <el-col :span="12" :offset="0">
      <div>
        <Post/>
      </div>
    </el-col>
  </el-row>
    <el-row :gutter="20">
    <el-col :span="24" style="margin-top: 5%;">
      <div>
        <el-divider direction="horizontal" content-position="center"/>
      </div>
      </el-col>
  </el-row>
</div>
</template>
<script>
import Head from '@/components/forum/Header.vue'
import NavMenu from '@/components/forum/Navmenu.vue'
import Post from '@/components/forum/Post.vue'

  export default {
      name: "Forum",
      components: {
        Head,
        NavMenu,
        Post,
      },
      methods: {
      handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      },
      data(){
        return{
                activeIndex: 'plate',
                menuData: [
                  {
                    //一级
                    entity: {
                      id: 0,
                      name: "forum",
                      icon: "el-icon-menu",
                      alias: "板块分类"
                    }
                  },
                  {
                    //一级
                    entity: {
                      id: 1,
                      name: "plate",
                      icon: "el-icon-s-goods",
                      alias: "电子"
                    }
                  },
                  {
                     entity: {
                      id: 1,
                      name: "plate",
                      icon: "el-icon-s-goods",
                      alias: "运动"
                    },
                  },
                  {
                    entity: {
                      id: 1,
                      name: "plate",
                      icon: "el-icon-s-goods",
                      alias: "食品"
                    },
                  },
                  {
                    entity: {
                      id: 1,
                      name: "plate",
                      icon: "el-icon-s-goods",
                      alias: "服饰"
                    },
                  },
                  {
                    entity: {
                      id: 1,
                      name: "plate",
                      icon: "el-icon-s-goods",
                      alias: "金银首饰"
                    },
                  },
                  {
                    entity: {
                      id: 1,
                      name: "plate",
                      icon: "el-icon-s-goods",
                      alias: "生活用品"
                    },
                  },
                  {
                    entity: {
                      id: 1,
                      name: "plate",
                      icon: "el-icon-s-goods",
                      alias: "其他"
                    },
                  }
                   

                ],
        }

      },
      created(){
          localStorage.setItem("teb1","first");
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
