import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuemeta from 'vue-meta'
createApp(App).use(router).mount('#app')
createApp(App).use(vuemeta) 
