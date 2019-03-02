<template>
  <div class="header">
      <div class="search">
        <icon type="search" size="24"/>搜索
      </div>
    </div>
</template>

<style>
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
</style>
