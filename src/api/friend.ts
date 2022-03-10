export function getFriendListData() {
  return {
    "total": 2,
    "list": [
      {
        "id": 1,
        "nickname": "MKJ",
        "description": "妹控集 - 一个有点脱离时代的死宅",
        "website": "https://mkj-tmz.github.io/",
        "avatar": "https://naccl.top/img/avatar.jpg",
        "published": true,
        "views": 2,
        "createTime": "2022-02-26T11:11:08.000+0000"
      },
      {
        "id": 2,
        "nickname": "test",
        "description": "test",
        "website": "https://mkj-tmz.github.io/",
        "avatar": "https://naccl.top/img/avatar.jpg",
        "published": true,
        "views": 1,
        "createTime": "2022-02-26T11:16:03.000+0000"
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

export function getFriendInfoData() {
  return {
    "content": "随机排序，不分先后。欢迎交换友链~(￣▽￣)~*\n\n* 昵称：Naccl\n* 一句话：游龙当归海，海不迎我自来也。\n* 网址：[https://naccl.top](https://naccl.top)\n* 头像URL：[https://naccl.top/img/avatar.jpg](https://naccl.top/img/avatar.jpg)\n\n仅凭个人喜好添加友链，请在收到我的回复邮件后再于贵站添加本站链接。原则上已添加的友链不会删除，如果你发现自己被移除了，恕不另行通知，只需和我一样做就好。\n\n",
    "commentEnabled": true
  }
}

export function saveFriendContent(content: string) {
  console.log(content)
}

export function saveFriendCommentState(isComment: boolean) {
  console.log(isComment)
}

export function updatePublished(id: string, publishedState: boolean) {
  console.log(id, publishedState)
}

export function deleteFriendById(id: string) {
  console.log(id)
}

export function saveFriend(param: any) {
  console.log(param)
}

