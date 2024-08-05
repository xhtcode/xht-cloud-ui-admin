import request from '@/utils/request'
import type {
    RegisteredClientOperationReq,
    RegisteredClientQueryReq,
    RegisteredClientResponse
} from "@/api/system/client/type";
import type {AxiosPromise, PageResponse} from 'axios'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 增加oauth2 客户端信息
 * @param data oauth2 客户端信息增加参数
 */
export const saveOauth2RegisteredClient = (data: RegisteredClientOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/oauth2/registered/client',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 根据id删除oauth2 客户端信息
 * @param ids oauth2 客户端信息删除参数（id数组）
 */
export const deleteOauth2RegisteredClientById = (ids: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/oauth2/registered/client',
        method: 'delete',
        headers: {},
        data: ids
    })
}

/**
 * 修改oauth2 客户端信息
 * @param data oauth2 客户端信息修改参数
 */
export const updateOauth2RegisteredClient = (data: RegisteredClientOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/oauth2/registered/client',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 根据Id查询oauth2 客户端信息
 * @param id oauth2 客户端信息id
 */
export const getOauth2RegisteredClientById = (id: string): AxiosPromise<RegisteredClientResponse> => {
    return request({
        baseURL,
        url: `/oauth2/registered/client/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询oauth2 客户端信息
 * @param data oauth2 客户端信息数据查询条件
 */
export const getOauth2RegisteredClientPage = (data: RegisteredClientQueryReq): AxiosPromise<PageResponse<RegisteredClientResponse>> => {
    return request({
        baseURL,
        url: '/oauth2/registered/client',
        method: 'get',
        headers: {},
        params: data
    })
}
