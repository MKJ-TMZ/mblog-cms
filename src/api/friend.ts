import request from "@/utils/request";

export function getFriendPageData() {
  return request({
    url: 'friends/page',
    method: 'GET'
  })
}

export function getFriendInfoData() {
  return request({
    url: '/friends/info',
    method: 'GET'
  })
}

export function saveFriendInfo(param: any) {
  return request({
    url: '/friends/info',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function deleteFriendById(id: string) {
  return request({
    url: `friends/${id}`,
    method: 'DELETE'
  })
}

export function saveFriend(param: any) {
  return request({
    url: '/friends',
    method: 'POST',
    data: {
      ...param
    }
  })
}

