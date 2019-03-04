<template>
  <scroll-view scroll-y class="goods_detail">
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular indicator-active-color="#fff" indicator-color="rgba(255,255,255,.5)">
      <block v-for="(item,index) in GoodsDetailList.pics" :key="index">
        <swiper-item>
          <image :src="item.pics_big" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 信息部分 -->
    <div scroll-y class="allInfo">
      <!-- 价格 -->
      <div class="price">￥{{GoodsDetailList.goods_price}}</div>
      <!-- 商品信息 -->
      <div class="goodsInfo">
        <div class="text">{{GoodsDetailList.goods_name}}</div>
        <div class="icon">收藏</div>
      </div>
      <!-- 快递 -->
      <div class="express">快递：免运费</div>
      <!-- 促销 -->
      <div class="discounts">
        <span>促销</span><span>满300减30元</span>
      </div>
    </div>
    <!-- 富文本 -->
    <div class="rich_text">
        <rich-text :nodes="GoodsDetailList.goods_introduce"></rich-text>
    </div>


    <!-- 购物车底部tab栏 -->
    <div class="cartTab">
      <div class="sevice">
        <i class="iconfont icon-kefu"></i>
        <span>联系客服</span>
      </div>
      <div class="cart">
        <i class="iconfont icon-gouwuchekong"></i>
        <span>购物车</span>
      </div>
      <div class="addCart">加入购物车</div>
      <div class="buyNow">立即购买</div>
    </div>
  </scroll-view>
</template>

<script>
import {getGoodsDetail} from '@/api'
export default {
  data () {
    return {
      id:Number,
      GoodsDetailList:{}//商品详情页数据
    }
  },
  onLoad(options){
    console.log(options);
    this.id=options.id
    this.initGoodsDetail()
  },
  methods: {
    initGoodsDetail(){
      getGoodsDetail({goods_id:this.id}).then(res=>{
        this.GoodsDetailList=res.data.message
        console.log(this.GoodsDetailList);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods_detail{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 120rpx;
  left: 0;
}
swiper{
  height: 720rpx;
    .slide-image{
    width: 750rpx;
    height: 720rpx;
  }
}
.allInfo{
  font-size: 30rpx;
  padding: 0 20rpx;
    .price{
      font-size: 40rpx;
      line-height: 120rpx;
      color: #eb4450;
    }
    .goodsInfo{
      color: #333;
      display: flex;
      height: 85rpx;
      overflow: hidden;
      .text{
        flex: 1;
        padding-right: 80rpx;
      }
      .icon{
        width: 130rpx;
        text-align: center;
        line-height: 85rpx;
        border-left: 1px solid #ccc;
      }
    }
    .express{
      color: #999;
      margin: 30rpx 0 80rpx 0;
    }
    .discounts{
      span:nth-child(2){
        padding-left: 40rpx;
        color: #eb4450;
      }
    }
}
.rich_text{
  font-size: 0;
}
.cartTab{
  height: 100rpx;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  div{
    flex: 1
  }
  .sevice,.cart{
    font-size: 24rpx;
    text-align: center;
    padding-top: 25rpx;
    color: #999
  }
  .addCart,.buyNow{
    font-size: 30rpx;
    line-height: 100rpx;
    text-align: center;
    color: #fff;
    background-color: #f4b73f;
  }
  .buyNow{
    background-color:#eb4450;
  }
}
</style>
