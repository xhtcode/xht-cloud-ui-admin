import request, {httpRequest} from '@/utils/request'
import type {AxiosPromise, PageResponse} from 'axios'
import type {SysUserOperationReq, SysUserQueryReq, SysUserResponse} from "@/api/system/user/type";

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 增加用户
 * @param data 用户增加参数
 */
export const saveSysUser = (data: SysUserOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/user',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 根据id删除用户
 * @param ids 用户删除参数
 */
export const deleteSysUserById = (ids: any[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/user',
        method: 'delete',
        headers: {},
        data: ids
    })
}

/**
 * 修改用户
 * @param data 用户修改参数
 */
export const updateSysUser = (data: SysUserOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/user',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 根据Id查询用户
 * @param id 用户id
 */
export const getSysUserById = (id: string): AxiosPromise<SysUserResponse> => {
    return request({
        baseURL,
        url: `/sys/user/detail/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询用户
 * @param data 用户数据查询条件
 */
export const getSysUserPage = (data: SysUserQueryReq): AxiosPromise<PageResponse<SysUserResponse>> => {
    return request({
        baseURL,
        url: '/sys/user',
        method: 'get',
        headers: {},
        params: {...data, userIds: (data.userIds || []).join(',')}
    })
}

/**
 * 用户扩展信息修改
 *
 * @param data 用户扩展信息修改参数
 */
export const updateProfileInfo = (data: SysUserOperationReq): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/user/profile/update',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 修改密码
 * @param data 密码修改参数
 */
export const updatePassWord = (data: any): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/user/profile/update/password',
        method: 'put',
        headers: {},
        data: data
    })
}
/**
 * 密码重置
 * @param userId 用户id
 */
export const resetUserPassword = (userId: string): AxiosPromise<string> => {
    return httpRequest.upload('put', {
        baseURL,
        url: `/sys/user/reset/password/${userId}`,
        headers: {}
    })
}
