import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function saveMoment(param: any) {
  return request({
    url: 'moment',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function getMomentDataById(id: string) {
  return request({
    url: `moment/${id}`,
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
    url: 'moment',
    method: 'PUT',
    data: {
      ...param
    }
  })
}

export function deleteMomentById(id: string) {
  return request({
    url: `moment/${id}`,
    method: 'DELETE'
  })
}
