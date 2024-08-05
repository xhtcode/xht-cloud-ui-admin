import request from "@/utils/request"
import type {
    SysDictItemOperationReq,
    SysDictItemQueryReq,
    SysDictItemResponse,
    SysDictOperationReq,
    SysDictQueryReq,
    SysDictResponse
} from "@/api/system/dict/type"
import type {AxiosPromise, PageResponse} from "axios"

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 增加字典类型
 * @param data 字典类型增加参数
 */
export const saveSysDict = (data: SysDictOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/dict',
        method: 'post',
        headers: {
            isToken: true
        },
        data: data
    })
}

/**
 * 根据id删除字典类型
 * @param id 字典类型id数组
 */
export const deleteSysDictById = (id: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/dict',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: id
    })
}

/**
 * 修改字典类型
 * @param data 字典类型修改参数
 */
export const updateSysDict = (data: SysDictOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/dict',
        method: 'put',
        headers: {
            isToken: true
        },
        data: data
    })
}

/**
 * 根据Id查询字典类型
 * @param id 字典类型id
 */
export const getSysDictById = (id: string): AxiosPromise<SysDictResponse> => {
    return request({
        baseURL,
        url: '/sys/dict/' + id,
        method: 'get',
        headers: {
            isToken: true
        }
    })
}

/**
 * 分页查询字典类型
 * @param data 字典类型查询条件
 */
export const getSysDictPage = (data: SysDictQueryReq): AxiosPromise<PageResponse<SysDictResponse>> => {
    return request({
        baseURL,
        url: '/sys/dict',
        method: 'get',
        headers: {
            isToken: true
        },
        params: data
    })
}

/**
 * 根据字典类型编码查询字典
 *
 * @param code 字典类型编码
 */
export const getSysDictByCode = (code: string): AxiosPromise<SysDictResponse> => {
    return request({
        baseURL,
        url: `/sys/dict/code/${code}`,
        method: 'get',
        headers: {
            isToken: false
        }
    })
}

/**
 * 增加字典数据
 * @param data 字典数据增加参数
 */
export const saveSysDictItem = (data: SysDictItemOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/dict/item',
        method: 'post',
        headers: {
            isToken: true
        },
        data: data
    })
}

/**
 * 根据id删除字典数据
 * @param id 字典数据删除参数（id数组）
 */
export const deleteSysDictItemById = (id: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/dict/item',
        method: 'delete',
        headers: {
            isToken: true
        },
        data: id
    })
}

/**
 * 修改字典数据
 * @param data 字典数据修改参数
 */
export const updateSysDictItem = (data: SysDictItemOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/dict/item',
        method: 'put',
        headers: {
            isToken: true
        },
        data: data
    })
}

/**
 * 根据Id查询字典数据
 * @param id 字典数据数据id
 */
export const getSysDictItemById = (id: string): AxiosPromise<SysDictItemResponse> => {
    return request({
        baseURL,
        url: '/sys/dict/item/' + id,
        method: 'get',
        headers: {
            isToken: true
        }
    })
}

/**
 * 分页查询字典数据
 * @param data 字典数据查询条件
 */
export const getSysDictItemPage = (data: SysDictItemQueryReq): AxiosPromise<PageResponse<SysDictItemResponse>> => {
    return request({
        baseURL,
        url: '/sys/dict/item',
        method: 'get',
        headers: {
            isToken: true
        },
        params: data
    })
}
