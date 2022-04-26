import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function getTagPageData(queryInfo: any) {
  return request({
    url: `tag/page?${qs.stringify(queryInfo)}`,
    method: 'GET',
    data: {
      ...queryInfo
    }
  })
}

export function getTagListData() {
  return request({
    url: 'tag/list',
    method: 'GET'
  })
}

export function saveTag(param: any) {
  return request({
    url: 'tag',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function deleteTagById(id: string) {
  return request({
    url: `tag/${id}`,
    method: 'DELETE'
  })
}
