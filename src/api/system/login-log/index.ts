import type { SysLoginLogQueryReq, SysLoginLogResponse } from "@/api/system/login-log/type";
import type { AxiosPromise } from "axios";
import request from '@/utils/request'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX
/**
 * 分页查询操作登录日志
 * @param data 查询条件
 */
export const getSysLoginLogPage = (data: SysLoginLogQueryReq): AxiosPromise<SysLoginLogResponse[]> => {
    return request({
        baseURL,
        url: '/sys/login/log',
        method: 'get',
        headers: {},
        params: data
    })
}
