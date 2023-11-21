// store/index.js

function check_if_begins_with(input, substring){
    var processed_data = input.toString();
    if(input[0] == substring){
        return true;
    }else{
        return false;
    }
}

function auth_logout(){
    console.log("auth_logout Function() called, logging out...")
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_userid");
    this.$router.push({ path: "/tabs/auth/loggedOut", replace: true });
}

import { createStore } from "vuex";
import axios from "axios";
import globaldata from '../modules/global';
export default createStore({
  state: {
    user_data: [],
  },
  getters: {
    getUserData: (state) => state.user_data,
  },
  actions: {
    async fetchUserData({ commit }) {
      try {
        const data = await axios.get(globaldata.api.hostname + "access/user/getData", { params:
                            {auth_id: localStorage.getItem("auth_userid"), auth_token: localStorage.getItem("auth_token")}});
        
        commit("SET_USERDATA", data.data.results);
      } catch (error) {
        if (error.response) {
            switch (error.response.status.toString()) {
                case "401":
                    //UNAUTHORIZED!!
                    auth_logout();
                    break;
                case "404":
                    //wtf??
                    break;
                case check_if_begins_with(error.response.status.toString(), "5"):
                    //SERVER ERROR!!
                    break;
                default:
                    //UNKNOWN ERROR!!
                    break;
            }
          }
        console.log(error);
      }
    },
    async setNewName({ commit }, name){
      commit("SET_NAME", name);
    }
  },
  mutations: {
    SET_USERDATA(state, user_data) {
      state.user_data = user_data;
    },
    SET_NAME(state, name) {
      state.user_data.name = name;
    },
  },
});