<template>
  <div id="app" :class="`bg-${backgroundColor}`">
    <h1
      class="text-center mb-4 text-3xl font-extrabold text-gray-300 dark:text-white md:text-5xl lg:text-6xl"
    >
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-sky-500"
        >Text App</span
      >
      for EVERYONE
    </h1>
    <TextForm />
  </div>
</template>

<script>
import TextForm from "./components/TextForm.vue";

export default {
  name: "App",
  components: {
    TextForm,
  },
  data() {
    return {
      backgroundColor: "gray-800", // Initial background color
    };
  },
};
</script>
