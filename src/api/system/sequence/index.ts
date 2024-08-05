import request from '@/utils/request'
import type {SysSequenceOperationReq, SysSequenceQueryReq, SysSequenceResponse} from "@/api/system/sequence/type";
import type {AxiosPromise, PageResponse} from 'axios'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_SYSTEM_PREFIX

/**
 * 增加 序列
 * @param data 序列增加参数
 */
export const saveSysSequence = (data: SysSequenceOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: 'sys/sequence',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 根据id删除 序列
 * @param ids 序列删除参数（id数组）
 */
export const deleteSysSequenceById = (ids: string[]): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: 'sys/sequence',
        method: 'delete',
        headers: {},
        data: ids
    })
}

/**
 * 修改 序列
 * @param data 序列修改参数
 */
export const updateSysSequence = (data: SysSequenceOperationReq): AxiosPromise<string> => {
    return request({
        baseURL,
        url: 'sys/sequence',
        method: 'put',
        headers: {},
        data: data
    })
}

/**
 * 根据Id查询 序列
 * @param id 序列id
 */
export const getSysSequenceById = (id: string): AxiosPromise<SysSequenceResponse> => {
    return request({
        baseURL,
        url: `sys/sequence/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询 序列
 * @param data 序列数据查询条件
 */
export const getSysSequencePage = (data: SysSequenceQueryReq): AxiosPromise<PageResponse<SysSequenceResponse>> => {
    return request({
        baseURL,
        url: 'sys/sequence',
        method: 'get',
        headers: {},
        params: data
    })
}
/**
 *  序列生成
 * @param code 序列类型
 * 1001	UUID
 * 1002	SnowFlake
 * 1003	自定义序列
 * @param seqCode 序列编码
 * @param count 次数
 */
export const generateSysSequence = (seqCode: string, code: number = 1003, count: number = 10): AxiosPromise<string[]> => {
    return request({
        baseURL,
        url: '/sys/sequence/generate',
        method: 'post',
        headers: {},
        data: {
            seqCode,
            code,
            count
        }
    })
}

