<template>
  <view>
    <!-- 搜索框 -->
    <search></search>
    <!-- 内容盒子 -->
    <view class="cate_contnet">
      <scroll-view scroll-y class="cate_left">
        <block v-for="(item,index) in cateList" :key="index">
          <view @tap="changeIndex(index)" :class="activated===index?'active':''">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <scroll-view scroll-y class="cate_right">
        <div class="cate_right_sub" v-for="(item,index) in rightList" :key="index">
          <div class="right_title">{{item.cat_name}}</div>
          <div class="right_content">
            <div class="goods_card" v-for="(subitem,subindex) in item.children" :key="subindex" @tap="jumpToListSearch(subitem.cat_name)">
              <img :src="URL+subitem.cat_icon">
              <div class="goods_text">{{subitem.cat_name}}</div>
            </div>
          </div>
        </div>
      </scroll-view>
    </view>
    
  </view>
</template>

<script>
import Search from '@/components/search'
import {getCateList} from '@/api'
export default {
  components: {
    Search
  },
  data () {
    return {
      URL:'https://autumnfish.cn/wx/',
      activated:0,
      cateList:[],
      rightList:[]
    }
  },
  created () {
    this.initCateList()
    // console.log(this.rightList);
  },
  methods: {
    initCateList(){
      getCateList().then(res=>{
        // console.log(res);
        this.cateList=res.data.message
        this.rightList=this.cateList[0].children
        // console.log(this.rightList);
      })
    },
    //点击tab栏事件
    changeIndex(index){
      this.activated=index;
      //先把右侧的数据清空,确保点击的时候打开的是头部
      this.rightList=[];
      //清空后才设置数据,让右侧默认滚动到顶部
      // 只要设置了定时器,不管时间延迟多久,都会被放到最后执行
      setTimeout(()=>{
        this.rightList=this.cateList[index].children
      },0)
    },
    //跳转到商品列表搜索
    jumpToListSearch(keyword){
      wx.navigateTo({ url: '/pages/goods_list/main'+'?keyword='+keyword });
    }
  }
}
</script>

<style>
.cate_contnet{
  position: fixed;
  left: 0;
  top: 98rpx;
  right: 0;
  bottom: 0;
  display: flex;
}
.cate_left{
  width: 200rpx;
}
.cate_left view{
  font-size: 30rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  color: #333;
  font-weight: bold;
  font-family: '黑体';
  background-color: #f4f4f4;
  position: relative;
}
.cate_left view.active{
  background-color: #fff;
  color: #eb4450
}
.cate_left view.active::after{
  content: '';
  width: 10rpx;
  position: absolute;
  top: 10rpx;
  bottom: 10rpx;
  left: 0;
  background-color: #eb4450;
}
.cate_right{
  flex: 1;
  height: 100%;
}
.right_title{
  text-align: center;
  margin: 30rpx 0;
}
.right_content{
  display: flex;
  flex-wrap: wrap;
}
.right_content img{
  width: 120rpx;
  height: 100rpx;
}
.goods_card{
  width: 33.33%;
  text-align: center;
  font-size: 28rpx;
  margin: 20rpx 0;
}
</style>
