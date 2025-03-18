import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles' // Ensure Vuetify styles are loaded
import '@mdi/font/css/materialdesignicons.css'; 

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // Set MDI as default icon pack
    },
});
const app = createApp(App)

app.use(vuetify)
app.mount('#app')