<template>
  <div class="cart">
    <!-- 购物车头部 -->
    <div class="cart_header" @tap="chooseAddress">
      <block v-if="userAddress.userName">
        <div class="user">
          <span>收货人:{{userAddress.userName}}</span>
          <span>></span>
        </div>
        <div>联系电话:{{userAddress.telNumber}}</div>
        <div class="address">收货地址:{{userAddress.addressInfo}}</div>
      </block>
      <block v-else>
        <div class="add_addresss">请添加收货地址+</div>
      </block>
    </div>
    <!-- 商品列表头部 -->
    <div class="goods_list_header">
      <text class="iconfont icon-Group-"></text>
      <span>优购生活馆</span>
    </div>
    <!-- 商品卡片 -->
    <div class="goods_card" v-for="(item,index) in cartList" :key="index" @tap="jumpToDetail(item.goods_id)">
      <icon
        @tap="item.selected = !item.selected"
        type="success"
        :color="item.selected?'red':'gray'"
        size="15"
      ></icon>
      <img :src="item.goods_small_logo" alt>
      <div class="goods_card_content">
        <div class="goods_text">{{item.goods_name}}</div>
        <div class="goods_price">
          <div class="goods_price_left">￥
            <text>{{item.goods_price}}</text>.00
          </div>
          <div class="goods_price_right">
            <i class="iconfont icon-jianshao" @tap="changeNum(index,-1)"></i>
            <span>{{item.num}}</span>
            <i class="iconfont icon-tianjia" @tap="changeNum(index,1)"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 留空 -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userAddress: {
          userName: "",
          telNumber: "",
          addressInfo: ""
        }, //用户地址
        allSelected:true,
        cartList: [] ,//购物车数据
        allPrice:0,//总价
        allNum:0//总类目
      };
    },
    computed: {
      //计算全选,总价和总类目
      computerAll() {
        this.allSelected=true;
        this.allPrice=0;
        this.allNum=0;
        for(var key in this.cartList){
          let item=this.cartList[key]
          if(item.selected==false){
            this.allSelected=false;
          }else{
            this.allPrice+=item.goods_price*item.num
            this.allNum++
          }
        }
        return this.allSelected;
      }
    },
    onShow() {
      //初始化地址
      this.userAddress=wx.getStorageSync('address');
      // 初始化页面渲染
      this.cartList = wx.getStorageSync("cartList") || [];
    },
    methods: {
      //选择地址
      chooseAddress() {
        wx.chooseAddress({
          success: res => {
            console.log(res);
            let {
              userName,
              provinceName,
              cityName,
              countyName,
              detailInfo,
              telNumber
            } = res;
            this.userAddress = {
              userName,
              telNumber,
              addressInfo: `${provinceName}${cityName}${countyName}${detailInfo}`
            };
            wx.setStorageSync('address',this.userAddress)
          }
        });
      },
      //加减数量
      changeNum(index, handle) {
        //当检测到此时num的值已经是1了,再点击的话弹出提示框
        if (this.cartList[index].num === 1 && handle === -1) {
          wx.showModal({
            content: "是否删除商品",
            showCancel: true, //是否显示取消按钮,
            confirmText: "删除", //确定按钮的文字，默认为取消，最多 4 个字符,
            confirmColor: "red", //确定按钮的文字颜色,
            success: res => {
              if (res.confirm) {
                delete this.cartList[index];
                this.cartList = JSON.parse(JSON.stringify(this.cartList));
              } else if (res.cancel) {
                this.cartList[index].num += 1;
              }
            }
          });
        }
        this.cartList[index].num += handle;
      },
      //改变是否选中
      chooseGoods(index) {
        this.cartList[index].selected = !this.cartList[index].selected;
      },
      //跳转至商品详情
      jumpToDetail(id){
        wx.navigateTo({ url: '/pages/goods_detail/main?id='+id });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .cart {
    color: #333;
    margin-bottom: 100rpx;
    .cart_header {
      line-height: 60rpx;
      padding: 0 20rpx;
      font-size: 30rpx;
      border-bottom: 15rpx solid skyblue;
      .user {
        display: flex;
        justify-content: space-between;
      }
      .add_addresss{
        height: 180rpx;
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .goods_list_header {
      border-top: 20rpx solid #f4f4f4;
      border-bottom: 1px solid #dddddd;
      height: 85rpx;
      line-height: 85rpx;
      font-size: 30rpx;
      .icon-Group- {
        margin: 0 15rpx 0 30rpx;
      }
    }
    .goods_card {
      padding: 30rpx;
      height: 170rpx;
      font-size: 30rpx;
      display: flex;
      border-bottom: 1px solid #ddd;
      icon {
        line-height: 170rpx;
        margin-right: 20rpx;
      }
      > img {
        width: 160rpx;
        height: 160rpx;
      }
      .goods_card_content {
        flex: 1;
        .goods_text {
          height: 78rpx;
          overflow: hidden;
          margin-bottom: 50rpx;
        }
        .goods_price {
          display: flex;
          justify-content: space-between;
          .goods_price_left {
            color: #eb4450;
            font-size: 30rpx;
            text {
              font-size: 40rpx;
            }
          }
          .goods_price_right {
            display: flex;
            i {
              font-size: 50rpx;
              margin-top: -5rpx;
            }
            span {
              margin: 0rpx 15rpx 0;
            }
          }
        }
      }
    }
    .footer_pay {
      background-color: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 1px solid #b3b3b3;
      height: 100rpx;
      display: flex;
      font-size: 30rpx;
      align-items: center;
      > icon {
        margin: 0 30rpx;
      }
      > span {
        margin-right: 120rpx;
      }
      .center {
        .center_top {
          display: flex;
          > span {
            margin-top: 10rpx;
          }
          div {
            color: #eb4753;
            span {
              font-size: 40rpx;
            }
          }
        }
        .center_bottom {
          color: #aeaeae;
          font-size: 24rpx;
        }
      }
      .pay {
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

