<template>
  <div
    class="w-[400px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4"
  >
    <div class="md:flex">
      <div class="p-8">
        <div
          class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
        >
          Link Autogenerado
        </div>
        <a
          href="#"
          class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >/links/single-links/{{ link?.nanoLink }}</a
        >
        <p class="mt-2 text-gray-500">
          Con el acortador de link ahora puedes navegar mucho mas rapido y
          visitar su sitio web de forma mas rapida
        </p>
        <div class="mt-4 flex space-x-3">
          <router-link
            :to="`/redirect/${link?.nanoLink}`"
            class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Ir
          </router-link>
          <button
            @click="handleRedirect(link?.nanoLink)"
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Copiar
          </button>
          <router-link
            class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            :to="`/homeLink/${link?._id}`"
            >Actualizar</router-link
          >
          <button
            @click="deleteLink(link?.nanoLink)"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLinkStore } from "../store/url.store";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useToast } from "vue-toastification";

const useLink = useLinkStore();
const toast = useToast();

defineProps({
  link: Object,
});

const options = {
  title: "¿Quieres eliminar este elemento?",
  icon: "warning",
  showCancelButton: true,
  confimButtonText: "SI",
  cancelButtonText: "NO",
};

const deleteLink = async (_id) => {
  try {
    Swal.fire(options).then(async (result) => {
      if (result.isConfirmed) {
        await useLink.deleteLinks(_id);
      }

      Swal.fire("Se elimino!", "", "success");
    });
  } catch (error) {
    console.log(error);
  }
};

const handleRedirect = async (nanoLink) => {
  try {
    const res = await useLink.singleLink(nanoLink);
    await navigator.clipboard.writeText(res);
    toast.success("Se ha copiado el link");
  } catch (error) {
    console.log(error);
  }
};
</script>
