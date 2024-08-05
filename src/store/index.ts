import {App} from 'vue'
import {createPinia, Pinia} from 'pinia'
import piniaPlugin from 'pinia-plugin-persistedstate'

const store: Pinia = createPinia()
store.use(piniaPlugin)

const setupStore = (app: App<Element>) => {
    store.use(({store}) => {
        const initialState = JSON.parse(JSON.stringify(store.$state))
        store.$reset = () => {
            store.$state = JSON.parse(JSON.stringify(initialState))
        }
    })
    app.use(store)
}
export {store, setupStore}
