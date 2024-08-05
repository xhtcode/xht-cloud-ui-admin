export interface SysMenuQueryReq extends CrudQueryFrom {
    parentId?: string //上级菜单id
    menuName?: string //菜单名称
    menuPath?: string //路由地址
    menuStatus?: string //菜单状态
    notMenuType?: string[]
}

export interface SysMenuOperationReq extends OperationReq {
    parentId: string //上级菜单id
    menuIcon: string //菜单图标
    menuType: string //菜单类型
    menuName: string //菜单名称
    menuViewName?: string //组件名称
    menuViewPath?: string //组件路径
    menuPath?: string //路由地址
    menuRedirect?: string //重定向地址
    menuAuthority: string //权限标识
    menuSort: number //菜单排序
    menuStatus: string //菜单状态（1正常）
    menuHidden?: string //菜单状态（0隐藏 1显示
    menuActive?: string //高亮菜单
    menuLink?: string //是否外链
    menuAffix?: string //tabs固定（1是)
    menuCache?: string //路由缓存（1是）
}


export interface SysMenuResponse extends CrudOptions {
    parentId: string //菜单名称
    menuType: boolean //菜单类型
    menuName: string //菜单名称
    menuIcon: string //菜单图标
    menuViewPath: string //组件路径
    menuAuthority: string //权限标识
    menuStatus: string //状态
    hashChild: string //菜单是否存在下级
    menuPath?: string //路由地址
    menuSort: number //排序
    children?: SysMenuResponse[] //菜单子节点
}

export interface QueryStateType {
    pageInit: QueryPageInit<SysMenuResponse> //页面配置
    queryParams: SysMenuQueryReq  //页面查询
    tableList?: SysMenuResponse[] //选中数据
}
