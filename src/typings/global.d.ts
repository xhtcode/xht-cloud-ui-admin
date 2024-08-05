declare global {

    type LANG_TYPE = 'zh-cn' | 'en'
    /**
     * 网络状态 online：在线 offline：离线
     */
    type NETWORK_STATUS = 'online' | 'offline'

    /**
     * UI组件大小类型
     * 默认 default
     * 大 large
     * 小 small
     */
    type UI_SIZE_TYPE = 'default' | 'large' | 'small'


    /**
     * element-plus tag类型
     */
    type UI_TAG_TYPE = '' | 'success' | 'warning' | 'info' | 'danger' | any


    /**
     * 常用的key和value
     */
    interface CommonKeyValue<KEY, VALUE> {
        label: KEY
        value: VALUE
    }

    /**
     * 常用value
     */
    interface CommonObjValue<VALUE> {
        [index: string]: VALUE
    }

    /**
     * 令牌信息类型
     */
    interface TokenInfoType {
        access_token: string | null // 访问令牌
        refresh_token: string | null // 刷新令牌
        scope: string[] // 授权范围
        id_token: string | null//  oidc 令牌
        token_type: string | null // 访问令牌类型
        expires_in: number | null // 令牌过期时间
        additional_parameters: any // 额外的参数
    }

    type MenuType = 'C' | 'B' | 'M' // C菜单 F按钮 M目录

    /**
     * 静态字典类型
     */
    interface StaticDictType {
        label: string
        value: string | number
        disabled?: boolean
        tagType?: any // tag展示的类型
        color?: string // tag展示的类型
        [key: string]: any
    }


}
export {};
