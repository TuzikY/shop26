//封装请求的方法
function request(url, method = "GET", data = {}, header = {}) {
  //Promise构造函数 创建的对象,可以直接.then运行回调函数
  //resolve就是.then运行的函数,reject是失败时运行的函数
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    })
  })
}

//导出,暴露request函数
//如果导出的是export default命令,
//导入使用import request from "路径"
export default request