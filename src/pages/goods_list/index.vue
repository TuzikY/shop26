<template>
  <view>
    <!-- 头部搜索 -->
    <div class="search_list_header">
      <div class="search_box">
        <icon
          type="search"
          size="20">
        </icon>
        <input type="text" v-model="keyword" @confirm="initSearchList({query:keyword})">
      </div>
      
    </div>
    <!-- 内容部分-->
    <div class="search_content">
      <div class="search_content_title">
        <span class='active' >综合</span>
        <span>销量</span>
        <span>价格<span class="iconfont icon-shangxia"></span></span>
      </div>
      <div class="search_content_main">
        <div class="cards" v-for="(item,index) in searchList" :key="index" @tap="jumpToDetail(item.goods_id)">
          <div class="cards_left"><img :src="item.goods_small_logo" alt=""></div>
          <div class="cards_right">
            <div class="cards_right_text">{{item.goods_name}}</div>
            <div class="cards_right_price">￥<span>{{item.goods_price}}</span>.00</div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import {getSearchList} from '@/api'
export default {
  data () {
    return {
      keyword:'',
      pagenum:1,
      searchList:[]
    }
  },
  onLoad(options){
    this.keyword=options.keyword
    this.initSearchList({query:this.keyword})
  },
  methods:{
    //初始化搜索商品列表页
    initSearchList(obj){
      getSearchList(obj).then(res=>{
        this.searchList=res.data.message.goods
      })
    },
    jumpToDetail(keyword){
      wx.navigateTo({ url: '/pages/goods_detail/main'+'?keyword='+keyword });
    }
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
</style>

