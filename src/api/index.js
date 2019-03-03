import request from '../utils/request'

// 首页轮播图
export const getSwiper = () => request.get('home/swiperdata');
//首页分类导航
export const getCate = () => request.get('home/catitems');
//首页楼层
export const getFloor = () => request.get("home/floordata");

//分类页数据
export const getCateList = () => request.get('categories')

//获取商品搜索列表数据
export const getSearchList = (obj) => request.get('goods/search', obj)

//获取商品详情页数据
export const getGoodsDetail = (obj) => request.get('goods/detail', obj)

//获取商品建议查询数据
export const getTips=(obj)=>request.get('goods/qsearch',obj)