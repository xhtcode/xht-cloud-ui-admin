import {createApp} from 'vue'
import 'virtual:svg-icons-register';
import '@/styles/index.scss'
import '@/styles/dark/app.scss'
import "element-plus/theme-chalk/dark/css-vars.css";
import App from '@/App.vue'
import {setupStore} from "@/store";
import router from "@/router";
import {setupPermission} from '@/plugin/permission'
import i18n from '@/lang';
import {setupElIcons} from './plugin/icon';

const app = createApp(App)
setupPermission()
if (import.meta.env.VITE_USER_NODE_ENV === "development") {
    app.config.performance = false;
}
setupStore(app)
setupElIcons(app)
app.use(router).use(i18n).mount('#app')
