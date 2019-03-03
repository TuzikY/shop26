<template>
  <div>商品详情</div>
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
    this.id=options.keyword
    this.initGoodsDetail({goods_id:this.id})
  },
  methods: {
    initGoodsDetail(obj){
      getGoodsDetail(obj).then(res=>{
        this.GoodsDetailList=res.data.message
        console.log(this.GoodsDetailList);
      })
    }
  }
}
</script>

<style>


</style>
