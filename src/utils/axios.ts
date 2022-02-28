import axios from "axios";
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  baseURL: '',
  timeout: 10000,
})