import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import HomeLink from "../pages/HomeLink.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import About from "../pages/About.vue";
import MyLinks from "../pages/MyLinks.vue";
import { useCounterStore } from "../store/user.store";
import Redirection from "../pages/Redirection.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/my-links",
    name: "Links",
    component: MyLinks,
    meta: {
      auth: true,
    },
  },
  {
    path: "/homeLink",
    name: "createLink",
    component: HomeLink,
    meta: {
      auth: true,
    },
  },
  {
    path: "/homeLink/:id",
    name: "UpdateLink",
    component: HomeLink,
    meta: {
      auth: true,
    },
  },
  {
    path: "/redirect/:nanoLink",
    name: "Redirect",
    component: Redirection,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useCounterStore();
  const requiredAuth = to.meta.auth;

  // CON LOCALSTORAGE
  //  si existe el tosken en memoria
  // if (userStore.token) {
  //  return next();
  // }
  // Si no existe el token
  // if (localStorage.getItem("user")) {
  // await userStore.refreshToken();

  // if (requiredAuth) {
  // if (userStore.token) {
  // validar el usuario o token
  //  return next();
  // }
  // return next("/login");
  //  } else {
  //  return next();
  // }
  // }

  //CON SESSIONSTORAGE

  // Si hay información de usuario en sessionStorage, refresca el token si es necesario
  if (sessionStorage.getItem("user")) {
    await userStore.refreshToken();
  }

  // Si se requiere autenticación y hay un token, continua la navegación
  if (requiredAuth && userStore.token) {
    return next();
  }

  // Si se requiere autenticación pero no hay token, redirige a la página de inicio de sesión
  if (requiredAuth) {
    return next("/login");
  }

  // En cualquier otro caso, continua la navegación
  next();
});

export default router;
