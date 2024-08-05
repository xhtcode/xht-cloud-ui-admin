import {_RouteLocationBase} from "vue-router";

declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        title?: string //菜单名称
        icon?: string //图标
        activeMenu?: string //菜单点击地址
        linkStatus?: boolean //是否外链
        breadCrumbStatus?: boolean //面包屑是否隐藏 true 隐藏
        hiddenStatus?: boolean //是否隐藏 true 隐藏
        fullStatus?: boolean //是否全屏（true）
        affixStatus?: boolean //tags固定
        keepAliveStatus?: boolean //是否缓存
        authStatus?: boolean // 是否跳过token校验 true调过
        backstage?: boolean // 标识此路由为后端返回路由
        rank?: number // 路由排序
        menuType?: MenuType // 菜单类型
        roles?: string[] //权限标识
        [index: string]: any
    }

    interface RouteLocationNormalizedLoaded extends _RouteLocationBase {
        children: RouteLocationNormalizedLoaded[]
    }
}

export {}
