export function saveMoment(form: any) {
  console.log(form)
}

export function getMomentDataById(id: string) {
  return {
    "id": 1,
    "content": "Hello World",
    "createTime": "2022-02-26T03:05:20.000+0000",
    "likes": 0,
    "published": true
  }
}

export function getMomentListData(queryInfo?: any) {
  return {
    "total": 2,
    "momentList": [
      {
        "id": 2,
        "content": "Hi![图片](https://w.wallhaven.cc/full/y8/wallhaven-y8vlyk.jpg)",
        "createTime": "2022-02-26T03:06:02.000+0000",
        "likes": 1,
        "published": true
      },
      {
        "id": 1,
        "content": "Hello World",
        "createTime": "2022-02-26T03:05:20.000+0000",
        "likes": 0,
        "published": true
      }
    ],
    "pageNum": 1,
    "pageSize": 10,
    "size": 2,
    "startRow": 1,
    "endRow": 2,
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
  }
}

export function updateMomentPublished(id: string, published: boolean) {
  console.log(id, published)
}

export function deleteMomentById(id: string) {
  console.log(id)
}
