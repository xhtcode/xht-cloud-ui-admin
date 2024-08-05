/**
 * 用户查询类型
 */
export interface SysUserQueryReq extends CrudQueryFrom {
    userIds?: string[]
    deptId?: string // 部门id
    userType?: string // 账号类型
    userName?: string // 用户昵称
    userAccount?: string // 用户账号
    userStatus?: string // 用户状态
    isAdmin?: string // 是否超级管理员，0-不是，1-是
}

/**
 * 用户操作类型
 */
export interface SysUserOperationReq extends OperationReq {
    sysUser: SysUserResponse //用户信息
    profile: SysUserProfileResponse //用户扩展信息
}

/**
 * 用户返回值
 */
export interface SysUserResponse extends CrudOptions {
    id: string // 用户ID
    userName: string // 用户昵称
    deptId: string // 部门id
    userAccount: string // 用户账号
    userAvatar: string // 头像地址
    userType: string // 账号类型，0 系统管理员 1 用户 2 商家
    qqOpenid: string // QQ互联openid
    wxOpenid: string // 微信openid
    wxUnionid: string // 微信unionid
    userStatus: string // 用户状态
    adminStatus: string // 是否超级管理员，0-不是，1-是
    registeredTime: any // 注册时间
    lastLoginTime: any // 最后一次登录时间
    tagsType?: UI_TAG_TYPE
}

/**
 * 用户扩展信息返回值
 */
export interface SysUserProfileResponse extends CrudOptions {
    id: string // ID
    userId: string // 用户ID
    realName: string // 真实姓名
    gender: string // 性别，0：未知，1：男，2：女
    idCardNumber: string // 身份证号码
    phoneNumber: string // 手机号码
    email: string // 邮箱
    birthday: any // 出生年月
    address: string // 联系地址
    addressDetailed: string // 联系地址
    description: string // 个人描述
}
