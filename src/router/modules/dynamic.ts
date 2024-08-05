import {RouteRecordRaw} from "vue-router";

export const Layout = () => import("@/layout/routerView/index.vue");
/**
 * 工作台路由
 */
export const HomeDynamicRouter: RouteRecordRaw = {
    name: 'HomeViewComponentIndex',
    path: '/home',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
        title: '首页',
        activeMenu: '/',
        icon: 'ep-HomeFilled',
        affixStatus: true,
        keepAliveStatus: true,
        hiddenStatus: true
    }
}
/**
 * 定义静态路由（默认路由）
 * 前端添加路由，请在此处加
 */
const DynamicRouter: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'LayoutComponent',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '首页',
            activeMenu: '/',
            icon: 'ep-HomeFilled',
            hiddenStatus: false,
            breadCrumbStatus: true,
            keepAliveStatus: true,
            affixStatus: true
        },
        children: [
            HomeDynamicRouter
        ]
    },
    {
        path: '/user',
        name: 'UserComponentIndex',
        redirect: '/user/profile',
        component: Layout,
        meta: {
            title: '个人中心',
            hiddenStatus: true,
            breadcrumb: true,
            icon: 'user',
            keepAliveStatus: true
        },
        children: [
            {
                name: 'UserProfileViewIndex',
                path: '/user/profile',
                component: () => import('@/views/system/user/components/user-profile.vue'),
                meta: {
                    title: '个人中心',
                    activeMenu: '/',
                    hiddenStatus: true,
                    keepAliveStatus: true,
                    isAffix: false,
                    isIframe: false,
                    icon: 'user'
                }
            }
        ]
    }
]
export default DynamicRouter
