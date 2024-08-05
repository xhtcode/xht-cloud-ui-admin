/**
 * pinia持久化参数配置
 */
import {PersistedStateOptions} from 'pinia-plugin-persistedstate'

/**
 * @param key  缓存key的名称
 * @param paths 指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
 */
const pInIaPersistConfig = (key: string, paths?: string[]) => {
    const persist: PersistedStateOptions = {
        key: `xht_${key}`,
        storage: window.localStorage,
        //storage: window.sessionStorage,
        debug: false,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: paths || undefined
    }
    return persist
}

export default pInIaPersistConfig
