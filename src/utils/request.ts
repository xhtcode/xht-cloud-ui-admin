import type {
    AxiosError,
    AxiosInstance,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'
import qs from 'qs'
import { useMessage, useMessageBox } from '@/hooks/use-message'
import { CommonHeaderEnum } from '@/constants'
import { useUserInfoStore } from '@/store/modules/user'
import { i } from 'vite/dist/node/types.d-aGj9QkWt'

NProgress.configure({ showSpinner: false })

const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_APP_BASE_API_PREFIX,// 默认地址请求地址，可在 .env.** 文件中修改
    timeout: 50000,// 设置超时时间
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    withCredentials: true,// 跨域时候允许携带凭证
    paramsSerializer: {
        serialize: (params: any) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        }
    }
}

class HttpRequest {
    /**
     * 定义  axios 请求示例
     */
    service: AxiosInstance

    /**
     * 构造器  创建并配置一个 Axios 实例对象
     * @param axiosConfig
     */
    public constructor(axiosConfig: AxiosRequestConfig) {
        /**
         * 示例化axios
         */
        axios.defaults.params = { _t: new Date().getTime() }
        this.service = axios.create(axiosConfig)
        /**
         * Axios请求拦截器，对请求进行处理
         * 1. 序列化get请求参数
         * 2. 统一增加Authorization和TENANT-ID请求头
         * @param config AxiosRequestConfig对象，包含请求配置信息
         */
        this.service.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                NProgress.start() // 开启进度条
                const userInfoStore = useUserInfoStore()
                config.headers![CommonHeaderEnum.TRACE_ID] = ''
                config.headers![CommonHeaderEnum.USER_ID] = userInfoStore.userId
                config.headers![CommonHeaderEnum.USER_ACCOUNT] = userInfoStore.userAccount
                if (userInfoStore.hasToken && !config.headers.skipToken) {  // 是否需要设置 token
                    config.headers![CommonHeaderEnum.AUTHORIZATION] = `Bearer ${userInfoStore.token.access_token}`
                }
                return config
            },
            (error: AxiosError) => {
                console.error(error)
                return Promise.reject(error)  // 对请求错误进行处理
            }
        )

        /**
         * 响应拦截器处理函数
         * @param response 响应结果
         * @returns 如果响应成功，则返回响应的data属性；否则，抛出错误或者执行其他操作
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse<any>) => {
                NProgress.done() // 关闭进度条
                if (!response.data.success) {
                    const status = response.data.code || 200
                    if (status === 900000) { //  登陆失效
                        useMessageBox()
                            .confirm('登录已失效,请重新登录!')
                            .then(async () => {
                                useUserInfoStore().resetToken().then(() => {
                                    window.location.reload()
                                })
                            })
                        return Promise.reject(response.data)
                    }
                    useMessage().error(response.data.msg || '未知错误')
                    return Promise.reject(response.data)
                }
                return Promise.resolve(response.data)
            },
            (error: AxiosError<AxiosResponse>) => {
                NProgress.done() // 关闭进度条
                const { response, message } = error
                console.log(error)
                let errorMsg;
                if (message == "Network Error") {
                    errorMsg = "后端接口连接异常";
                } else if (message.includes("timeout")) {
                    errorMsg = "系统接口请求超时";
                } else if (message.includes("Request failed with status code")) {
                    errorMsg = "系统服务未知异常";
                }
                if (errorMsg) {
                    useMessage().notifyError(errorMsg)
                    return Promise.reject(response)
                }
                if (response?.data) {
                    useMessage().error(response.data.msg)
                    return Promise.reject(response.data)
                }
                return Promise.reject(response)
            }
        )
    }

    /**
     * @description 常用请求方法封装
     */
    public get<T>(url: string, params?: object, _object = {}): AxiosPromise<T> {
        return this.service.get(url, { params, ..._object });
    }

    public post<T>(url: string, params?: object | string, _object = {}): AxiosPromise<T> {
        return this.service.post(url, params, _object);
    }

    public put<T>(url: string, params?: object, _object = {}): AxiosPromise<T> {
        return this.service.put(url, params, _object);
    }

    public delete<T>(url: string, params?: any, _object = {}): AxiosPromise<T> {
        return this.service.delete(url, { params, ..._object });
    }

    public download(option: any): AxiosPromise<BlobPart> {
        return this.service({ responseType: 'blob', ...option });
    }

    public upload = async <T = any>(method: any | string, option: any) => {
        const res = await this.service({
            method: method,
            ...option,
            headers: {
                ...option.header,
                'Content-Type': 'multipart/form-data'
            }
        })
        return res as unknown as Promise<T>
    }
}

export const httpRequest = new HttpRequest(config)

/**
 * 导出 axios 实例
 */
export default httpRequest.service
