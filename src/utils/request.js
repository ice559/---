// 封装axios请求模块
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0' // 基础路径
})
// 默认导出
export default request
