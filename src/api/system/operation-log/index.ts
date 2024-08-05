import type {SysOperationLogQueryReq, SysOperationLogResponse} from "@/api/system/operation-log/type";
import type {AxiosPromise} from "axios";
import request from '@/utils/request'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX
/**
 * 分页查询操作日志
 * @param data 文件查询条件
 */
export const getSysOperationLogPage = (data: SysOperationLogQueryReq): AxiosPromise<SysOperationLogResponse[]> => {
    return request({
        baseURL,
        url: '/sys/operation/log',
        method: 'get',
        headers: {},
        params: data
    })
}
