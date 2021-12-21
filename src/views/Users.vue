<template>
  <div>
    <Button @click-handler="handleDeleteUsers" caption="Delete Users" />
  </div>
  <h1>Users</h1>
  <div class="wrapper-items" v-for="user in users" :key="user.id">
    <div class="item">
      <p>{{ user.id }}.</p>
      <p>{{ user.name }}</p>
    </div>
  </div>
</template>

<script>
import Button from "../components/button.vue";
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
export default {
  name: "Users",
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const users = ref(store.getters.users);

    onBeforeMount(async () => {
      await store.dispatch("fetchUsers");
      users.value = store.getters.users;
    });

    const handleDeleteUsers = async () => {
      await store.dispatch("removeUsers");
      users.value = store.getters.users;
    };

    return {
      users,
      handleDeleteUsers,
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
