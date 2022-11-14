import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(VueAxios, axios)
app.use(createPinia());
app.use(router);
app.use(PrimeVue);

// UI
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';


app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Password', Password);



app.mount("#app");
