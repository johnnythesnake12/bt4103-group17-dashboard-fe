import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import router from './router';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles' // Ensure Vuetify styles are loaded
import '@mdi/font/css/materialdesignicons.css'; 
import 'funnel-graph-js/dist/css/main.min.css';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // Set MDI as default icon pack
    },
});
const app = createApp(App)
const pinia = createPinia()

app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')