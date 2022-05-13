import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function upload(file: any) {
  return request({
    url: `upload/base64`,
    method: 'POST',
    data: {
      base64: file['miniurl'],
      name: file['_name']
    }
  })
}

export function getUploadUrl() {
  return 'http://localhost/admin/upload/file'
}