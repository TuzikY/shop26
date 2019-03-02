<template>
  <div class="index">
      <!-- 头部 -->
    <div class="header">
      <div class="search">
        <icon type="search" size="24"/>搜索
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular indicator-color="rgba(255,255,255,.3)" indicator-active-color="#fff">
      <block v-for="item in swiperList" :key="item">
        <swiper-item>
          <image :src="item.image_src" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 导航菜单 -->
    <div class="nav">
      <img v-for="item in navList" :key="item" :src="item.image_src" alt="">
    </div>
    <!-- 产品楼层 -->
    <div class="fashion" v-for="(item,index) in fashionList" :key="index">
      <div class="fashion_title">
        <img mode="aspectFit" :src="item.floor_title.image_src" alt="">
      </div>
      <div class="fashion_content">
        <div class="left"><img :src="item.product_list[0].image_src" alt=""></div>
        <div class="right">
          <block v-for="(subitem,subindex) in item.product_list" :key="subindex" >
            <img :src="subitem.image_src" alt="" v-if="subindex!=0">
          </block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request.js'
export default {
  data () {
    return {
      swiperList:[],
      navList:[],
      fashionList:[]
    }
  },
  mounted () {
    request('https://autumnfish.cn/wx/api/public/v1/home/swiperdata').then(res=>{
      this.swiperList=res.data.message
    }),
    request('https://autumnfish.cn/wx/api/public/v1/home/catitems').then(res=>{
      this.navList=res.data.message
    }),
    request('https://autumnfish.cn/wx/api/public/v1/home/floordata').then(res=>{
      this.fashionList=res.data.message
    })
  }
}
</script>

<style>
img,image{
  display: block;
}
.header{
  padding: 15rpx;
  background-color: #ff2d4a;
  position: fixed;
  width:100%;
  z-index: 10;
}
.header .search{
  width:720rpx;
  height: 70rpx;
  font-size: 40rpx;
  color: #666;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx
}
swiper{
  padding-top: 100rpx;
}
swiper,.slide-image{
  width: 750rpx;
  height: 340rpx;
}

.nav{
  padding: 14rpx 0;
  display: flex;
  justify-content: space-around;
}
.nav img{
  width: 128rpx;
  height: 140rpx;
}
.fashion_title{
  padding: 20rpx 0;
}
.fashion_title img{
  width: 750rpx;
  height: 59rpx;
}
.fashion_content{
  width: 750rpx;
  height: 416rpx;
  display: flex;
  padding: 20rpx 10rpx;
}
.fashion_content .left{
  flex: 1
}
.fashion_content .left img{
  width: 100%;
  height: 386rpx;
}
.fashion_content .right{
  flex: 2;
}
.fashion_content .right img{
  float: left;
  width: 233rpx;
  height: 188rpx;
  margin: 0 0 10rpx 10rpx;
}

</style>
