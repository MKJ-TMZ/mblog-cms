import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function saveBlog(param: any) {
  return request({
    url: 'blog/save',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function getBlogDataById(id: string) {
  return request({
    url: `blog/detail/${id}`,
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

export function updateBlog(param: any) {
  return request({
    url: 'blog/update',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function deleteBlogById(id: string) {
  return request({
    url: `blog/delete/${id}`,
    method: 'DELETE'
  })
}
