import request from '@/utils/request'
import type {SysMenuOperationReq, SysMenuQueryReq, SysMenuResponse} from '@/api/system/menu/type'
import type {AxiosPromise} from 'axios'

const baseURL = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 增加 菜单
 * @param data 菜单增加参数
 */
export const saveSysMenu = (data: SysMenuOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/menu',
        method: 'post',
        headers: {
            isToken: true
        },
        data: data
    })
}

/**
 * 修改菜单
 * @param data 菜单修改参数
 */
export const updateSysMenu = (data: SysMenuOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: '/sys/menu',
        method: 'put',
        headers: {
            isToken: true
        },
        data: data
    })
}

/**
 * 根据id删除 菜单
 * @param ids 菜单删除参数（id数组）
 */
export const deleteSysMenuById = (ids: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/sys/menu',
        method: 'delete',
        headers: {},
        data: ids
    })
}


/**
 * 根据Id查询菜单
 * @param id 菜单id
 */
export const getSysMenuById = (id: string): AxiosPromise<SysMenuResponse> => {
    return request({
        baseURL,
        url: '/sys/menu/' + id,
        method: 'get',
        headers: {
            isToken: true
        }
    })
}

/**
 * 分页查询菜单
 * @param data 菜单查询条件
 */
export const getSysMenuTreeList = (data: SysMenuQueryReq): AxiosPromise<SysMenuResponse[]> => {
    return request({
        baseURL,
        url: '/sys/menu',
        method: 'get',
        headers: {
            isToken: true
        },
        params: data
    })
}
