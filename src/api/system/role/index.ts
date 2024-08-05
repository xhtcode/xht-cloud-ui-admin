import request from '@/utils/request'
import type {SysRoleOperationReq, SysRoleQueryReq, SysRoleResponse} from "@/api/system/role/type";
import type {AxiosPromise, PageResponse} from 'axios'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX
/**
 * 增加角色
 * @param  data  角色增加参数
 */
export const saveSysRole = (data: SysRoleOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/role',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 根据id删除角色
 * @param ids 角色删除参数（id数组）
 */
export const deleteSysRoleById = (ids: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/role',
        method: 'delete',
        headers: {},
        data: ids
    })
}

/**
 * 修改角色
 * @param data 角色修改参数
 */
export const updateSysRole = (data: SysRoleOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/role',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 根据Id查询角色
 * @param id 角色id
 */
export const getSysRoleById = (id: string): AxiosPromise<string> => {
    return request({
        baseURL,
        url: `/sys/role/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询角色
 * @param data 角色数据查询条件
 */
export const getSysRolePage = (data: SysRoleQueryReq): AxiosPromise<PageResponse<SysRoleResponse>> => {
    return request({
        baseURL,
        url: '/sys/role',
        method: 'get',
        headers: {},
        params: data
    })
}
/**
 * 查询全部角色
 * @param data 角色查询条件
 */
export const getSysRoleList = (data: SysRoleQueryReq): AxiosPromise<SysRoleResponse[]> => {
    return request({
        baseURL,
        url: '/sys/role/list/',
        method: 'get',
        headers: {},
        params: data
    })
}

