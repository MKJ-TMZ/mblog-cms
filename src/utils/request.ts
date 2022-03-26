import axios from "axios";
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isNotEmpty } from "@/utils/func";

const request = axios.create({
  baseURL: 'http://localhost:8888/admin/',
  timeout: 30000,
})

// 请求拦截
request.interceptors.request.use((config: any) => {
    console.log(window.location.pathname !== '/login')
    if (window.location.pathname !== '/login') {
      const token = window.localStorage.getItem('token') || ''
      if (isNotEmpty(token)) {
        config.headers.Authorization = token
      } else {
        window.location.href = '/login'
      }
    }
    NProgress.start()
    return config
  }
)

// 响应拦截
request.interceptors.response.use(
  (res: any) => {
    NProgress.done()
    return res.data
  }
)

export default request