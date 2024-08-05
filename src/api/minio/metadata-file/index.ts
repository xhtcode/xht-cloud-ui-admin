import request from '@/utils/request'
import type {SysMetadataFileQueryReq, SysMetadataFileResponse} from "@/api/minio/metadata-file/type";
import type {AxiosPromise} from 'axios'

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_MINIO_PREFIX


/**
 * 根据id删除文件
 * @param id 文件删除参数（id）
 */
export const deleteSysMetadataFileById = (id: number): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: `/sys/file/metadata/${id}`,
        method: 'delete',
        headers: {}
    })
}


/**
 * 根据Id查询文件
 * @param id 文件id
 */
export const getSysMetadataFileById = (id: string): AxiosPromise<SysMetadataFileResponse> => {
    return request({
        baseURL,
        url: `/sys/file/metadata/${id}`,
        method: 'get',
        headers: {}
    })
}

/**
 * 分页查询文件
 * @param data 文件查询条件
 */
export const getSysMetadataFilePage = (data: SysMetadataFileQueryReq): AxiosPromise<SysMetadataFileResponse[]> => {
    return request({
        baseURL,
        url: '/sys/file/metadata',
        method: 'get',
        headers: {},
        params: data
    })
}


/**
 * 根据Id查询文件
 * @param id 文件id
 */
export const viewSysMetadataFileById = (id: string): AxiosPromise<string> => {
    return request({
        baseURL,
        url: `/sys/file/metadata/view/${id}`,
        method: 'get',
        headers: {}
    })
}
