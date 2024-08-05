import router from "@/router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {useUserInfoStore} from "@/store/modules/user";
import {useRouterListStore} from "@/store/modules/routesList";
import {initRouter} from "@/plugin/dynamic-router";
import type {RouteLocationNormalized} from "vue-router";
import {useTitle} from "@/hooks/use-title";

const {setTitle} = useTitle()
/**
 * 进度条配置
 */
NProgress.configure({showSpinner: false})

export function setupPermission() {
    // 白名单路由

    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        const userInfoStore = useUserInfoStore();
        if (to.meta.authStatus && !['404ViewIndex'].includes(to.name as string)) {
            next()
            NProgress.done()
        } else {
            if (!userInfoStore.hasToken) {
                next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
                userInfoStore.resetToken().then()
                NProgress.done()
            } else if (to.path === '/login') {
                next('/home')
                NProgress.done()
            } else {
                const routerListStore = useRouterListStore();
                if (routerListStore.hasRouter) {
                    // 未匹配到任何路由，跳转404
                    if (to.matched.length === 0) {
                        from.name ? next({name: from.name}) : next("/404");
                    } else {
                        next();
                    }
                } else {
                    await initRouter()
                    next({path: to.path, query: to.query, replace: true})
                }
            }
        }
    });

    router.afterEach((to: RouteLocationNormalized) => {
        setTitle(to.meta.title)
        NProgress.done();
    });
}
