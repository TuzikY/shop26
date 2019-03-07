<template>
  <div>
    <!-- 头部搜索栏 -->
    <div class="topsearch">
      <div class="search_input">
        <icon type="search" size="16"></icon>
        <input
          focus 
          type="text" 
          placeholder="请输入你想要的商品" 
          v-model="inputVal" 
          @confirm="confirmSearch"
          @input="searchTips">
      </div>
      <button size="mini" @click="cancel">取消</button>
    </div>
    <!-- 内容盒子 -->
    <div class="content" >
      <!-- 搜索建议列表 -->
      <scroll-view scroll-y class="tips" v-show="inputVal">
        <div @tap="jumpToGoodsDetail(item.goods_id)" class="tips_list" v-for="(item,index) in tipList" :key="index">{{item.goods_name}}</div>
      </scroll-view>
      <!-- 历史搜索 -->
      <div class="content_title">
        <span>历史搜索</span>
        <icon type="clear" size="18" @tap="clearHistory"></icon>
      </div>
      <!-- 历史记录小卡片 -->
      <div class="content_main">
        <view @tap="jumpToSearchList(item)" class="box" v-for="(item,index) in historyList" :key="index">{{item}}</view>
      </div>
    </div>
  </div>
</template>

<script>
import {getTips} from '@/api'
export default {
  data () {
    return {
      inputVal:'',//输入框的值
      historyList:[],//搜索历史列表
      tipList:[]//搜索建议列表
    }
  },
  onShow(){
    this.historyList=wx.getStorageSync('searchHistory')||[];
  },
  methods: {
    //跳转到搜索商品列表页
    jumpToSearchList(inputVal){
      wx.navigateTo({ url: '/pages/goods_list/main'+'?keyword='+inputVal });
    },
    //跳转到商品详情页
    jumpToGoodsDetail(keyword){
      wx.navigateTo({ url: '/pages/goods_detail/main?keword='+ keyword});
    },
    //确认搜索
    confirmSearch(){
      // 将搜索历史追加到历史列表数组
      this.historyList.unshift(this.inputVal)
      //对数组进行去重处理,new Set去重后得到一个新数组
      this.historyList=[...new Set(this.historyList)]
      //把搜索历史存储到本地
      wx.setStorageSync('searchHistory',this.historyList)
      //跳转到商品列表页
      this.jumpToSearchList(this.inputVal)
    },
    //取消事件
    cancel(){
      this.inputVal=''
    },
    //监听搜索输入事件,给出搜索建议
    searchTips(){
      getTips({query:this.inputVal}).then(res=>{
        console.log(res);
        this.tipList=res.data.message
      })
    },
    //清空历史记录
    clearHistory(){
      wx.removeStorageSync('searchHistory');
      this.historyList=[]
    }
  }
}
</script>

<style lang="scss" scoped>
//头部搜索栏
.topsearch{
  padding: 30rpx 15rpx;
  background-color: #eeeeee;
  display: flex;
  .search_input{
    flex: 1;
    display: flex;
    height: 60rpx;
    background-color: #fff;
    font-size: 30rpx;
    icon{
      margin: 15rpx 15rpx 0 15rpx;
    }
  }
  button{
    width: 160rpx;
    margin-left: 16rpx;
  }
}
.content{
  position: fixed;
  top: 150rpx;
  right: 30rpx;
  bottom: 0;
  left: 30rpx;
  .tips{
    position: fixed;
    top: 120rpx;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .tips_list{
      margin: 50rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid #666;
      padding-bottom: 20rpx;
      font-size: 30rpx;
    }
  }
  .content_title{
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    color: #333
  }
  .content_main{
    display: flex;
    flex-wrap: wrap;
    .box{
      color: #333;
      font-size: 30rpx;
      padding: 20rpx 30rpx;
      background-color: #dddddd;
      margin: 30rpx 30rpx 18rpx 0;
    }
  }
}
</style>

