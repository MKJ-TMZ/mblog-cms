import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function getSiteInfo() {
  return {
    webTitleSuffix: "MTCode's Blog"
  }
}

export function getSiteSettingData() {
  return {
    "profilesSetting": [
      {
        "id": 14,
        "nameEn": "avatar",
        "nameZh": "图片路径",
        "value": "/img/avatar.jpg",
        "type": 3
      },
      {
        "id": 15,
        "nameEn": "name",
        "nameZh": "昵称",
        "value": "Naccl",
        "type": 3
      },
      {
        "id": 16,
        "nameEn": "rollText",
        "nameZh": "签名",
        "value": "一个有点脱离时代的死宅",
        "type": 3
      },
      {
        "id": 17,
        "nameEn": "github",
        "nameZh": "GitHub地址",
        "value": "https://github.com/Naccl",
        "type": 3
      },
      {
        "id": 18,
        "nameEn": "qq",
        "nameZh": "QQ链接",
        "value": "http://sighttp.qq.com/authd?IDKEY=",
        "type": 3
      },
      {
        "id": 19,
        "nameEn": "bilibili",
        "nameZh": "bilibili链接",
        "value": "https://space.bilibili.com/",
        "type": 3
      },
      {
        "id": 20,
        "nameEn": "netease",
        "nameZh": "网易云音乐",
        "value": "https://music.163.com/#/user/home?id=",
        "type": 3
      },
      {
        "id": 21,
        "nameEn": "email",
        "nameZh": "email",
        "value": "mailto:i@naccl.top",
        "type": 3
      },
      {
        "id": 22,
        "nameEn": "favorite",
        "nameZh": "自定义",
        "value": "{'title':'最喜欢的动漫 📺','content':'异度侵入、春物语、NO GAME NO LIFE、实力至上主义的教室、辉夜大小姐、青春猪头少年不会梦到兔女郎学姐、路人女主、Re0、魔禁、超炮、俺妹、在下坂本、散华礼弥、OVERLORD、慎勇、人渣的本愿、白色相簿2、死亡笔记、DARLING in the FRANXX、鬼灭之刃'}",
        "type": 3
      },
      {
        "id": 23,
        "nameEn": "favorite",
        "nameZh": "自定义",
        "value": "{'title':'最喜欢我的女孩子们 🤤','content':'芙兰达、土间埋、食蜂操祈、佐天泪爷、樱岛麻衣、桐崎千棘、02、亚丝娜、高坂桐乃、五更琉璃、安乐冈花火、一色彩羽、英梨梨、珈百璃、时崎狂三、可儿那由多、和泉纱雾、早坂爱'}",
        "type": 3
      },
      {
        "id": 24,
        "nameEn": "favorite",
        "nameZh": "自定义",
        "value": "{'title':'最喜欢玩的游戏 🎮','content':'Stellaris、巫师、GTA、荒野大镖客、刺客信条、魔兽争霸、LOL、PUBG'}",
        "type": 3
      }
    ],
    "footerSetting": [
      {
        "id": 7,
        "nameEn": "badge",
        "nameZh": "徽标",
        "value": {'title':'由 Spring Boot 强力驱动','url':'https://spring.io/projects/spring-boot/','subject':'Powered','value':'Spring Boot','color':'blue'},
        "type": 2
      },
      {
        "id": 8,
        "nameEn": "badge",
        "nameZh": "徽标",
        "value": {'title':'Vue.js 客户端渲染','url':'https://cn.vuejs.org/','subject':'SPA','value':'Vue.js','color':'brightgreen'},
        "type": 2
      },
      {
        "id": 9,
        "nameEn": "badge",
        "nameZh": "徽标",
        "value": {'title':'UI 框架 Semantic-UI','url':'https://semantic-ui.com/','subject':'UI','value':'Semantic-UI','color':'semantic-ui'},
        "type": 2
      },
      {
        "id": 10,
        "nameEn": "badge",
        "nameZh": "徽标",
        "value": {'title':'阿里云提供服务器及域名相关服务','url':'https://www.aliyun.com/','subject':'VPS & DNS','value':'Aliyun','color':'blueviolet'},
        "type": 2
      },
      {
        "id": 11,
        "nameEn": "badge",
        "nameZh": "徽标",
        "value": {'title':'jsDelivr 提供 CDN 加速服务','url':'https://www.jsdelivr.com/','subject':'CDN','value':'jsDelivr','color':'orange'},
        "type": 2
      },
      {
        "id": 12,
        "nameEn": "badge",
        "nameZh": "徽标",
        "value": {'title':'GitHub 提供图床','url':'https://github.com/','subject':'OSS','value':'GitHub','color':'github'},
        "type": 2
      },
      {
        "id": 13,
        "nameEn": "badge",
        "nameZh": "徽标",
        "value": {'title':'本站点采用 CC BY 4.0 国际许可协议进行许可','url':'https://creativecommons.org/licenses/by/4.0/','subject':'CC','value':'BY 4.0','color':'lightgray'},
        "type": 2
      }
    ],
    "baseSetting": [
      {
        "id": 1,
        "nameEn": "webTitleSuffix",
        "nameZh": "网页标题后缀",
        "value": " - Naccl's Blog",
        "type": 1
      },
      {
        "id": 2,
        "nameEn": "blogName",
        "nameZh": "博客名称",
        "value": "Naccl's Blog",
        "type": 1
      },
      {
        "id": 3,
        "nameEn": "footerImgTitle",
        "nameZh": "页脚图片标题",
        "value": "手机看本站",
        "type": 1
      },
      {
        "id": 4,
        "nameEn": "footerImgUrl",
        "nameZh": "页脚图片路径",
        "value": "/img/qr.png",
        "type": 1
      },
      {
        "id": 5,
        "nameEn": "copyright",
        "nameZh": "Copyright",
        "value": "{'title':'Copyright © 2019 - 2020','siteName':'NACCL'S BLOG'}",
        "type": 1
      },
      {
        "id": 6,
        "nameEn": "beian",
        "nameZh": "ICP备案号",
        "value": "",
        "type": 1
      },
      {
        "id": 25,
        "nameEn": "reward",
        "nameZh": "赞赏码路径",
        "value": "/img/reward.jpg",
        "type": 1
      },
      {
        "id": 26,
        "nameEn": "commentAdminFlag",
        "nameZh": "博主评论标识",
        "value": "咕咕",
        "type": 1
      }
    ]
  }
}

export function saveBaseSetting(param: any) {
  return request({
    url: 'setting/base',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function getBaseSettingData() {
  return request({
    url: 'setting/base',
    method: 'GET'
  })
}

export function saveProfileSetting(param: any) {
  return request({
    url: 'setting/profile',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function getProfileSettingData() {
  return request({
    url: 'setting/profile',
    method: 'GET'
  })
}

export function getProfileCustomPageData(queryInfo?: any) {
  return request({
    url: `setting/profile/custom/page?${qs.stringify(queryInfo)}`,
    method: 'GET'
  })
}

export function saveProfilesCustom(param: any) {
  return request({
    url: 'setting/profile/custom',
    method: 'POST',
    data: {
      ...param
    }
  })
}

export function deleteProfilesCustomById(id: string) {
  return request({
    url: `setting/profile/custom/${id}`,
    method: 'DELETE'
  })
}

export function saveProfilesSetting(param: any) {
  console.log(param)
  JSON.stringify(param)
}

export function saveFooterSetting(param: any) {
  console.log(param)
  JSON.stringify(param)
}

export function deleteBadge(id: string) {
  console.log(id)
}

export function deleteProfiles(id: string) {
  console.log(id)
}