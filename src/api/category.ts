import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function getCategoryPageData(queryInfo?: any) {
  return request({
    url: `category/page?${qs.stringify(queryInfo)}`,
    method: 'GET'
  })
}

export function getCategoryListData() {
  return request({
    url: 'category/list',
    method: 'GET'
  })
}

export function saveCategory(param: any) {
  return request({
    url: 'category',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function deleteCategoryById(id: string) {
  return request({
    url: `category/${id}`,
    method: 'DELETE'
  })
}