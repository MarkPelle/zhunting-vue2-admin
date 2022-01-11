import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import createPersistedState from "vuex-persistedstate";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const firebaseConfig = {
  apiKey: "AIzaSyD49m37OHcHw0Eo9tXwG43HHMr8LTCp3Rc",
  authDomain: "zhunting-30577.firebaseapp.com",
  projectId: "zhunting-30577",
  storageBucket: "zhunting-30577.appspot.com",
  messagingSenderId: "192483280313",
  appId: "1:192483280313:web:d19308d8c1b5cdccd6e268",
};
firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    disabled: true,
    token: "",
  },
  getters: {
    getFormState(state) {
      return state.disabled;
    },
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    setState(state) {
      state.disabled = !state.disabled;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  plugins: [createPersistedState()],
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
