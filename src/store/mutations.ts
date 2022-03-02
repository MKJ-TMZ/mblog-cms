import {
  SAVE_NAV_STATE,
  SAVE_WEB_TITLE_SUFFIX
} from "@/store/mutations-types";

export default {
  [SAVE_WEB_TITLE_SUFFIX](state: any, webTitleSuffix: string) {
    state.webTitleSuffix = webTitleSuffix
  },
  [SAVE_NAV_STATE](state: any, activePath: string) {
  state.activePath = activePath
},
}