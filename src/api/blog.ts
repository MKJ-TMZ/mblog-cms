import request from "@/utils/request";

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
  /*return {
    "total": 3,
    "blogList": [
      {
        "id": 3,
        "title": "123",
        "firstPicture": "https://w.wallhaven.cc/full/mp/wallhaven-mpdr29.jpg",
        "content": null,
        "description": null,
        "published": true,
        "recommend": false,
        "appreciation": false,
        "commentEnabled": false,
        "top": false,
        "createTime": "2022-03-03T14:28:58.000+0000",
        "updateTime": "2022-03-03T14:28:58.000+0000",
        "views": null,
        "words": null,
        "readTime": null,
        "password": "",
        "user": null,
        "category": {
          "id": 2,
          "name": "test1",
          "blogs": []
        },
        "tags": []
      },
      {
        "id": 2,
        "title": "Hello",
        "firstPicture": "https://w.wallhaven.cc/full/72/wallhaven-72rd8e.jpg",
        "content": null,
        "description": null,
        "published": true,
        "recommend": false,
        "appreciation": true,
        "commentEnabled": true,
        "top": false,
        "createTime": "2022-02-19T07:06:16.000+0000",
        "updateTime": "2022-02-19T07:06:16.000+0000",
        "views": null,
        "words": null,
        "readTime": null,
        "password": "",
        "user": null,
        "category": {
          "id": 1,
          "name": "tag",
          "blogs": []
        },
        "tags": []
      },
      {
        "id": 1,
        "title": "first blog",
        "firstPicture": "https://w.wallhaven.cc/full/pk/wallhaven-pkgkkp.png",
        "content": null,
        "description": null,
        "published": true,
        "recommend": true,
        "appreciation": true,
        "commentEnabled": true,
        "top": true,
        "createTime": "2022-02-04T11:40:12.000+0000",
        "updateTime": "2022-02-19T12:04:03.000+0000",
        "views": null,
        "words": null,
        "readTime": null,
        "password": "",
        "user": null,
        "category": {
          "id": 1,
          "name": "tag",
          "blogs": []
        },
        "tags": []
      }
    ],
    "pageNum": 1,
    "pageSize": 10,
    "size": 3,
    "startRow": 1,
    "endRow": 3,
    "pages": 1,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatePageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
  }*/
  return request({
    url: 'blog/page',
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
