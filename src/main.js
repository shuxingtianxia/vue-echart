import Vue from "vue";
import App from "./App.vue";
import "lib-flexible";
import '@/assets/css/reset.css'
import '@/assets/css/index.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
