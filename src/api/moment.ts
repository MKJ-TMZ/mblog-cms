import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function saveMoment(param: any) {
  return request({
    url: 'moment/save',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function getMomentDataById(id: string) {
  return request({
    url: `moment/detail/${id}`,
    method: 'GET'
  })
}

export function getMomentPageData(queryInfo?: any) {
  return request({
    url: `moment/page?${qs.stringify(queryInfo)}`,
    method: 'GET',
    data: {
      ...queryInfo
    }
  })
}

export function updateMomentPublished(param: any) {
  return request({
    url: 'moment/update',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function deleteMomentById(id: string) {
  return request({
    url: `moment/delete/${id}`,
    method: 'DELETE'
  })
}
