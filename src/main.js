import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import router from './router';

// make sure to also import the coresponding css
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure your
import { vuetify } from './vuetify';

createApp(App).use(vuetify).use(router).mount('#app')
