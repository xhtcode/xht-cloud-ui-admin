import request from "@/utils/request";
import type {ShardingUploadInitRequest} from "@/api/minio/sharding/type";
import {AxiosProgressEvent, AxiosPromise} from "axios";

/**
 * 文件分片上传初始化
 */
export const shardingUploadInit = (data: ShardingUploadInitRequest): AxiosPromise<any> => {
    return request({
        url: '/oss/minio/file/sharding/init',
        method: 'post',
        headers: {},
        data: data
    })
}

/**
 * 文件分片上传
 */
export const shardingUploadFile = (data: FormData, listener: (e: AxiosProgressEvent) => void): AxiosPromise<any> => {
    return request({
        url: '/oss/minio/file/sharding/upload',
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data'
        },
        data: data,
        onUploadProgress: function (e) {
            listener(e)
        }
    })
}

/**
 * 文件分片上传合并
 */
export const shardingUploadMerge = (data: any) => {
    return request({
        url: '/oss/minio/file/sharding/merge',
        method: 'put',
        headers: {},
        data: data
    })
}
