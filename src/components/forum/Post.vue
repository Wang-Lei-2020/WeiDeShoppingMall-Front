<!--<template>-->
<!--<div>-->
<!--    <div class="post">-->
<!--    <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--        <el-tab-pane label="推荐" name="first">-->
<!--            <template class="infinite-list-wrapper" style="overflow:auto" >-->
<!--            <div class="list" >-->
<!--            <div v-for="(item,i) in postlist_t" :key="i" @click="toArticle(item)">-->
<!--              <Onepost :apost="item"></Onepost>-->
<!--            </div>-->
<!--            </div>-->
<!--            <el-pagination-->
<!--                    background-->
<!--                    layout="prev, pager, next"-->
<!--                    :page-size="pageSize"-->
<!--                    :total="totalComment1"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    style="float: right">-->
<!--                </el-pagination>-->

<!--                &lt;!&ndash; <p v-if="loading">加载中...</p>-->
<!--                <p v-if="noMore">没有更多了</p> &ndash;&gt;-->
<!--            </template>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="收藏" name="second">-->
<!--          <template class="infinite-list-wrapper" style="overflow:auto">-->
<!--            <div class="list" >-->
<!--            <div v-for="(item,i) in postlist_a" :key="i" @click="toArticle(item)">-->
<!--              <Onepost :apost="item" ></Onepost>-->
<!--            </div>-->
<!--            </div>-->
<!--            <el-pagination-->
<!--                    background-->
<!--                    layout="prev, pager, next"-->
<!--                    :page-size="pageSize"-->
<!--                    :total="totalComment2"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    style="float: right">-->
<!--                </el-pagination>-->

<!--                &lt;!&ndash; <p v-if="loading">加载中...</p>-->
<!--                <p v-if="noMore">没有更多了</p> &ndash;&gt;-->
<!--            </template>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="热门" name="third">-->
<!--          <template class="infinite-list-wrapper" style="overflow:auto">-->
<!--            <div class="list" >-->
<!--            <div v-for="(item,i) in postlist_c" :key="i" @click="toArticle(item)">-->
<!--              <Onepost :apost="item" ></Onepost>-->
<!--            </div>-->
<!--            </div>-->
<!--            <el-pagination-->
<!--                    background-->
<!--                    layout="prev, pager, next"-->
<!--                    :page-size="pageSize"-->
<!--                    :total="totalComment3"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    style="float: right">-->
<!--                </el-pagination>-->

<!--                &lt;!&ndash; <p v-if="loading">加载中...</p>-->
<!--                <p v-if="noMore">没有更多了</p> &ndash;&gt;-->
<!--            </template>-->
<!--        </el-tab-pane>-->
<!--    </el-tabs>-->
<!--   </div>-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--import Onepost from '@/components/forum/Onepost.vue'-->

<!--    export default {-->
<!--      name: "Post",-->
<!--      components: {-->
<!--        Onepost-->
<!--      },-->
<!--      data() {-->
<!--      return {-->
<!--        postlist_t: [],-->
<!--        postlist_c: [],-->
<!--        postlist_a: [],-->
<!--        activeName: localStorage.getItem("teb1"),-->
<!--        data:{},-->
<!--        pageSize: 5,-->
<!--        pageNum: 1,-->
<!--        totalComment1: 0,-->
<!--        totalComment2: 0,-->
<!--        totalComment3: 0,-->
<!--      }-->
<!--      },-->
<!--      computed: {-->
<!--      },-->
<!--      methods: {-->
<!--      toArticle(item){-->
<!--        localStorage.setItem("postid",item.id);-->
<!--        this.isatt=this.isatt-1;-->
<!--        const _this = this;-->
<!--        let formData = new FormData();-->

<!--        formData.append('id',localStorage.getItem("postid"));-->
<!--        formData.append('click',item.click+1);-->
<!--        this.$axios.post('/forum/modifyClick', formData, {-->
<!--        headers: {-->
<!--            "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->

<!--        }).then(function (response) {-->
<!--            _this.data=response.data.data;-->
<!--        }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--        });-->
<!--        this.$router.push("/forum/article");-->
<!--      },-->
<!--      handleClick(tab, event) {-->
<!--        console.log(tab, event);-->
<!--      },-->
<!--      pageChange(page) {-->
<!--            this.pageCurrent = page;-->
<!--      },-->
<!--      pageSizeChange(page) {-->
<!--          this.pageSize = page;-->
<!--      },-->
<!--      handleCurrentChange: function (pageNum) {-->
<!--        this.pageNum = pageNum;-->
<!--        this.getCommentList();-->
<!--      },-->
<!--      getCommentList: function () {-->
<!--        //print();-->
<!--        const _this = this;-->
<!--        let formData = new FormData();-->
<!--        formData.append('pageNum',_this.pageNum);-->
<!--        formData.append('pageSize',_this.pageSize);-->

<!--        let formData_a = new FormData();-->
<!--        formData_a.append('pageNum',_this.pageNum);-->
<!--        formData_a.append('pageSize',_this.pageSize);-->
<!--        formData_a.append('userId',localStorage.getItem('userId'));-->

<!--        this.$axios.post('/forum/postListByTime', formData, {-->
<!--          headers: {-->
<!--            "Content-Type": "application/json;charset=utf-8"-->
<!--          },-->
<!--          withCredentials: true-->

<!--        }).then(function (response) {-->
<!--            _this.postlist_t = response.data.data.list;-->
<!--            _this.totalComment=response.data.data.total;-->
<!--        }).catch(function (response) {-->
<!--          // 这里是处理错误的回调-->
<!--          console.log(response)-->
<!--        });-->
<!--      },-->
<!--    },-->
<!--    created(){-->
<!--      const _this = this;-->
<!--      let formData = new FormData();-->
<!--      formData.append('pageNum',_this.pageNum);-->
<!--      formData.append('pageSize',_this.pageSize);-->

<!--      let formData_a = new FormData();-->
<!--      formData_a.append('pageNum',_this.pageNum);-->
<!--      formData_a.append('pageSize',_this.pageSize);-->
<!--      formData_a.append('userId',localStorage.getItem('userId'));-->

<!--      this.$axios.post('/forum/postListByTime', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->

<!--      }).then(function (response) {-->
<!--          _this.postlist_t = response.data.data.list;-->
<!--          _this.totalComment1=response.data.data.total;-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      });-->

<!--      this.$axios.post('/forum/postListByClick', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->

<!--      }).then(function (response) {-->
<!--          _this.postlist_c = response.data.data.list;-->
<!--         _this.totalComment2=response.data.data.total;-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      });-->

<!--      this.$axios.post('/forum/getFavoritePost', formData_a, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->

<!--      }).then(function (response) {-->
<!--          _this.postlist_a = response.data.data.list;-->
<!--          _this.totalComment3=response.data.data.total;-->
<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      });-->
<!--    }-->

<!--}-->

<!--</script>-->
<!--<style>-->
<!--</style>-->

<template>
  <div>
    <div class="post">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="推荐" name="first">
          <template class="infinite-list-wrapper" style="overflow:auto" >
            <div class="list" >
              <div v-for="(item,i) in postlist_t" :key="i" @click="toArticle(item)">
                <Onepost :apost="item"></Onepost>
              </div>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="totalComment1"
                @current-change="handleCurrentChange"
                style="float: right">
            </el-pagination>

            <!-- <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p> -->
          </template>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="second">
          <template class="infinite-list-wrapper" style="overflow:auto">
            <div class="list" >
              <div v-for="(item,i) in postlist_a" :key="i" @click="toArticle(item)">
                <Onepost :apost="item" ></Onepost>
              </div>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="totalComment3"
                @current-change="handleCurrentChange"
                style="float: right">
            </el-pagination>

            <!-- <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p> -->
          </template>
        </el-tab-pane>
        <el-tab-pane label="热门" name="third">
          <template class="infinite-list-wrapper" style="overflow:auto">
            <div class="list" >
              <div v-for="(item,i) in postlist_c" :key="i" @click="toArticle(item)">
                <Onepost :apost="item" ></Onepost>
              </div>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="totalComment2"
                @current-change="handleCurrentChange"
                style="float: right">
            </el-pagination>

            <!-- <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p> -->
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Onepost from '@/components/forum/Onepost.vue'

export default {
  name: "Post",
  components: {
    Onepost
  },
  data() {
    return {
      postlist_t: [],
      postlist_c: [],
      postlist_a: [],
      activeName: localStorage.getItem("teb1"),
      data:{},
      pageSize: 5,
      pageNum: 1,
      totalComment1: 0,
      totalComment2: 0,
      totalComment3: 0,

    }
  },
  computed: {
  },
  methods: {
    toArticle(item){
      localStorage.setItem("postid",item.id);
      this.isatt=this.isatt-1;
      const _this = this;
      let formData = new FormData();

      formData.append('id',localStorage.getItem("postid"));
      formData.append('click',item.click+1);
      this.$axios.post('/forum/modifyClick', formData, {
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
      this.$router.push("/forum/article");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    pageChange(page) {
      this.pageCurrent = page;
    },
    pageSizeChange(page) {
      this.pageSize = page;
    },
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getCommentList();
    },
    getCommentList: function () {
      const _this = this;
      let formData = new FormData();
      formData.append('pageNum',_this.pageNum);
      formData.append('pageSize',_this.pageSize);

      let formData_a = new FormData();
      formData_a.append('pageNum',_this.pageNum);
      formData_a.append('pageSize',_this.pageSize);
      formData_a.append('userId',1);

      this.$axios.post('/forum/postListByTime', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true

      }).then(function (response) {
        _this.postlist_t = response.data.data.list;
        _this.totalComment1=response.data.data.total;
        _this.pageNum = response.data.data.pageNum;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });

      this.$axios.post('/forum/postListByClick', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true

      }).then(function (response) {
        _this.postlist_c = response.data.data.list;
        _this.totalComment2=response.data.data.total;
        _this.pageNum = response.data.data.pageNum;


      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });

      this.$axios.post('/forum/getFavoritePost', formData_a, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true

      }).then(function (response) {
        _this.postlist_a = response.data.data.list;
        _this.totalComment3=response.data.data.total;
        _this.pageNum = response.data.data.pageNum;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      });
    },
  },
  created(){
    const _this = this;
    let formData = new FormData();
    formData.append('pageNum',_this.pageNum);
    formData.append('pageSize',_this.pageSize);

    let formData_a = new FormData();
    formData_a.append('pageNum',_this.pageNum);
    formData_a.append('pageSize',_this.pageSize);
    formData_a.append('userId',1);

    this.$axios.post('/forum/postListByTime', formData, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      withCredentials: true

    }).then(function (response) {
      _this.postlist_t = response.data.data.list;
      _this.totalComment1=response.data.data.total;
    }).catch(function (response) {
      // 这里是处理错误的回调
      console.log(response)
    });

    this.$axios.post('/forum/postListByClick', formData, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      withCredentials: true

    }).then(function (response) {
      _this.postlist_c = response.data.data.list;
      _this.totalComment2=response.data.data.total;
    }).catch(function (response) {
      // 这里是处理错误的回调
      console.log(response)
    });

    this.$axios.post('/forum/getFavoritePost', formData_a, {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      withCredentials: true

    }).then(function (response) {
      _this.postlist_a = response.data.data.list;
      _this.totalComment3=response.data.data.total;
    }).catch(function (response) {
      // 这里是处理错误的回调
      console.log(response)
    });
  }

}

</script>
<style>
</style>
