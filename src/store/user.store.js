import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../config/axios";

export const useCounterStore = defineStore("useUserStore", () => {
  const token = ref(null);

  const register = async (username, email, password, repassword) => {
    try {
      await api.post("auth/register", {
        username,
        email,
        password,
        repassword,
      });
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("auth/login", {
        email,
        password,
      });
      token.value = res.data.token;
      // con localStorage
      // localStorage.setItem("user", true);

      // con session storage
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
    }
  };

  const logout = async () => {
    try {
      await api.get("auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      // con localstorage
      // localStorage.removeItem("user");

      // con sessionstorage
      sessionStorage.removeItem("user");
    }
  };

  const resetStore = () => {
    token.value = null;
  };

  const setTime = () => {
    setTimeout(() => {
      console.log("Se refresco");
      refreshToken();
    }, 900 * 1000 - 6000);
  };

  const refreshToken = async () => {
    try {
      console.log("Refrescando");
      const res = await api.get("auth/refreshToken");
      token.value = res.data.tokenGenerate;
      // con localstorage
      // localStorage.setItem("user", true);

      // con sessionstorage
      sessionStorage.setItem("user", true);
      setTime();
    } catch (error) {
      // con localstorage
      // localStorage.removeItem("user");

      // con sessionstorage
      sessionStorage.removeItem("user");
      console.log(error);
    }
  };

  return {
    token,
    register,
    login,
    refreshToken,
    logout,
  };
});
