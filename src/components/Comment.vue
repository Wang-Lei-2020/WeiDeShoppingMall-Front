<template>
    <div>
      <el-container>
        <el-aside width="10%"></el-aside>
        <el-main>
          <div>
            <el-row>
              <el-col :span="7" :key="commodity.name">
                <el-card style="margin-top: 100px" class="shopCard" :title="commodity.name">
                  <div>
                    <img :src="getCommodityUrl" alt="商品封面" width="100%" class="image">
                    <div style="padding: 10px;">
                      <span>商品名: {{ commodity.name }} </span>
                      <div class="bottom clearfix">
                        <div class="shopKind" style="height: 1em"> 商品价格: ￥{{ commodity.price }}</div>
                        <div class="shopKind" style="height: 1em"> 剩余数量: {{ commodity.leftNum }}  件</div>
                        <div class="shopKind" style="height: 1em"> 已售数量: {{ commodity.soldNum }}  件</div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>

              <el-aside width="10%"></el-aside>

              <el-col :span="17" class="comment">
                <div v-for="(comment,i) in commentList" :key="i" class="author-title reply-father">
                    <el-avatar class="header-img" :size="40" :src="comment.userUrl"></el-avatar>
                    <div class="author-info">
                     <span class="author-name">{{comment.userName}}</span>
                     <span class="author-time">{{comment.sendTime}}</span>
                    </div>
                  <div class="icon-btn">
                    <span @click="change(i)"><i class="iconfont el-icon-chat-dot-round" title="回复"></i></span>


<!--      待实现的点赞效果              <img src="@/assets/admire1.png" v-if="!admire" @click="cancelLike()" class="img">-->
<!--                    <img v-else src="@/assets/admire2.png"  @click="addLike()" class="img">-->

                    <span @click="like(comment.id)"><i class="iconfont el-icon-thumb" title="点赞"></i>{{comment.likeNum}}</span>
<!--                    <i class="iconfont el-icon-thumb">-->
<!--                      <span @click="like(comment.id)"></span> {{comment.likeNum}}-->
<!--                    </i>-->
                  </div>
                  <div class="talk-box">
                    <p>
                      <span class="reply">{{comment.content}}</span>
                    </p>
                  </div>
                  <div v-if="isReplied(comment.reply)" class="reply-box">
                    <div class="author-title">
                      <el-avatar class="header-img" :size="40" :src="comment.sellerUrl"></el-avatar>
                      <div class="author-info">
                        <span class="author-name">{{sellerName}}</span>
                        <span class="author-time">{{comment.replyTime}}</span>
                      </div>
                      <div class="talk-box">
                        <p>
                          <span>回复 {{comment.userName}}:</span>
                          <span class="reply">{{comment.reply}}</span>
                        </p>
                      </div>
                      <div class="reply-box">
                      </div>
                    </div>
                  </div>
                  <div  v-show="(i==replyFlag)&(!isReplied(comment.reply))" class="my-reply my-comment-reply">
                    <el-avatar class="header-img" :size="40" :src="comment.sellerUrl"></el-avatar>
                    <div class="reply-info">
<!--                      <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>-->
                      <el-input v-model="commentReply" placeholder="输入评论..."></el-input>
                    </div>
                    <div class=" reply-btn-box">
                      <el-button class="reply-btn" size="medium" @click="sendCommentReply(comment.id)" type="primary">发表评论</el-button>
                    </div>
                  </div>
                </div>

                <div style="margin-right: 80px; margin-top: 20px">
                  <el-pagination
                      background
                      layout="prev, pager, next"
                      :page-size="pageSize"
                      :total="totalComment"
                      @current-change="handleCurrentChange"
                      style="float: right">
                  </el-pagination>
                </div>

              </el-col>
            </el-row>
          </div>
        </el-main>
        <!--      <el-aside width="10%"></el-aside>-->
        <el-aside width="15%">
          <el-button @click="toSeller()" type="primary" icon="el-icon-back" circle
                     size="large"
                     style="margin-top: 12px">返回</el-button>
        </el-aside>

      </el-container>
    </div>
</template>


<script>
export default {
  name:'Comment',
  data(){
    return{
      commodity: {
        id: "",
        name: "",
        price: "",
        leftNum: "",
        soldNum: ""
      },
      comment: {
        id: "",
        userId: "",
        userName: "",
        sellerId: "",
        commodityId: "",
        content: "",
        likeNum: 0,
        reply: "",
        sendTime: "",
        replyTime: "",
        userUrl:"",
        sellerUrl:""
      },
      commentList: {},
      pageSize: 6,
      pageNum: 1,
      totalComment: 0,
      index:'0',
      replyComment:'',
      // myName:'Lana Del Rey',
      headImg:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
      to:'',
      toId:-1,
      sellerId: 0,
      sellerName: "",
      commentReply: "",
      commodityId: 0,
      replyFlag: "10",
      admire: false,
    }
  },
  computed:{
    getCommodityUrl:function(){
      return localStorage.getItem('commodityUrl')
    }
  },
  created(){
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
    this.sellerId = localStorage.getItem('sellerId');
    this.sellerName = localStorage.getItem('username');
    this.commodityId = localStorage.getItem('commodityID');
    this.commodity.id = localStorage.getItem('commodityID');
    this.commodity.name = localStorage.getItem('commodityName');
    this.commodity.price = localStorage.getItem('commodityPrice');
    this.commodity.soldNum = localStorage.getItem('commoditySoldNum');
    this.commodity.leftNum = localStorage.getItem('commodityLeftNum');
    this.getCommentList();
  },
  methods: {
    // changeLike:function() {
    //   this.admire==false?this.admire=true:this.admire=false;
    //   localStorage.setItem('admire',this.admire);
    // },
    like: function(commentId) {
      const _this = this;
      let formData = new FormData;
      formData.append('id',commentId);
      this.$axios.post('/commodity/addLike', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        // 这里是处理正确的回调
        _this.$router.go(0);
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    sendCommentReply: function(commentId) {
      const _this = this;
      let formData = new FormData;
      formData.append('id', commentId);
      formData.append('reply', _this.commentReply);
      this.$axios.post('/commodity/modifyReply', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function () {
        _this.$message({
          message : "成功回复",
          type: 'success'
        })
        // 这里是处理正确的回调
        _this.$router.go(0);
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    change: function(index){
      this.replyFlag = index;
    },
    isReplied: function(reply) {
      if(reply == null){
        return false;
      }
      return true;
    },
    getCommentList: function () {
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('sellerId', _this.sellerId);
      formData.append('commodityId', _this.commodityId);
      this.$axios.post('/commodity/commentList', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.commentList = response.data.data.list;
        _this.totalComment = response.data.data.total;
        _this.pageNum = response.data.data.pageNum;
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getCommentList();
    },
    toSeller: function(){
      this.$router.push({name: 'Seller', params: {isReload: 'true'}});
    }
  }
}
</script>


<style lang="stylus" scoped>
.comment {
  padding: 30px 80px;
}

.img{
  padding-top: 10px;
  width: 25px;
  height: auto;
}

.shopKind {
  font-size: 13px;
  color: #999;
  overflow: hidden;
}

.bottom {
  margin-top: 10px;
  line-height: 13px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.shopCard:hover {
  cursor: pointer;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
}

.my-reply
  padding 10px
  background-color #fafbfc
  .header-img
    display inline-block
    vertical-align top
  .reply-info
    display inline-block
    margin-left 5px
    width 90%
    @media screen and (max-width:1200px) {
      width 80%
    }
    .reply-input
      min-height 20px
      line-height 22px
      padding 10px 10px
      color #ccc
      background-color #fff
      border-radius 5px
      &:empty:before
        content attr(placeholder)
      &:focus:before
        content none
      &:focus
        padding 8px 8px
        border 2px solid blue
        box-shadow none
        outline none
  .reply-btn-box
    height 25px
    margin 10px 0
    .reply-btn
      position relative
      float right
      margin-right 15px
.my-comment-reply
  margin-left 50px
  .reply-input
    width flex
.author-title:not(:last-child)
  border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
  padding 10px
  .header-img
    display inline-block
    vertical-align top
  .author-info
    display inline-block
    margin-left 5px
    width 60%
    height 40px
    line-height 20px
    >span
      display block
      cursor pointer
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .author-name
      color #000
      font-size 18px
      font-weight bold
    .author-time
      font-size 14px
  .icon-btn
    width 30%
    padding 0 !important
    float right
    @media screen and (max-width : 1200px){
      width 20%
      padding 7px
    }
    >span
      cursor pointer
    .iconfont
      margin 0 5px
  .talk-box
    margin 0 50px
    >p
      margin 0
    .reply
      font-size 16px
      color #000
  .reply-box
    margin 10px 0 0 50px
    background-color #efefef
</style>
