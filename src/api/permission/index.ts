import request from '@/utils/request'


const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 后端控制路由，
 */
export const getRouters = () => {
    return request({
        baseURL: baseURL,
        url: '/sys/user/profile/getRouters',
        method: 'get'
    })
}
