import request from "@/utils/request";

export function getFriendPageData() {
  return request({
    url: 'friends/page',
    method: 'GET'
  })
}

export function getFriendInfoData() {
  return request({
    url: '/friends/info/detail',
    method: 'GET'
  })
}

export function saveFriendSave(param: any) {
  return request({
    url: '/friends/info/save',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function deleteFriendById(id: string) {
  return request({
    url: `friends/delete/${id}`,
    method: 'DELETE'
  })
}

export function saveFriend(param: any) {
  return request({
    url: '/friends/update',
    method: 'POST',
    data: {
      ...param
    }
  })
}

