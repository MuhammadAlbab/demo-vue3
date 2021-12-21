<template>
  <div>
    <input type="search" placeholder="Search post by title" v-model="search" />
  </div>
  <h1>Searched Post</h1>
  <div v-if="search !== ''">
    <div v-if="searchedResult.length === 0">
      <p>no result</p>
    </div>
    <div v-else>
      <div class="wrapper-items" v-for="post in searchedResult" :key="post.id">
        <div class="item">
          <p>{{ post.id }}.</p>
          <p>{{ post.title }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>no words in search field</p>
  </div>
  <h1>The First Five Post</h1>
  <div class="wrapper-items" v-for="post in theFirstFivePosts" :key="post.id">
    <div class="item">
      <p>{{ post.id }}.</p>
      <p>{{ post.title }}</p>
    </div>
  </div>
  <h1 class="hey">All Posts</h1>
  <div class="wrapper-items" v-for="post in posts" :key="post.id">
    <div class="item">
      <p>{{ post.id }}.</p>
      <p>{{ post.title }}</p>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Posts",
  setup() {
    const store = useStore();
    const posts = ref(store.getters.posts);
    const search = ref("");
    const searchedResult = computed(() => {
      return posts.value.filter((v) => v.title.includes(search.value));
    });
    const theFirstFivePosts = computed(() => {
      return posts.value.slice(0, 5);
    });

    onBeforeMount(async () => {
      await store.dispatch("fetchPosts");
      posts.value = store.getters.posts;
    });

    return {
      posts,
      search,
      searchedResult,
      theFirstFivePosts,
    };
  },
};
</script>

<style scoped>
.item {
  display: flex;
  justify-content: center;
}
</style>
