import request from '../utils/request'

// 首页轮播图
export const getSwiper = () => request.get('home/swiperdata');
//首页分类导航
export const getCate = () => request.get('home/catitems');
//首页楼层
export const getFloor = () => request.get("home/floordata");