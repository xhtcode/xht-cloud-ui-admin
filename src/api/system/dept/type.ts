/**
 * 部门查询类型
 */
export interface SysDeptQueryReq extends CrudQueryFrom {
    id?: string // id
    parentId?: string | any // 父id
    deptName?: string // 部门名称
    deptCode?: string // 部门编码
    deptStatus?: number // 部门状态
    deptIds?: string[]
}

/**
 * 部门操作类型
 */
export interface SysDeptOperationReq extends OperationReq {
    id: string // id
    parentId: string // 父id
    directorId: string // 指定主管ID(用户id)
    deptName: string // 部门名称
    deptCode: string // 部门编码
    deptLeader: string // 部门主管（主管）
    deptTel: string // 联系电话
    deptSort: number // 排序
    deptStatus: number // 部门状态
    description: string // 部门描述
}

/**
 * 部门返回值
 */
export interface SysDeptResponse extends CrudOptions {
    id: string // id
    parentId: string // 父id
    directorId: string // 指定主管ID(用户id)
    deptName: string // 部门名称
    deptCode: string // 部门编码
    deptLeader: string // 部门主管（主管）
    deptTel: string // 联系电话
    deptSort: number // 排序
    deptStatus: number // 部门状态
    hashChild: boolean
    description: string // 部门描述
}

