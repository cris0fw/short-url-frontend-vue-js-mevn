<script setup>
import { useCounterStore } from "../store/user.store";
import Navbar from "../components/Navbar.vue";
import { RouterLink } from "vue-router";

const userStore = useCounterStore();
</script>

<template>
  <main class="w-[100%] h-[550px] bg-lila">
    <Navbar />

    <section class="w-full h-full">
      <div class="w-full h-full flex flex-col items-center mt-20 gap-6">
        <h1 class="text-6xl text-white">Short Links that click</h1>
        <p class="text-lg w-[500px] text-center text-white">
          Turn all your links into real words that engage your audience. Create
          a free account to start linking.
        </p>

        <RouterLink
          to="/register"
          class="text-lg text-white bg-celeste py-4 px-2 w-[170px] text-center rounded-sm"
          >Get Started Free</RouterLink
        >
      </div>
    </section>
  </main>
</template>
