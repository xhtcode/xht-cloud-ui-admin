/**
 * 地区信息查询类型
 */
export interface SysAdminQueryReq extends CrudQueryFrom {
    userName?: string // 用户账号
    contactPhone?: string //  手机号码
}

/**
 * 地区信息操作类型
 */
export interface SysAdminOperationReq extends OperationReq {
    id: number | null // 主键
    userName: string // 用户账号
    userAvatar: string //  头像地址
    contactPhone: string //  手机号码
}

/**
 * 地区信息返回值
 */
export interface SysAdminResponse extends CrudOptions {
    id: number // 主键
    userName: string // 用户账号
    userAvatar: string //  头像地址
    contactPhone: string //  手机号码
}


