/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(VueApexCharts)

registerPlugins(app)

app.mount('#app')
