import type {SysDeptResponse} from "@/api/system/dept/type";

/**
 * 角色查询类型
 */
export interface SysRoleQueryReq extends CrudQueryFrom {
    id?: string // id
    roleName?: string // 角色名称
    roleCode?: string // 角色编码
    roleSort?: number // 显示顺序
    status?: string // 角色状态（0停用1正常）
    roleDesc?: string // 角色描述
}

/**
 * 角色操作类型
 */
export interface SysRoleOperationReq extends OperationReq {
    id: string // id
    roleName: string // 角色名称
    roleCode: string // 角色编码
    roleSort: number // 显示顺序
    dataScope: number // 数据权限
    deptIds?: string[] // 部门id
    status: string // 角色状态（0停用1正常）
    roleDesc: string // 角色描述
}

/**
 * 角色返回值
 */
export interface SysRoleResponse extends CrudOptions {
    id: string // id
    roleName: string // 角色名称
    roleCode: string // 角色编码
    roleSort: number // 显示顺序
    status: string // 角色状态（0停用1正常）
    roleDesc: string // 角色描述
    depts?: SysDeptResponse // 部门
}

