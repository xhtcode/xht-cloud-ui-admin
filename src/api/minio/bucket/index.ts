import request from "@/utils/request";
import {AxiosPromise} from "axios";

const baseURL: string = import.meta.env.VITE_APP_XHT_CLOUD_MINIO_PREFIX

export const ossMinioBucketList = (): AxiosPromise<any[]> => {
    return request({
        baseURL,
        url: '/oss/minio/bucket/list',
        method: 'get',
        headers: {}
    })
}
export const ossMinioBucketExists = (bucketName: string): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: `/oss/minio/bucket/exists/${bucketName}`,
        method: 'get',
        headers: {}
    })
}
export const ossMinioBucketCreate = (data: {
    bucketName: string
    region?: string
}): AxiosPromise<boolean> => {
    return request({
        baseURL,
        url: '/oss/minio/bucket/create',
        method: 'post',
        headers: {},
        data: data
    })
}
export const ossMinioBucketRemove = (bucketName: string) => {
    return request({
        baseURL,
        url: `/oss/minio/bucket/remove/${bucketName}`,
        method: 'delete',
        headers: {},
    })
}
