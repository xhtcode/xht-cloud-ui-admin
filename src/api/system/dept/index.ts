import request from '@/utils/request'
import type {SysDeptOperationReq, SysDeptQueryReq, SysDeptResponse} from "@/api/system/dept/type";
import type {AxiosPromise} from 'axios'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX
/**
 * 增加部门
 * @param data 部门增加参数
 */
export const saveSysDept = (data: SysDeptOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/dept',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 根据id删除部门
 * @param ids 部门删除参数（id数组）
 */
export const deleteSysDeptById = (ids: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/dept',
        method: 'delete',
        headers: {},
        data: ids
    })
}

/**
 * 修改部门
 * @param data 部门修改参数
 */
export const updateSysDept = (data: SysDeptOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/dept',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 根据Id查询部门
 * @param id 部门id
 */
export const getSysDeptById = (id: string): AxiosPromise<SysDeptResponse> => {
    return request({
        baseURL,
        url: `/sys/dept/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询部门
 * @param data 部门查询条件
 */
export const getSysDeptTree = (data: SysDeptQueryReq): AxiosPromise<SysDeptResponse[]> => {
    return request({
        baseURL,
        url: '/sys/dept',
        method: 'get',
        headers: {},
        params: data
    })
}
