import {defineStore} from "pinia"

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */
export const useRouterListStore =
    defineStore('router', {
        state: (): any => ({
            routerList: [],
            routerOldList: [],
        }),
        actions: {
            async setRouterList(data: any[]) {
                this.routerList = data
            },
            async setRouterOldList(routes: any[]) {
                this.routerOldList = routes
            }
        },
        getters: {
            hasRouter: (state) => state.routerList && state.routerList.length > 0
        }
    })
