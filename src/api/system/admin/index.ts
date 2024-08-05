import request from '@/utils/request'
import type {SysAdminOperationReq, SysAdminQueryReq, SysAdminResponse} from "@/api/system/admin/type";
import type {AxiosPromise} from 'axios'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX
/**
 * 增加部门
 * @param data 部门增加参数
 */
export const saveSysAdmin = (data: SysAdminOperationReq): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/admin',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 根据id删除部门
 * @param ids 部门删除参数（id数组）
 */
export const deleteSysAdminById = (ids: number[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/admin',
        method: 'delete',
        headers: {},
        data: ids
    })
}

/**
 * 修改部门
 * @param data 部门修改参数
 */
export const updateSysAdmin = (data: SysAdminOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/admin',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 根据Id查询部门
 * @param id 部门id
 */
export const getSysAdminById = (id: number): AxiosPromise<SysAdminResponse> => {
    return request({
        baseURL,
        url: `/sys/admin/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询部门
 * @param data 部门查询条件
 */
export const getSysAdminPage = (data: SysAdminQueryReq): AxiosPromise<SysAdminResponse[]> => {
    return request({
        baseURL,
        url: '/sys/admin',
        method: 'get',
        headers: {},
        params: data
    })
}
