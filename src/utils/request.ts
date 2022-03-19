import axios from "axios";
import NProgress from 'vue-nprogress-ts'
import 'vue-nprogress-ts/lib/nprogress.min.css'

const request = axios.create({
  baseURL: 'http://localhost:8888/admin/',
  timeout: 10000,
})

export default request