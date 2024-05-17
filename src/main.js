import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useCounterStore } from "./store/user.store";

const pinia = createPinia();

const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

createApp(App).use(router).use(pinia).use(Toast, options).mount("#app");
