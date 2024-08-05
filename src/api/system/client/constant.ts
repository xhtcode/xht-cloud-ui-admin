import type {FormRules} from "element-plus";
import type {RegisteredClientOperationReq} from "@/api/system/client/type";
import type {ColumnOption} from "@/components/right-tool-bar/types";

/**
 * 增改页面 表单类型 默认值
 */
export const RegisteredClientOperationForm: RegisteredClientOperationReq = {
    clientId: '', //客户端ID
    clientSecret: '', //客户端密钥
    clientSecretExpiresAt: '', //客户端过期时间
    autoApprove: '1', //是否自动放行
    clientName: '', //客户端名称
    authorizationGrantTypes: [], //授权模式
    redirectUris: '', //重定向地址
    scopes: [], //允许客户端请求的范围
    accessTokenValidity: 30 * 60 * 1000, //token有效期
    refreshTokenValidity: 30 * 60 * 1000 //刷新令牌有效期
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const RegisteredClientOperationPageInit: OperationPageInit = {
    title: '添加菜单',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}


/**
 * 列表显示配置
 */
export const RegisteredClientColumnOption: ColumnOption[] = [
    {value: 'clientId', name: '客户端ID', visible: true, disabled: true},
    {value: 'clientName', name: '客户端名称', visible: true, disabled: true},
    {value: 'clientSecret', name: '客户端密钥', visible: true, disabled: true},
    {value: 'authorizationGrantTypes', name: '授权模式', visible: true, disabled: true},
    {value: 'clientSecretExpiresAt', name: '客户端过期时间', visible: false, disabled: false},
    {value: 'autoApprove', name: '是否自动放行', visible: false, disabled: false},
    {value: 'redirectUris', name: '重定向地址', visible: false, disabled: false},
    {value: 'scopes', name: '允许客户端请求的范围', visible: false, disabled: false},
    {value: 'accessTokenValidity', name: 'token有效期', visible: false, disabled: false},
    {value: 'refreshTokenValidity', name: '刷新令牌有效期', visible: false, disabled: false},
]


/**
 * 增改表单正则
 */
export const RegisteredClientOperationRules: FormRules = {
    clientId: [{required: true, message: '客户端Id不能为空', trigger: ['blur', 'change']}],
    clientSecret: [{required: true, message: '客户端密钥不能为空', trigger: ['blur', 'change']}],
    autoApprove: [{required: true, message: '是否自动放行不能为空', trigger: ['blur', 'change']}],
    clientName: [{required: true, message: '客户端名称', trigger: ['blur', 'change']}],
    authorizationGrantTypes: [
        {required: true, message: '客户端可以使用的授权类型不能为空', trigger: ['blur', 'change']}
    ],
    redirectUris: [{required: true, message: '重定向地址不能为空', trigger: ['blur', 'change']}],
    scopes: [
        {required: true, message: '允许客户端请求的范围不能为空', trigger: ['blur', 'change']}
    ],
    accessTokenValidity: [
        {required: true, message: '令牌有效期不能为空', trigger: ['blur', 'change']}
    ],
    refreshTokenValidity: [
        {required: true, message: '刷新令牌有效期不能为空', trigger: ['blur', 'change']}
    ]
}

/**
 * 是否自动放行
 */
export const DictAutoApprove: StaticDictType[] = [
    {label: '是', value: '1', tagType: 'primary'},
    {label: '否', value: '0', tagType: 'danger'}
]
