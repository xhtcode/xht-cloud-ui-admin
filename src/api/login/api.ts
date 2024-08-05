import request from '@/utils/request'
import { CaptchaResponseType, LoginRequestType } from './type'
import { AxiosPromise } from 'axios'

const baseAuthURL = import.meta.env.VITE_APP_XHT_CLOUD_AUTH_PREFIX
const basicAuth = 'Basic ' + window.btoa('xht:secret')
const baseSystemURL = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 获取验证码信息
 * @param key
 */
export const validateCode = (key?: string): AxiosPromise<CaptchaResponseType> => {
    return request({
        baseURL: baseAuthURL,
        url: '/code',
        method: 'get',
        headers: {
            skipToken: true
        },
        params: {
            key
        }
    })
}

/**
 * 登录
 */
export const loginInPassWord = (data: LoginRequestType): AxiosPromise<TokenInfoType> => {
    const encPassword = data.password
    // 密码加密
    const { username, uuid, code } = data
    return request({
        baseURL: baseAuthURL,
        url: '/oauth2/token',
        method: 'post',
        params: { userName: username, uuid, captcha: code, grant_type: 'password', scope: 'openid', userType: 0 },
        data: { passWord: encPassword },
        headers: {
            skipToken: true,
            Authorization: basicAuth,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
}

/**
 * 获取用户信息
 */
export const getUserInfo = (): AxiosPromise<any> => {
    return request({
        baseURL: baseSystemURL,
        url: '/sys/user/profile/info',
        method: 'get'
    })
}
