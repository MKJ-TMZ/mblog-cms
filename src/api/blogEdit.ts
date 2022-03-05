export function getCategoryAndTag() {
  return {
    "categories": [
      {
        "id": 2,
        "name": "test1",
        "blogs": []
      },
      {
        "id": 1,
        "name": "tag",
        "blogs": []
      }
    ],
    "tags": [
      {
        "id": 2,
        "name": "tag1",
        "color": null,
        "blogs": []
      },
      {
        "id": 1,
        "name": "test",
        "color": "orange",
        "blogs": []
      }
    ]
  }
}

export function saveBlog(form: any) {
  console.log(form)
}

export function getBlogDataById(id: string) {
  return {
    "id": 3,
    "title": "123",
    "firstPicture": "https://w.wallhaven.cc/full/mp/wallhaven-mpdr29.jpg",
    "content": '- 1. 测试测试测试\n- 2. sadsad\n- 3. asdas',
    "description": "123",
    "published": true,
    "recommend": false,
    "appreciation": false,
    "commentEnabled": false,
    "top": false,
    "createTime": "2022-03-03T14:28:58.000+0000",
    "updateTime": "2022-03-03T14:28:58.000+0000",
    "viewCounts": 0,
    "wordCounts": 1,
    "readTime": 0,
    "password": "111111",
    "user": null,
    "category": {
      "id": 2,
      "name": "test1",
      "blogs": []
    },
    "tags": [
      {
        "id": 2,
        "name": "tag1",
        "color": null,
        "blogs": []
      }
    ]
  }
}