import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function upload(file: any) {
  return request({
    url: `upload`,
    method: 'POST',
    data: qs.stringify({
      base64: file['miniurl'],
      name: file['_name']
    })
  })
}