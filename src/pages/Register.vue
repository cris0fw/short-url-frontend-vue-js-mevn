<template>
  <main class="w-[100%] h-[550px] bg-lila flex justify-center items-center">
    <form
      @submit.prevent="handleSubmit"
      class="w-[400px] h-auto rounded-lg mt-14 py-5 px-5 bg-white flex flex-col justify-center gap-5"
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
            isValid: isValidUsername === true,
            inValid: isValidUsername === false,
          }"
          type="text"
          placeholder="username"
          name="username"
          v-model="username"
        />

        <i
          class="fa-solid fa-check absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isValidUsername"
        ></i>
        <i
          class="fa-solid fa-xmark absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isValidUsername === false"
        ></i>

        <p class="text-rojo_error mt-2" v-if="isValidUsername === false">
          El nombre de usuario es requerido
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
            isValid: isValidEmail === true,
            inValid: isValidEmail === false,
          }"
          type="email"
          placeholder="email"
          name="email"
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
          El campo email es requerido
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
            isValid: isStrongPassword === true,
            inValid: isStrongPassword === false,
          }"
          type="password"
          placeholder="password"
          name="password"
          v-model="password"
        />
        <i
          class="fa-solid fa-check absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isStrongPassword"
        ></i>
        <i
          class="fa-solid fa-xmark absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isStrongPassword === false"
        ></i>

        <p class="text-rojo_error mt-2" v-if="isValidEmail === false">
          La contraseña debe contener mayusculas, minisculas, numeros, @#$% y
          simbolos
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
            isValid: isPasswordConfirm === true,
            inValid: isPasswordConfirm === false,
          }"
          type="password"
          placeholder="Repassword"
          name="repassword"
          v-model="repassword"
        />
        <i
          class="fa-solid fa-check absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isPasswordConfirm"
        ></i>
        <i
          class="fa-solid fa-xmark absolute inset-y-0 right-0 mt-3 mr-3"
          v-if="isPasswordConfirm === false"
        ></i>

        <p class="text-rojo_error mt-2" v-if="isValidEmail === false">
          La contraseña no coincide con la contraseña que coloco anteriormente
        </p>
      </div>

      <button type="submit" class="bg-lila font-bold text-white py-2 px-2">
        Register
      </button>

      <RouterLink to="/login" class="text-azul_claro underline"
        >¿Ya tienes cuenta?</RouterLink
      >
    </form>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCounterStore } from "../store/user.store";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const userStore = useCounterStore();

const startValidation = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const repassword = ref("");

const isValidUsername = computed(() => {
  return startValidation.value ? /^\w{4,}$/.test(username.value) : null;
});

const isValidEmail = computed(() => {
  return startValidation.value
    ? /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.value)
    : null;
});

const isStrongPassword = computed(() => {
  return startValidation.value
    ? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
        password.value
      )
    : null;
});

const isPasswordConfirm = computed(() => {
  return startValidation.value ? password.value == repassword.value : null;
});

const handleSubmit = async () => {
  try {
    startValidation.value = true;

    await userStore.register(
      username.value,
      email.value,
      password.value,
      repassword.value
    );

    toast.success("Usuario registrado");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
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

<style>
.fa-xmark {
  color: red;
}
.fa-check {
  color: green;
}
</style>
