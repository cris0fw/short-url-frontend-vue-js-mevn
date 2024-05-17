<template>
  <header class="py-4">
    <nav class="container flex justify-between items-center">
      <div class="flex items-center gap-2">
        <img
          src="https://i.ibb.co/2Mg3QnX/icono-short-url.png"
          alt="icono de short url"
          class="w-10 cursor-pointer"
        />
        <h2 class="text-white font-bold text-2xl cursor-pointer">Short URL</h2>
      </div>

      <div class="flex text-white gap-7 items-center font-semibold">
        <RouterLink v-if="!userStore.token" to="/">Home</RouterLink>
        <RouterLink v-if="!userStore.token" to="/about">Sobre mi</RouterLink>
        <RouterLink v-if="!userStore.token" to="/login">Login</RouterLink>
        <RouterLink
          v-if="!userStore.token"
          to="/register"
          class="w-[150px] py-3 px-2 bg-celeste text-center"
          >Get Started Free</RouterLink
        >
        <RouterLink v-if="userStore.token" to="/homeLink">Home Link</RouterLink>
        <RouterLink v-if="userStore.token" to="/my-links">Mis links</RouterLink>
        <button v-if="userStore.token" @click="logout">Cerrar Sesion</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useCounterStore } from "../store/user.store";

const userStore = useCounterStore();
const router = useRouter();

const logout = async () => {
  await userStore.logout();
  router.push("/login");
};
</script>
