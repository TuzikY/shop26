<template>
  <view>
    <!-- 头部搜索 -->
    <div class="search_list_header">
      <div class="search_box">
        <icon
          type="search"
          size="20">
        </icon>
        <input type="text" v-model="keyword" @confirm="confirmSearch">
      </div>
      
    </div>
    <!-- 内容部分-->
    <div class="search_content">
      <!-- tab栏部分 -->
      <div class="search_content_title">
        <span @click="changeTab(index)" :class="activated===index?'active':''" v-for="(item,index) in tabList" :key="index">{{item}}
          <span v-if="index===2" class="iconfont icon-shangxia"></span>
        </span>
      </div>
      <!-- 主体内容部分 -->
      <div class="search_content_main">
        <!-- 商品卡片 -->
        <div class="cards" v-for="(item,index) in searchList" :key="index" @tap="jumpToDetail(item.goods_id)">
          <div class="cards_left"><img :src="item.goods_small_logo" alt=""></div>
          <div class="cards_right">
            <div class="cards_right_text">{{item.goods_name}}</div>
            <div class="cards_right_price">￥<span>{{item.goods_price}}</span>.00</div>
          </div>
        </div>
        <div class="loading" v-if="!hasMore">我也是有底线的...</div>
      </div>
    </div>
  </view>
</template>

<script>
import {getSearchList} from '@/api'
export default {
  data () {
    return {
      activated:0,
      keyword:'',
      pagenum:1,
      searchList:[],//页面初始化的数据列表
      tabList:['综合','销量','价格'],
      hasMore:true
    }
  },
  onLoad(options){
    this.keyword=options.keyword
    //根据keyword初始化页面
      this.initSearchList()
  },
  onShow(){
    //onload事件在页面销毁之前只会执行一次,所以从搜索页跳转过来的时候,需要初始化数据
    this.initDate()
    this.initSearchList()
  },
  //上拉触底事件
  onReachBottom(){
    console.log('上拉触底了');
    this.initSearchList()
  },
  //下拉刷新事件
  onPullDownRefresh(){
    console.log('下拉刷新了');
    this.initDate();
    this.initSearchList();
  },
  methods:{
    // 初始化数据
    initDate(){
      this.searchList=[];
      this.pagenum=1;
      this.hasMore=true;
    },
    //初始化搜索商品列表页
    initSearchList(){
      if(!this.hasMore) return;
      wx.showLoading({
        title:'加载中'
      })
      getSearchList({
        query:this.keyword,
        pagenum:this.pagenum
      }).then(res=>{
        //如果请求到的长度已经不足20条,hasMore就要取反,代表没有数据了
        if(res.data.message.goods<20){
          this.hasMore=false
        }
        this.searchList=[...this.searchList,...res.data.message.goods]
        this.pagenum++;
        wx.hideLoading()//隐藏掉loading图标
        wx.stopPullDownRefresh();//数据渲染完成后取消掉刷新状态
        console.log(res);
        console.log(this.searchList);
      })
    },
    //跳转到商品详情页
    jumpToDetail(keyword){
      wx.navigateTo({ url: '/pages/goods_detail/main'+'?keyword='+keyword });
    },
    //tab栏切换事件
    changeTab(index){
      this.activated=index
    },
    // input框搜索事件
    confirmSearch(){
      if(!this.keyword){
        wx.showToast({
          title: '输入内容为空!', //提示的内容,
          icon: 'none', //图标,
          duration: 1500, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
      }else{
        this.initDate();
        this.initSearchList();
      }
    },
    
  }
}
</script>


<style>
.active{
  color: #eb4855
}
.search_list_header{
  background-color: #eee;
  padding: 24rpx 16rpx;
}
.search_box{
  display: flex;
  background-color: #fff;
  padding: 10rpx;
}
.search_box icon{
  text-indent: 25rpx;
  padding-top: 10rpx;
}
.search_box input{
  font-size: 30rpx;
  padding-left: 15rpx;
}

.search_content_title{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100rpx;
  font-size: 30rpx;
  border-bottom: 1px solid #dddddd;
}
.search_content_title .icon-shangxia{
  padding-left: 10rpx;
}

.cards{
  padding: 30rpx 20rpx;
  display: flex;
}
.cards_left{
  width: 200rpx;
  height: 200rpx;
}
.cards_left img{
  width:100%;
  height: 100%;
}
.cards_right{
  flex: 1;
  padding-left: 20rpx;
}
.cards_right_text{
  width: 480rpx;
  font-size: 30rpx;
  line-height: 40rpx;
  height: 80rpx;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;                  
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.cards_right_price{
  color: red;
  font-size: 26rpx;
  margin-top: 80rpx;
}
.cards_right_price span{
  font-size: 40rpx;
}
.loading{
  font-size: 30rpx;
  color: #666;
  text-align: center;
  margin: 30rpx 0;
}
</style>

