<template>
  <main class="w-[100%] h-[550px] bg-lila flex justify-center items-center">
    <form
      @submit.prevent="handleSubmit"
      class="w-[350px] h-auto rounded-lg py-5 px-5 bg-white flex flex-col justify-center gap-5"
    >
      <div class="relative">
        <input
          :class="{
            'px-5': true,
            'w-full': true,
            'h-10': true,
            'bg-[#F7F7F5]': true,
            'rounded-md': true,
            'focus:outline-none': true,
            'focus:border-blue-500': true,
            'focus:ring': true,
            'focus:ring-blue-200': true,
            'border-2': true,
            isValid: isValidEmail === true,
            inValid: isValidEmail === false,
          }"
          type="email"
          placeholder="email"
          v-model="email"
        />

        <i
          class="fa-solid fa-check absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isValidEmail"
        ></i>
        <i
          class="fa-solid fa-xmark absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isValidEmail === false"
        ></i>

        <p class="text-rojo_error mt-2" v-if="isValidEmail === false">
          Ingrese un email valido. No puede estar vacio
        </p>
      </div>

      <div class="relative">
        <input
          :class="{
            'px-5': true,
            'w-full': true,
            'h-10': true,
            'bg-[#F7F7F5]': true,
            'rounded-md': true,
            'focus:outline-none': true,
            'focus:border-blue-500': true,
            'focus:ring': true,
            'focus:ring-blue-200': true,
            'border-2': true,
            isValid: isValidPassword === true,
            inValid: isValidPassword === false,
          }"
          type="password"
          placeholder="password"
          v-model="password"
        />

        <i
          class="fa-solid fa-check absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isValidPassword"
        ></i>
        <i
          class="fa-solid fa-xmark absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isValidPassword === false"
        ></i>

        <p class="text-rojo_error mt-2" v-if="isValidPassword === false">
          El campo de la contraseña no puede estar vacio
        </p>
      </div>

      <button class="bg-lila font-bold text-white py-2 px-2">Login</button>

      <RouterLink to="/register" class="text-azul_claro underline"
        >¿No tienes cuenta registrate aqui?</RouterLink
      >
    </form>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import { useCounterStore } from "../store/user.store";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const userStore = useCounterStore();
const toast = useToast();
const router = useRouter();

const startValidation = ref(false);
const email = ref("");
const password = ref("");

const isValidPassword = computed(() => {
  return startValidation.value ? /^.*\S+.*$/.test(password.value) : null;
});

const isValidEmail = computed(() => {
  return startValidation.value
    ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
    : null;
});

const handleSubmit = async () => {
  try {
    startValidation.value = true;

    await userStore.login(email.value, password.value);
    toast.success("Datos completados");

    router.push("/homeLink");
  } catch (error) {
    if (Array.isArray(error)) {
      error.map((err) => {
        return toast.error(err.msg);
      });
    } else {
      toast.error(error.message);
    }
  }
};

const existToken = () => {
  if (userStore.token) {
    router.push("/homeLink");
  }
};

existToken();
</script>
