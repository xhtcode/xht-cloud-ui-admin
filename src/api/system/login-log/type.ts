/**
 * 登录日志查询类型
 */
export interface SysLoginLogQueryReq extends CrudQueryFrom {
    userAccount?: string // 用户账号
    loginStatusloginType?: string // 登录状态
    userType?: number // 用户类型
}


/**
 * 登录日志返回值
 */
export interface SysLoginLogResponse extends CrudOptions {
    id: string //主键
    userAccount: string // 用户账号
    userName: string // 用户名称
    userType: string // 用户类型
    loginType: string // 登录类型
    loginTime: string //登录时间
    loginIp: string //登录的IP地址
    loginAddress: string //登录的归属地
    userAgent: string //登录的浏览器
    loginStatus: string //登录状态
    loginDesc: string //登录描述
}
