import { useUserInfoStore } from "@/store/modules/user";
import { getRouters } from "@/api/permission";
import { useRouterListStore } from "@/store/modules/routesList";
import type { Router, RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import router from '@/router/index'
import DynamicRouter, { Layout } from "@/router/modules/dynamic";
import { cloneDeep, omit } from "lodash";


/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const layouModules: any = import.meta.glob('../layout/routerView/*.{vue,tsx}')
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}')
const dynamicViewsModules: Record<string, Function> = Object.assign(
    {},
    { ...layouModules },
    { ...viewsModules }
)

/**
 * 路由权限
 */
export const initRouter = async () => {
    const userInfoStore = useUserInfoStore()
    if (!userInfoStore.hasToken) return false
    await userInfoStore.getUserInfos().then(async () => {
        const storesRoutesList = useRouterListStore()
        // 获取路由菜单数据-
        const { data } = await getRouters()
        await storesRoutesList.setRouterOldList(DynamicRouter.concat(data))
        // 处理路由（component），替换 baseRoutes（@/router/route）第一个顶级 children 的路由
        const baseRouters: any[] = flatMultiLevelRoutes([...DynamicRouter, ...(filterAsyncRoutes(data))])
        await storesRoutesList.setRouterList(baseRouters)
        baseRouters.forEach((item: RouteRecordRaw) => {
            router.addRoute(item)
        })
    })
}


/**
 * 递归过滤有权限的动态路由
 *
 * @param arrRoutes 接口返回所有的动态路由
 * @returns 返回用户有权限的动态路由
 */
const filterAsyncRoutes = (arrRoutes: any[]) => {
    if (!arrRoutes || !arrRoutes.length) return [];
    return arrRoutes.map((tmpRoute) => {
        delete tmpRoute.id
        delete tmpRoute.parentId
        if (tmpRoute.meta.menuType === 'M') {
            tmpRoute.component = Layout
        } else {
            tmpRoute.component = dynamicViewsModules[`${tmpRoute.component}`];
        }
        tmpRoute.children && filterAsyncRoutes(tmpRoute.children)
        // 父级的redirect属性取值：如果子级存在且父级的redirect属性不存在，默认取第一个子级的path；如果子级存在且父级的redirect属性存在，取存在的redirect属性，会覆盖默认值
        if (tmpRoute?.children && tmpRoute.children.length && !tmpRoute.redirect) {
            tmpRoute.redirect = tmpRoute.children[0].path
        }
        return tmpRoute;
    });
};

/**
 * 路由降级（把三级及其以上的路由转化为二级路由）
 * @description 如果路由是三级及其以上路由，对其进行降级处理
 * @param routeModules 所有的路由
 */
const flatMultiLevelRoutes = (routeModules: RouteRecordRaw[]) => {
    const modules: RouteRecordRaw[] = cloneDeep(routeModules);
    modules.forEach((routeModule: RouteRecordRaw) => {
        isMultipleRoute(routeModule) && promoteRouteLevel(routeModule)
    })
    return modules;
}

/**
 * 判断路由层级是否大于 2
 * @description 只要有一个子路由的 children 长度大于 0，就说明是三级及其以上路由
 * @param route 路由信息
 */
const isMultipleRoute = (route: RouteRecordRaw) => {
    if (route.children && route.children.length) {
        return route.children.some((child: RouteRecordRaw) => child.children && child.children?.length)
    }
    return false
}

/**
 * 路由等级提升
 * @param parentRouter 所有的路由
 */
const promoteRouteLevel = (parentRouter: RouteRecordRaw) => {
    let router: Router | null = createRouter({
        history: createWebHashHistory(),
        routes: [parentRouter]
    })
    // 在 addToChildren 函数中使用上面获取到的路由信息来更新 route 的 children
    addToChildren(router.getRoutes(), parentRouter, parentRouter.children || [])
    router = null
    // 多级路由转化为二级路由后，去除所有子级路由中的 (子级路由children)
    parentRouter.children = parentRouter.children?.map((item) => omit(item, "children") as RouteRecordRaw)
}

/**
 * 将给定的子路由添加到指定的路由模块中
 * @param allRoutes 所有的router
 * @param parentRouter 上级路由
 * @param childrenRouter 上级路由的子路由
 */
const addToChildren = (allRoutes: RouteRecordNormalized[], parentRouter: RouteRecordRaw, childrenRouter: RouteRecordRaw[]) => {
    childrenRouter.forEach((child: RouteRecordRaw) => {
        const route: RouteRecordNormalized | undefined = allRoutes.find((item: RouteRecordNormalized) => item.name === child.name)
        if (route) {
            // 初始化 parentRouter 的 children
            parentRouter.children = parentRouter.children || []
            // 如果 parentRouter 的 children 属性中不包含该路由，则将其添加进去
            if (!parentRouter.children.includes(route)) {
                parentRouter.children.push(route)
            }
            // 如果该子路由还有自己的子路由，则递归调用此函数将它们也添加进去
            if (child.children && child.children?.length) {
                addToChildren(allRoutes, parentRouter, child.children)
            }
        }
    })
}
