import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PromiseDialog from 'vue3-promise-dialog'

const app = createApp(App)

app.use(router)
app.use(PromiseDialog)
// app.component('vue-confirm-dialog', VueConfirmDialog.default)
app.mount('#app')
// createApp(App).use(router).use(ModalDialogs).mount('#app')
