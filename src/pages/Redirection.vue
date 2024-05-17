<template>
  <section class="container h-screen flex justify-center items-center">
    <div
      class="w-[400px] bg-lila h-auto p-3 rounded-sm flex gap-2 flex-col items-center justify-center"
    >
      <h1 class="text-2xl text-white font-semibold text-center">
        Lo estamos Redirigiendo
      </h1>
      <VSpinner size="40" color="white" />
    </div>
  </section>
</template>

<script setup>
import "vue3-spinners/spinners.css";
import { VSpinner } from "vue3-spinners";
import { useRoute } from "vue-router";
import { useLinkStore } from "../store/url.store";
import { onMounted } from "vue";

const router = useRoute();
const id = router.params.nanoLink;
const linkStore = useLinkStore();

console.log(id);

const redirectPage = async (nanoLink) => {
  try {
    const res = await linkStore.singleLink(nanoLink);

    setTimeout(() => {
      window.location.href = res;
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  redirectPage(id);
});
</script>
