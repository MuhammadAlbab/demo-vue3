<template>
  <button @click="clickHandler">{{ caption }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    caption: String,
  },
  setup(props, ctx) {
    const clickHandler = () => {
      ctx.emit("click-handler");
    };
    return {
      clickHandler,
    };
  },
};
</script>

<style></style>
