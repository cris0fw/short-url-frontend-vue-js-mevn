<script setup>
import { computed, onMounted, ref, watch } from "vue";
import CardLink from "../components/CardLink.vue";
import Navbar from "../components/Navbar.vue";
import { useLinkStore } from "../store/url.store.js";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const useLink = useLinkStore();
const pageNumber = ref(1);
const perPage = 6;

const linksOnPage = computed(() => {
  const startIndex = (pageNumber.value - 1) * perPage; // Corregido aquí
  const endIndex = startIndex + perPage;
  return useLink.links.slice(startIndex, endIndex);
});

watch(pageNumber, () => {
  const startIndex = (pageNumber.value - 1) * perPage; // Corregido aquí
  const endIndex = startIndex + perPage;
  linksOnPage.value = useLink.links.slice(startIndex, endIndex);
});

onMounted(() => {
  useLink.getLinks();
});
</script>

<template>
  <main class="w-[100%] h-[550px] bg-lila">
    <Navbar />

    <section class="flex flex-col items-center">
      <section class="container flex flex-wrap gap-2">
        <CardLink
          v-for="link of linksOnPage"
          :key="link?._id"
          :link="link"
        ></CardLink>
      </section>

      <v-pagination
        v-model="pageNumber"
        :pages="Math.ceil(useLink.links.length / perPage)"
        :range-size="1"
        active-color="#DCEDFF"
      />
    </section>
  </main>
</template>
