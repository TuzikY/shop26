<template>
  <div class="cart">
    <!-- 购物车头部 -->
    <div class="cart_header" @tap="chooseAddress">
      <div class="user">
        <span>收货人:</span>
        <span>></span>
      </div>
      <div class="address">收货地址:</div>
    </div>
    <!-- 商品列表头部 -->
    <div class="goods_list_header">
      <text class="iconfont icon-Group-"></text>
      <span>优购生活馆</span>
    </div>
    <!-- 商品卡片 -->
    <div class="goods_card">
      <icon type="success" color="red" size="15"></icon>
      <img src="" alt="">
      <div class="goods_card_content">
        <div class="goods_text">初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽卫衣装新款潮牌女装加绒宽松BF风慵懒卫衣女套</div>
        <div class="goods_price">
          <div class="goods_price_left">￥<text>279</text>.00</div>
          <div class="goods_price_right">
            <i class="iconfont icon-jianshao"></i>
            <span>5</span>
            <i class="iconfont icon-tianjia"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部结算部分 -->
    <div class="footer_pay">
      <icon type="success" color="red" size="15"></icon>
      <span>全选</span>
      <div class="center">
        <div class="center_top">
          <span>合计:</span>
          <div>￥<span>17110</span>.00</div>
        </div>
        <div class="center_bottom">包含运费</div>
      </div>
      <div class="pay">结算(3)</div>
    </div>
  </div>
  
</template>

<script>

export default {
  data () {
    return {
      userAddress:{},//用户地址
      cardList:[]//购物车数据
    }
  },
  chooseAddress(){
    wx.chooseAddress({
      success: res=>{
        console.log(res);
        console.log(res.userName);
        console.log(res.postalCode);
        console.log(res.provinceName);
        console.log(res.cityName);
        console.log(res.countyName);
        console.log(res.detailInfo);
        console.log(res.nationalCode);
        console.log(res.telNumber);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.cart{
  color: #333;
  .cart_header{
    height: 200rpx;
    line-height: 100rpx;
    padding: 0 20rpx;
    font-size: 30rpx;
    border-bottom: 15rpx solid skyblue;
    .user{
      display: flex;
      justify-content: space-between;
    }
  }
  .goods_list_header{
    border-top: 20rpx solid #f4f4f4;
    border-bottom: 1px solid #dddddd;
    height: 85rpx;
    line-height: 85rpx;
    font-size: 30rpx;
    .icon-Group-{
      margin: 0 15rpx 0 30rpx;
    }
  }
  .goods_card{
    padding: 30rpx;
    height: 170rpx;
    font-size: 30rpx;
    display: flex;
    border-bottom: 1px solid #ddd;
    icon{
      line-height: 170rpx;
    }
    >img{
      width: 160rpx;
      height: 160rpx;
    }
    .goods_card_content{
      flex: 1;
      .goods_text{
        height: 78rpx;
        overflow: hidden;
        margin-bottom: 50rpx;
      }
      .goods_price{
        display: flex;
        justify-content: space-between;
        .goods_price_left{
          color: #eb4450;
          font-size: 30rpx;
          text{
            font-size: 40rpx;
          }
        }
        .goods_price_right{
          display: flex;
          i{
            font-size: 50rpx;
            margin-top: -5rpx;
          }
          span{
            margin: 0rpx 15rpx 0;
          }
        }
      }
    }
  }
  .footer_pay{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid #b3b3b3;
    height: 100rpx;
    display: flex;
    font-size: 30rpx;
    align-items: center;
    >icon{
      margin: 0 30rpx;
    }
    >span{
      margin-right: 120rpx;
    }
    .center{
      .center_top{
        display: flex;
        >span{
          margin-top: 10rpx;
        }
        div{
          color: #eb4753;
          span{
            font-size: 40rpx;
          }
        }
      }
      .center_bottom{
        color: #aeaeae;
        font-size: 24rpx;
      }
    }
    .pay{
      flex: 1;
      margin-left: 20rpx;
      line-height: 100rpx;
      text-align: center;
      background-color: #eb4450;
      color: #fff;
    }
  }
}
</style>

