import type {AxiosResponse as Response} from 'axios'

/**
 * 扩展 axios 数据返回类型，可自行扩展
 */
declare module 'axios' {

    /**
     * 扩展返回值
     */
    export interface AxiosResponse<T = any> extends Response<T> {
        success: boolean
        code: number
        data: T
        message: string
        type?: string

        [key: string]: any
    }

    /**
     * 分页参数
     */
    interface PageResponse<T> {
        current: number // 当前页
        size: number // 每页显示条数
        pages: number// 总页数
        total: number // 总条目数
        list: T[] // 结果集
    }
}

export {}
