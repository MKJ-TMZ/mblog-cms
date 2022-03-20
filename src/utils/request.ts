import axios from "axios";
import NProgress from 'vue-nprogress-ts/src/nprogress'
import 'vue-nprogress-ts/lib/nprogress.min.css'
import { msgError } from "@/utils/message";

const nprogress = new NProgress()

const request = axios.create({
  baseURL: 'http://localhost:8888/admin/',
  timeout: 10000,
})

// 响应拦截
request.interceptors.response.use(
  (res: any) => {
    nprogress.done()
    return res.data
  }
)

export default request