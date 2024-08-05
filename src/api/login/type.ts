/**
 * 验证码返回类型
 */
export interface CaptchaResponseType {
    uuid: string
    img: string
    timeout: number
}

/**
 * 账号密码登录参数类型
 */
export interface LoginRequestType {
    username: string
    password: string
    code: string
    uuid: string
    timeout: number
}