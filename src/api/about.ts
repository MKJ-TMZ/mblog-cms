import request from "@/utils/request";

export function getAboutDate() {
  return request({
    url: '/about',
    method: 'GET'
  })
}

export function saveAbout(param: any) {
  return request({
    url: '/about',
    method: 'POST',
    data: {
      ...param
    }
  })
}