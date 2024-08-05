import request from '@/utils/request'
import type {SysAreaInfoOperationReq, SysAreaInfoQueryReq, SysAreaInfoResponse} from "@/api/system/area/type";
import type {AxiosPromise} from 'axios'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 增加地区信息
 * @param data 地区信息增加参数
 */
export const saveSysAreaInfo = (data: SysAreaInfoOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/area/info',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 根据id删除地区信息
 * @param ids 删除参数（id数组）
 */
export const deleteSysAreaInfoById = (ids: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/area/info',
        method: 'delete',
        headers: {},
        data: ids
    })
}

/**
 * 修改地区信息
 * @param data 地区信息修改参数
 */
export const updateSysAreaInfo = (data: SysAreaInfoOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/area/info',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 根据Id查询地区信息
 * @param id 地区信息id
 */
export const getSysAreaInfoById = (id: string): AxiosPromise<SysAreaInfoResponse> => {
    return request({
        baseURL,
        url: `/sys/area/info/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询地区信息
 * @param data 地区信息查询条件
 */
export const getSysAreaInfoList = (data: SysAreaInfoQueryReq): AxiosPromise<SysAreaInfoResponse[]> => {
    return request({
        baseURL,
        url: '/sys/area/info',
        method: 'get',
        headers: {},
        params: data
    })
}
/**
 * 获取静态地区变量
 */
export const getStaticSysAreaInfoList = (): AxiosPromise<SysAreaInfoResponse[]> => {
    return request({
        baseURL: '',
        url: 'area.json',
        method: 'get',
        headers: {}
    })
}

