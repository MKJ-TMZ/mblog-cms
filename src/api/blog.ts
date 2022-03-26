import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function saveBlog(param: any) {
  return request({
    url: 'blog/save',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function getBlogDataById(id: string) {
  return {
    "id": '1506228558979260419',
    "title": "123",
    "coverPic": "https://w.wallhaven.cc/full/mp/wallhaven-mpdr29.jpg",
    "content": '- 1. 测试测试测试\n- 2. sadsad\n- 3. asdas',
    "description": "123",
    "isPublished": true,
    "isRecommend": false,
    "isAppreciation": false,
    "isCommentEnabled": false,
    "isTop": false,
    "createTime": "2022-03-03T14:28:58.000+0000",
    "updateTime": "2022-03-03T14:28:58.000+0000",
    "viewCounts": 0,
    "wordCounts": 1,
    "readTime": 0,
    "password": "111111",
    "user": null,
    "category": "test1",
    "tagList": ["tag1"]
  }
}

export function getBlogListData(queryInfo?: any) {
  return request({
    url: `blog/page?${qs.stringify(queryInfo)}`,
    method: 'GET',
    data: {
      ...queryInfo
    }
  })
}

export function updateBlogTop(id: string, top: boolean) {
  console.log(id, top)
}

export function updateBlogRecommend(id: string, recommend: boolean) {
  console.log(id, recommend)
}

export function deleteBlogById(id: string) {
  console.log(id)
}
