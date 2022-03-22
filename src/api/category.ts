import request from "@/utils/request";

export function getCategoryPageData(queryInfo: any) {
  return {
    "total": 2,
    "list": [
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

export function getCategoryListData() {
  return request({
    url: 'category/list',
    method: 'GET'
  })
}

export function saveCategory(param: any) {
  console.log(param)
}

export function deleteCategoryById(id: string) {
  console.log(id)
}