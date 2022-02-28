import { createStore } from 'vuex'
import state from "@/store/state";
import mutations from "@/store/mutations";

const store = createStore({
  state,
  mutations,
  actions: {},
  modules: {}
})

export default store