import type {RouteRecordRaw} from "vue-router";

/**
 * 静态路由
 */
const StaticRouter: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'LoginViewIndex',
        component: () => import('@/views/login/index.vue'),
        meta: {hiddenStatus: true, authStatus: true}
    },
    {
        path: '/file',
        name: 'FileViewIndex',
        component: () => import('@/views/minio/index.vue'),
        meta: {hiddenStatus: true, authStatus: true}
    },
    {
        path: '/websocket',
        name: 'WebSocketViewIndex',
        component: () => import('@/views/custom/websocket/index.vue'),
        meta: {breadCrumbStatus: true, hiddenStatus: true, authStatus: true}
    },
    {
        path: '/redirect/:path(.*)',
        name: 'RedirectViewIndex',
        component: () => import('@/views/other/redirect.vue'),
        meta: {breadCrumbStatus: true, hiddenStatus: true}
    },
    {
        path: '/:path(.*)*',
        name: '404ViewIndex',
        component: () => import('@/views/other/404.vue'),
        meta: {
            breadCrumbStatus: true,
            hiddenStatus: true,
            authStatus: true
        }
    }
]

export default StaticRouter
