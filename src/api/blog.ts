import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function saveBlog(param: any) {
  return request({
    url: 'blog',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function getBlogDataById(id: string) {
  return request({
    url: `blog/${id}`,
    method: 'GET'
  })
}

export function getBlogPageData(queryInfo?: any) {
  return request({
    url: `blog/page?${qs.stringify(queryInfo)}`,
    method: 'GET',
    data: {
      ...queryInfo
    }
  })
}

export function deleteBlogById(id: string) {
  return request({
    url: `blog/${id}`,
    method: 'DELETE'
  })
}
