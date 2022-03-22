import request from "@/utils/request";

export function getTagPageData(queryInfo: any) {
  return {
    "total": 2,
    "list": [
      {
        "id": 2,
        "name": "tag1",
        "color": "blue",
        "blogs": []
      },
      {
        "id": 1,
        "name": "test",
        "color": "orange",
        "blogs": []
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
    "navigatepPageNums": [
      1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
  }
}

export function getTagListData() {
  return request({
    url: 'tag/list',
    method: 'GET'
  })
}

export function saveTag(param: any) {
  console.log(param)
}

export function deleteTagById(id: string) {
  console.log(id)
}
