import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueSecureHTML from 'vue-html-secure'
import { Quasar, Notify } from 'quasar'

// Import icon libraries
import '@quasar/extras/line-awesome/line-awesome.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
import './assets/css/style.css'
import router from './router'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const render = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

render.use(Quasar, {
  plugins: { Notify }, // import Quasar plugins and add here
})
render.use(router)
render.use(pinia)
render.use(VueSecureHTML)

// Assumes you have a <div id="app"></div> in your index.html
render.mount('#app')
