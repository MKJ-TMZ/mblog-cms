import request from "@/utils/request";

export function login(loginForm: any) {
  return request({
    url: 'login',
    method: 'POST',
    data: {
      ...loginForm
    }
  })
}