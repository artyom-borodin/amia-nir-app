import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import ru from 'element-plus/es/locale/lang/ru.mjs'
import 'element-plus/dist/index.css'
import './styles/index.css'
import App from './App.vue'
import router from './router/index.js'
import { useAuthStore } from './stores/auth.js'
import { APP_LOCALE } from './constants/config.js'

const locales = { [APP_LOCALE]: ru }

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: locales[APP_LOCALE] })

const auth = useAuthStore()
auth.init()

app.mount('#app')
