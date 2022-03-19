import request from "@/utils/request";

export function login(loginForm: any) {
  return request({
    url: 'login',
    method: 'POST',
    data: {
      ...loginForm
    }
  })
  // return {
  //   "user": {
  //     "id": 1,
  //     "username": "Admin",
  //     "password": null,
  //     "nickname": "Admin",
  //     "avatar": "/img/avatar.jpg",
  //     "email": "admin@mtcode.top",
  //     "createTime": 1600678038000,
  //     "updateTime": 1600678042000,
  //     "role": "ROLE_admin"
  //   },
  //   "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImF1dGhvcml0aWVzIjoiUk9MRV9hZG1pbiwiLCJleHAiOjE2NDYzOTkyMzN9.gqxgsTncAJDt7PmggglAL79qK-5BEqQEHj7OgFWOtIKV3N-3yBPRJf3F5-BP1jq1x9px8dx9p-Itj0ajmxLc1g"
  // }
}