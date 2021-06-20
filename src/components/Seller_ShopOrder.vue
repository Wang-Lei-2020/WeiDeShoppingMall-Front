<!--<template>-->
<!--  <div>-->
<!--  <div class="clearfix">-->
<!--    <div class="handling_style" id="order_hand">-->
<!--      <div id="scrollsidebar" class="left_Treeview">-->
<!--        <div class="show_btn" id="rightArrow"><span></span></div>-->
<!--        <div class="widget-box side_content" >-->
<!--          <div class="side_title"><a title="隐藏" class="close_btn"><span></span></a></div>-->
<!--          <div class="side_list"><div class="widget-header header-color-green2"><h4 class="lighter smaller">订单操作</h4></div>-->
<!--            <div class="widget-body">-->
<!--              <ul class="b_P_Sort_list">-->
<!--                <li><i class="orange  fa fa-reorder"></i><a href="http://www.erdangjiade.com">全部订单({{this.totalshopOrder}})</a></li>-->
<!--                </ul>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="order_list_style" id="order_list_style">-->
<!--        <div class="search_style">-->

<!--          <ul class="search_content clearfix">-->
<!--            <li><label class="l_f">订单编号</label><input name="" type="text"  class="text_add" placeholder="输入订单编号"  style=" width:250px"/></li>-->
<!--            <li><label class="l_f">交易时间</label><input class="inline laydate-icon" id="start" style=" margin-left:10px;"></li>-->
<!--            <li style="width:90px;"><button type="button" class="btn_search"><i class="fa fa-search"></i>查询</button></li>-->
<!--          </ul>-->
<!--        </div>-->
<!--        &lt;!&ndash;交易订单列表&ndash;&gt;-->
<!--        <div class="Orderform_list">-->
<!--          <table class="table table-striped table-bordered table-hover" id="sample-table">-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th width="25px"><label><input type="checkbox" class="ace"><span class="lbl"></span></label></th>-->
<!--              <th width="120px">订单编号</th>-->
<!--              <th width="250px">产品名称</th>-->
<!--              <th width="100px">交易金额</th>-->
<!--              <th width="100px">交易时间</th>-->
<!--              <th width="180px">所属分类</th>-->
<!--              <th width="80px">数量</th>-->
<!--              <th width="70px">状态</th>-->
<!--              <th width="100px">说明</th>-->
<!--              <th width="200px">操作</th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody  v-for="(shopOrder) in shopOrderList" :key="shopOrder.orderId" >-->
<!--&lt;!&ndash;            <el-col  v-for="(shopOrder) in shopOrderList" :key="shopOrder.orderId" >&ndash;&gt;-->
<!--&lt;!&ndash;            <tr>&ndash;&gt;-->
<!--&lt;!&ndash;              <td><label><input type="checkbox" class="ace"><span class="lbl"></span></label></td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td>{{ shopOrder.orderId }}</td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td class="order_product_name">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                <a href="http://www.erdangjiade.com" class="product_Display"><img src="../assets/商品.jpg"  title="产品名称"/></a>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;                <i class="fa fa-plus"></i>&ndash;&gt;-->
<!--&lt;!&ndash;              </td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td>{{ shopOrder.price }}</td>&ndash;&gt;-->

<!--&lt;!&ndash;              <td>2016-7-5</td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td>鞋款</td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td>{{ shopOrder.num}}</td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td class="td-status"><span class="label label-success radius">代发货</span></td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td></td>&ndash;&gt;-->
<!--&lt;!&ndash;              <td>&ndash;&gt;-->
<!--&lt;!&ndash;                <a onClick="Delivery_stop(this,'10001')"  href="javascript:;" title="发货"  class="btn btn-xs btn-success"><i class="fa fa-cubes bigger-120"></i></a>&ndash;&gt;-->
<!--&lt;!&ndash;                <a title="订单详细"  href="order_detailed.html"  class="btn btn-xs btn-info order_detailed" ><i class="fa fa-list bigger-120"></i></a>&ndash;&gt;-->
<!--&lt;!&ndash;                <a title="删除" href="javascript:;"  onclick="Order_form_del(this,'1')" class="btn btn-xs btn-warning" ><i class="fa fa-trash  bigger-120"></i></a>&ndash;&gt;-->
<!--&lt;!&ndash;              </td>&ndash;&gt;-->
<!--&lt;!&ndash;            </tr>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--<tr>-->
<!--  <td><label><input type="checkbox" class="ace"><span class="lbl"></span></label></td>-->
<!--  <td>{{ shopOrder.orderId }}</td>-->
<!--  <td class="order_product_name">-->
<!--    <a href="http://www.erdangjiade.com" class="product_Display"><img src="../assets/商品.jpg"  title="产品名称"/></a>-->
<!--    <i class="fa fa-plus"></i>-->
<!--  </td>-->
<!--  <td>{{ shopOrder.price }}</td>-->

<!--  <td>{{ shopOrder.buyTime }}</td>-->
<!--  <td>鞋款</td>-->
<!--  <td>{{ shopOrder.num }}</td>-->
<!--  <td v-if="shopOrder.states == 1" class="td-status"><span class="label label-success radius">交易完成</span></td>-->
<!--  <td v-if="shopOrder.states == 2" class="td-status"><span class="label label-success radius">交易失败</span></td>-->
<!--  <td></td>-->
<!--  <td>-->
<!--    <a onClick="Delivery_stop(this,'10001')"  href="javascript:;" title="发货"  class="btn btn-xs btn-success"><i class="fa fa-cubes bigger-120"></i></a>-->
<!--    <a title="订单详细"  href="order_detailed.html"  class="btn btn-xs btn-info order_detailed" ><i class="fa fa-list bigger-120"></i></a>-->
<!--    <a title="删除" href="javascript:;"  onclick="Order_form_del(this,'1')" class="btn btn-xs btn-warning" ><i class="fa fa-trash  bigger-120"></i></a>-->
<!--  </td>-->
<!--</tr>-->
<!--            </tbody>-->
<!--          </table>-->
<!--          <div style="margin-right: 80px; margin-top: 20px">-->
<!--            <el-pagination-->
<!--                background-->
<!--                layout="prev, pager, next"-->
<!--                :page-size="pageSize"-->
<!--                :total="totalshopOrder"-->
<!--                @current-change="handleCurrentChange"-->
<!--                style="float: right">-->
<!--            </el-pagination>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->

<!--  &lt;!&ndash;发货&ndash;&gt;-->
<!--  <div id="Delivery_stop" style=" display:none">-->
<!--    <div class="">-->
<!--      <div class="content_style">-->
<!--        <div class="form-group"><label class="col-sm-2 control-label no-padding-right" for="form-field-1">快递公司 </label>-->
<!--          <div class="col-sm-9"><select class="form-control" id="form-field-select-1">-->
<!--            <option value="">&#45;&#45;选择快递&#45;&#45;</option>-->
<!--            <option value="1">天天快递</option>-->
<!--            <option value="2">圆通快递</option>-->
<!--            <option value="3">中通快递</option>-->
<!--            <option value="4">顺丰快递</option>-->
<!--            <option value="5">申通快递</option>-->
<!--            <option value="6">邮政EMS</option>-->
<!--            <option value="7">邮政小包</option>-->
<!--            <option value="8">韵达快递</option>-->
<!--          </select></div>-->
<!--        </div>-->
<!--        <div class="form-group"><label class="col-sm-2 control-label no-padding-right" for="form-field-1"> 快递号 </label>-->
<!--          <div class="col-sm-9"><input type="text" id="form-field-1" placeholder="快递号" class="col-xs-10 col-sm-5" style="margin-left:0px;"></div>-->
<!--        </div>-->
<!--        <div class="form-group"><label class="col-sm-2 control-label no-padding-right" for="form-field-1">货到付款 </label>-->
<!--          <div class="col-sm-9"><label><input name="checkbox" type="checkbox" class="ace" id="checkbox"><span class="lbl"></span></label></div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

<!--  </div>-->

<!--  </div>-->

<!--</template>-->

<!--&lt;!&ndash;<style src="../css/bootstrap.min.css" scoped>&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--<style src="../css/style1.css" scoped>-->
<!--</style>-->
<!--<style src="../css/codemirror.css" scoped>-->
<!--</style>-->

<!--<script src="../css/jquery-1.9.1.min.js"></script>-->
<!--<script src="../css/bootstrap.min.js"></script>-->

<!--<script src="../css/typeahead-bs2.min.js"></script>-->
<!--<script src="../css/jquery.dataTables.min.js"></script>-->
<!--<script src="../css/jquery.dataTables.bootstrap.js"></script>-->
<!--<script src="../css/layer.js" type="text/javascript" ></script>-->
<!--<script src="../css/laydate.js" type="text/javascript"></script>-->
<!--<script src="../css/lrtk.js" type="text/javascript" ></script>-->

<!--<script>-->
<!--$(function() {-->
<!--  $("#order_hand").fix({-->
<!--    float : 'left',-->
<!--    //minStatue : true,-->
<!--    skin : 'green',-->
<!--    durationTime :false,-->
<!--    spacingw:30,//设置隐藏时的距离-->
<!--    spacingh:250,//设置显示时间距-->
<!--    table_menu:'.order_list_style',-->
<!--  });-->
<!--});-->


<!--//时间-->
<!--laydate({-->
<!--  elem: '#start',-->
<!--  event: 'focus'-->
<!--});-->
<!--//初始化宽度、高度-->
<!--$(".widget-box").height($(window).height());-->
<!--$(".order_list_style").width($(window).width()-220);-->
<!--$(".order_list_style").height($(window).height()-30);-->
<!--//当文档窗口发生改变时 触发-->
<!--$(window).resize(function(){-->
<!--  $(".widget-box").height($(window).height());-->
<!--  $(".order_list_style").width($(window).width()-234);-->
<!--  $(".order_list_style").height($(window).height()-30);-->
<!--});-->
<!--/**发货**/-->
<!--function Delivery_stop(obj,id){-->
<!--  layer.open({-->
<!--    type: 1,-->
<!--    title: '发货',-->
<!--    maxmin: true,-->
<!--    shadeClose:false,-->
<!--    area : ['500px' , ''],-->
<!--    content:$('#Delivery_stop'),-->
<!--    btn:['确定','取消'],-->
<!--    yes: function(index, layero){-->
<!--      if($('#form-field-1').val()==""){-->
<!--        layer.alert('快递号不能为空！',{-->
<!--          title: '提示框',-->
<!--          icon:0,-->
<!--        })-->

<!--      }else{-->
<!--        layer.confirm('提交成功！',function(index){-->
<!--          $(obj).parents("tr").find(".td-manage").prepend('<a style=" display:none" class="btn btn-xs btn-success" onClick="member_stop(this,id)" href="javascript:;" title="已发货"><i class="fa fa-cubes bigger-120"></i></a>');-->
<!--          $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发货</span>');-->
<!--          $(obj).remove();-->
<!--          layer.msg('已发货!',{icon: 6,time:1000});-->
<!--        });-->
<!--        layer.close(index);-->
<!--      }-->

<!--    }-->
<!--  })-->
<!--};-->
<!--//订单列表-->
<!--jQuery(function($) {-->
<!--  var oTable1 = $('#sample-table').dataTable( {-->
<!--    "aaSorting": [[ 1, "desc" ]],//默认第几个排序-->
<!--    "bStateSave": true,//状态保存-->
<!--    "aoColumnDefs": [-->
<!--      //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示-->
<!--      {"orderable":false,"aTargets":[0,2,3,4,5,6,8,9]}// 制定列不参与排序-->
<!--    ] } );-->
<!--  //全选操作-->
<!--  $('table th input:checkbox').on('click' , function(){-->
<!--    var that = this;-->
<!--    $(this).closest('table').find('tr > td:first-child input:checkbox')-->
<!--        .each(function(){-->
<!--          this.checked = that.checked;-->
<!--          $(this).closest('tr').toggleClass('selected');-->
<!--        });-->

<!--  });-->
<!--});-->

<!--</script>-->

<!--<script>-->

<!--export default {-->
<!--  name: "Seller_ShopOrder",-->
<!--  //页面初始化完成后要加载的东西-->
<!--  data(){-->
<!--    return{-->
<!--      shopOrderList:{},-->
<!--      totalshopOrder:"",-->
<!--      pageNum:"1",-->
<!--      pageSize:"5",-->
<!--      sellerId:localStorage.getItem("sellerId"),-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.getShopOrderList();-->
<!--    if (this.$route.params.isReload == 'true') {-->
<!--      this.$router.go(0);-->
<!--    }-->
<!--    // if (localStorage.getItem("role") == 'manager') {-->
<!--    //   this.isManager = true;-->
<!--    // }-->
<!--  },-->
<!--  methods: {-->
<!--    getShopOrderList: function () {-->
<!--      //print();-->
<!--      const _this = this;-->
<!--      let formData = new FormData;-->
<!--      formData.append('pageNum', _this.pageNum);-->
<!--      formData.append('pageSize', _this.pageSize);-->
<!--      formData.append('sellerId',localStorage.getItem('sellerId'))-->
<!--      this.$axios.post('/order/orderSelled', formData, {-->
<!--        headers: {-->
<!--          "Content-Type": "application/json;charset=utf-8"-->
<!--        },-->
<!--        withCredentials: true-->
<!--      }).then(function (response) {-->
<!--        // 这里是处理正确的回调-->
<!--        _this.shopOrderList = response.data.data.list;-->
<!--        _this.totalshopOrder = response.data.data.total;-->
<!--        _this.pageNum = response.data.data.pageNum;-->

<!--      }).catch(function (response) {-->
<!--        // 这里是处理错误的回调-->
<!--        console.log(response)-->
<!--      })-->
<!--    },-->
<!--    handleCurrentChange: function (pageNum) {-->
<!--      this.pageNum = pageNum;-->
<!--      this.getShopOrderList();-->
<!--    },-->
<!--    handleClose(done) {-->
<!--      this.getShopOrderList();-->
<!--      done();-->
<!--    },-->
<!--  }-->

<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->


<template>
  <div>
    <div class="clearfix">
      <div class="handling_style" id="order_hand">
        <div id="scrollsidebar" class="left_Treeview">
          <div class="show_btn" id="rightArrow"><span></span></div>
          <div class="widget-box side_content" >
            <div class="side_title"><a title="隐藏" class="close_btn"><span></span></a></div>
            <div class="side_list"><div class="widget-header header-color-green2"><h4 class="lighter smaller">订单操作</h4></div>
              <div class="widget-body">
                <ul class="b_P_Sort_list">
                  <li><i class="orange  fa fa-reorder"></i><a href="http://www.erdangjiade.com">全部订单({{this.totalshopOrder}})</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="order_list_style" id="order_list_style">
          <div class="search_style">

            <ul class="search_content clearfix">
              <li><label class="l_f">订单编号</label><input name="" type="text"  class="text_add" placeholder="输入订单编号"  style=" width:250px"/></li>
              <li><label class="l_f">交易时间</label><input class="inline laydate-icon" id="start" style=" margin-left:10px;"></li>
              <li style="width:90px;"><button type="button" class="btn_search"><i class="fa fa-search"></i>查询</button></li>
            </ul>
          </div>
          <!--交易订单列表-->
          <div class="Orderform_list">
            <table class="table table-striped table-bordered table-hover" id="sample-table">
              <thead>
              <tr>
                <th width="25px"><label><input type="checkbox" class="ace"><span class="lbl"></span></label></th>
                <th width="120px">订单编号</th>
                <th width="250px">产品名称</th>
                <th width="100px">交易金额</th>
                <th width="100px">交易时间</th>
                <th width="180px">收货人信息</th>
                <th width="80px">数量</th>
                <th width="70px">状态</th>
                <th width="70px">操作</th>


              </tr>
              </thead>

              <tbody  v-for="(shopOrder) in shopOrderList" :key="shopOrder.orderId" >
              <tr>
                <td><label><input type="checkbox" class="ace"><span class="lbl"></span></label></td>
                <td>{{ shopOrder.orderId }}</td>
                <td class="order_product_name">
                  <a href=" " class="product_Display"><img :src="shopOrder.url"  title="产品名称"/></a>
                <i class="fa fa-plus"></i>
                </td>
                <td>{{ shopOrder.price }}</td>

                <td>{{ shopOrder.buyTime }}</td>
                <td>{{shopOrder.receiver}}&nbsp;{{shopOrder.addressName}}&nbsp;{{shopOrder.addressInfo}}</td>
                <td>{{ shopOrder.num }}</td>
                <td v-if="shopOrder.states == 1" class="td-status"><span class="label label-success radius">交易完成</span></td>
                <td v-if="shopOrder.states == 2" class="td-status"><span class="label label-success radius">等待确认</span></td>
                <td v-if="shopOrder.states == 3"  class="td-status"><span class="label label-success radius">交易取消</span></td>

                <td>
                  <a title="确认取消订单" href="javascript:;"  v-onclick="toCancelOrder(shopOrder.orderId)" class="btn btn-xs btn-warning" ><i class="fa fa-trash  bigger-120"></i></a>
                </td>
              </tr>


                <!--  <td>-->
                <!--    <a onClick="Delivery_stop(this,'10001')"  href="javascript:;" title="发货"  class="btn btn-xs btn-success"><i class="fa fa-cubes bigger-120"></i></a>-->
                <!--    <a title="订单详细"  href="order_detailed.html"  class="btn btn-xs btn-info order_detailed" ><i class="fa fa-list bigger-120"></i></a>-->
                <!--    <a title="删除" href="javascript:;"  onclick="Order_form_del(this,'1')" class="btn btn-xs btn-warning" ><i class="fa fa-trash  bigger-120"></i></a>-->
                <!--  </td>-->

              </tbody>
            </table>
            <div style="margin-right: 80px; margin-top: 20px">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="pageSize"
                  :total="totalshopOrder"
                  @current-change="handleCurrentChange"
                  style="float: right">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!--发货-->
    <div id="Delivery_stop" style=" display:none">
      <div class="">
        <div class="content_style">
          <div class="form-group"><label class="col-sm-2 control-label no-padding-right" for="form-field-1">快递公司 </label>
            <div class="col-sm-9"><select class="form-control" id="form-field-select-1">
              <option value="">--选择快递--</option>
              <option value="1">天天快递</option>
              <option value="2">圆通快递</option>
              <option value="3">中通快递</option>
              <option value="4">顺丰快递</option>
              <option value="5">申通快递</option>
              <option value="6">邮政EMS</option>
              <option value="7">邮政小包</option>
              <option value="8">韵达快递</option>
            </select></div>
          </div>
          <div class="form-group"><label class="col-sm-2 control-label no-padding-right" for="form-field-1"> 快递号 </label>
            <div class="col-sm-9"><input type="text" id="form-field-1" placeholder="快递号" class="col-xs-10 col-sm-5" style="margin-left:0px;"></div>
          </div>
          <div class="form-group"><label class="col-sm-2 control-label no-padding-right" for="form-field-1">货到付款 </label>
            <div class="col-sm-9"><label><input name="checkbox" type="checkbox" class="ace" id="checkbox"><span class="lbl"></span></label></div>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<!--<style src="../css/bootstrap.min.css" scoped>-->
<!--</style>-->
<style src="../css/style1.css" scoped>
</style>
<style src="../css/codemirror.css" scoped>
</style>

<script src="../css/jquery-1.9.1.min.js"></script>
<script src="../css/bootstrap.min.js"></script>

<script src="../css/typeahead-bs2.min.js"></script>
<script src="../css/jquery.dataTables.min.js"></script>
<script src="../css/jquery.dataTables.bootstrap.js"></script>
<script src="../css/layer.js" type="text/javascript" ></script>
<script src="../css/laydate.js" type="text/javascript"></script>
<script src="../css/lrtk.js" type="text/javascript" ></script>

<script>
$(function() {
  $("#order_hand").fix({
    float : 'left',
    //minStatue : true,
    skin : 'green',
    durationTime :false,
    spacingw:30,//设置隐藏时的距离
    spacingh:250,//设置显示时间距
    table_menu:'.order_list_style',
  });
});


//时间
laydate({
  elem: '#start',
  event: 'focus'
});
//初始化宽度、高度
$(".widget-box").height($(window).height());
$(".order_list_style").width($(window).width()-220);
$(".order_list_style").height($(window).height()-30);
//当文档窗口发生改变时 触发
$(window).resize(function(){
  $(".widget-box").height($(window).height());
  $(".order_list_style").width($(window).width()-234);
  $(".order_list_style").height($(window).height()-30);
});

//订单列表
jQuery(function($) {
  var oTable1 = $('#sample-table').dataTable( {
    "aaSorting": [[ 1, "desc" ]],//默认第几个排序
    "bStateSave": true,//状态保存
    "aoColumnDefs": [
      //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
      {"orderable":false,"aTargets":[0,2,3,4,5,6,8,9]}// 制定列不参与排序
    ] } );
  //全选操作
  $('table th input:checkbox').on('click' , function(){
    var that = this;
    $(this).closest('table').find('tr > td:first-child input:checkbox')
        .each(function(){
          this.checked = that.checked;
          $(this).closest('tr').toggleClass('selected');
        });

  });
});

</script>

<script>

export default {
  name: "Seller_ShopOrder",
  //页面初始化完成后要加载的东西
  data(){
    return{
      shopOrderList:{},
      totalshopOrder:"",
      pageNum:"1",
      pageSize:"5",
      sellerId:localStorage.getItem("sellerId"),
      shopOrder:{
        id:"",
        orderId:"",
        addressName:"",
        buyTime:"",
        url:"",
        receiver:"",
        num:"",
        price:""
      }
    }
  },
  created() {
    this.getShopOrderList();
    if (this.$route.params.isReload == 'true') {
      this.$router.go(0);
    }
  },
  methods: {
    toCancelOrder: function (orderId){
      //print();
      //const _this = this;
      let formData = new FormData;
      formData.append('orderId', orderId);
      this.$axios.post('/order/confirmCancelOrder', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        //_this.$router.go(0)
      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    getShopOrderList: function () {
      //print();
      const _this = this;
      let formData = new FormData;
      formData.append('pageNum', _this.pageNum);
      formData.append('pageSize', _this.pageSize);
      formData.append('sellerId',localStorage.getItem('sellerId'))
      this.$axios.post('/order/orderSelled', formData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        // 这里是处理正确的回调
        _this.shopOrderList = response.data.data.list;
        _this.totalshopOrder = response.data.data.total;
        _this.pageNum = response.data.data.pageNum;

      }).catch(function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    handleCurrentChange: function (pageNum) {
      this.pageNum = pageNum;
      this.getShopOrderList();
    },
    handleClose(done) {
      this.getShopOrderList();
      done();
    },
  }
}
</script>

<style scoped>

</style>
