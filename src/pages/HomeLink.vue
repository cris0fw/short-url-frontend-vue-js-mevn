<template>
  <main class="w-[100%] h-[550px] bg-lila">
    <Navbar />

    <section class="container">
      <h1 class="text-xl font-semibold text-white mt-7">
        {{ isEditable ? "Actualiza tu link" : "Crea tus links ahora" }}
      </h1>

      <form
        class="h-[200px] flex justify-center items-center"
        @submit.prevent="handleCreateLink"
      >
        <input
          className="w-[50%] outline-none p-3 my-2 rounded-sm bg-gray-200 text-blacks"
          type="text"
          name="longLink"
          placeholder="Ingrese su url"
          v-model="inputLink"
        />
        <button
          type="submit"
          class="bg-[#7C78B3] py-3 px-2 w-[130px] text-center font-semibold text-gray-200"
        >
          {{ isEditable ? "Actualizar" : " Crear" }}
        </button>
      </form>

      <div
        v-if="generateLink"
        class="w-[400px] h-auto p-4 flex justify-between bg-white mx-auto rounded-sm"
      >
        <div class="flex">
          <h1 class="font-semibold text-lila me-2">Url generada:</h1>
          <p>/links/single-links/{{ generateLink?.nanoLink }}</p>
        </div>
        <button>
          <i class="fa-solid fa-copy"></i>
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { useLinkStore } from "../store/url.store";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";

const linkStore = useLinkStore();
const toast = useToast();
const inputLink = ref(null);
const isEditable = ref(false);
const generateLink = ref(null);
const router = useRoute();

onMounted(() => {
  if (router.params.id) {
    isEditable.value = true;
  }
});

const handleCreateLink = async () => {
  try {
    if (isEditable.value) {
      const newLink = {
        id: router.params.id,
        longLink: inputLink.value,
      };

      await linkStore.updateLinks(newLink);

      toast.success("Actualizado correctamente");
    } else {
      const res = await linkStore.createLink(inputLink.value);

      generateLink.value = res;
      toast.success("Se ha creado un nuevo link");

      setTimeout(() => {
        setTimeFade();
      }, 10000);
    }
  } catch (error) {
    console.log(error);
  }
};

const setTimeFade = () => {
  generateLink.value = null;
};
</script>
