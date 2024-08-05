import type {SysDeptResponse} from "@/api/system/dept/type";

export type MenuType = 'C' | 'B' | 'M' // C菜单 F按钮 M目录
export type DefaultStatus = '0' | '1' | 0 | 1 // 0 不是 1 是

/**
 * MenuSelectTree.vue
 */
export interface MenuSelectTree {
    id?: string //菜单id
    menuId?: string //菜单id
    parentId?: string //菜单上级id
    menuName: string //菜单名称
    menuIcon: string | null //菜单图标
    menuType: MenuType //菜单类型
    menuPath: string //菜单类型
    menuSort: number //菜单排序
}

export interface IconItemOptions {
    itemType: string
    iconName: any
}

export interface DeptSelectTree {
    id?: string //部门id
    parentId?: string //菜部门级id
    deptName: string //部门名称
    deptLeader: string //部门主管（主管）
    deptTel: string //部门联系电话
    deptStatus: DefaultStatus //部门状态
}

export interface DeptSelectProps {
    modelValue: any | null //数据绑定
    accordion?: boolean //手风琴模式
    filterable?: boolean //是否支持搜索
    multiple?: boolean //是否支持多选·并且显示check-box
    rootMenu?: boolean //是否需要顶级部门 Dept
    clearable?: boolean //清空
    placeholder?: string //placeholder提示
    maxCollapseTags?: number
    cacheData?: SysDeptResponse[]
}
