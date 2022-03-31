import request from "@/utils/request";

export function getAboutDate() {
  return request({
    url: '/about/detail',
    method: 'GET'
  })
}

export function saveAbout(param: any) {
  return request({
    url: '/about/save',
    method: 'POST',
    data: {
      ...param
    }
  })
}