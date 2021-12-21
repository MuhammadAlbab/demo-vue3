import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
    users: [],
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = payload;
    },
    SET_USERS(state, payload) {
      state.users = payload;
    },
    REMOVE_USERS(state) {
      state.users = [];
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await fetch(`${process.env.VUE_APP_BASE_URL}/posts`);
        const getData = await response.json();
        commit("SET_POSTS", getData);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await fetch(`${process.env.VUE_APP_BASE_URL}/users`);
        const getData = await response.json();
        commit("SET_USERS", getData);
      } catch (error) {
        console.log(error);
      }
    },
    removeUsers({ commit }) {
      commit("REMOVE_USERS");
    },
  },
  getters: {
    posts: (state) => state.posts,
    users: (state) => state.users,
  },
});
