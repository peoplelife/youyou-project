import axios from 'axios'
import { getToken,removeToken,removeUSERToken } from './token'
import router from '../../router'
const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 7000
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
  const token=getToken()
  if(token){
    config.headers.Authorization = ` ${token}`
  }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.data.code==="499"){//token过期
      removeToken()
      removeUSERToken()
      localStorage.removeItem("cityName")
      localStorage.removeItem("id")
      localStorage.removeItem("orderInfo")
      router.navigate('/login')
    }else if(response.data.code==="498"){//非法请求
      router.navigate('/login')
    }
   
    return response.data
  }, (error)=> {
    
    return Promise.reject(error)
})
export {request }