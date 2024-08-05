import type {FormRules} from "element-plus";
import type {SysUserOperationReq} from "@/api/system/user/type";
import type {ColumnOption} from "@/components/right-tool-bar/types";

/**
 * 增改页面 表单类型 默认值
 */
export const SysUserOperationForm: SysUserOperationReq = {
    sysUser: {
        id: '', // 用户ID
        deptId: '', // 部门id
        userAccount: '', // 用户账号
        userName: '', // 用户名称
        userAvatar: '', // 头像地址
        userType: '1', // 账号类型，0 系统管理员 1 用户 2 商家
        qqOpenid: '', // QQ互联openid
        wxOpenid: '', // 微信openid
        wxUnionid: '', // 微信unionid
        userStatus: '1', // 用户状态
        adminStatus: '0', // 是否超级管理员，0-不是，1-是
        registeredTime: null, // 注册时间
        lastLoginTime: null // 最后一次登录时间
    },
    profile: {
        id: '', // ID
        userId: '', // 用户ID
        realName: '', // 真实姓名
        gender: '', // 性别，
        idCardNumber: '', // 身份证号码
        phoneNumber: '', // 手机号码
        email: '', // 邮箱
        birthday: null, // 出生年月
        address: '', // 地址
        addressDetailed: '', // 详细地址
        description: '暂无' // 个人描述
    }
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysUserOperationPageInit: OperationPageInit = {
    title: '添加用户',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}

/**
 * 列表显示配置
 */
export const SysUserColumnOption: ColumnOption[] = [
    {value: 'userAccount', name: '用户账号', visible: true, disabled: true},
    {value: 'userName', name: '用户名称', visible: true, disabled: true},
    {value: 'userType', name: '账号类型', visible: true, disabled: true},
    {value: 'userStatus', name: '用户状态', visible: true, disabled: true},
    {value: 'adminStatus', name: '管理员', visible: false, disabled: false},
    {value: 'registeredTime', name: '注册时间', visible: false, disabled: false},
]


/**
 * 增改表单正则
 */
export const SysUserOperationRules: FormRules = {
    'sysUser.userName': [
        {required: true, message: '用户名称不能为空', trigger: ['blur', 'change']}
    ],
    'sysUser.deptId': [{required: true, message: '请选择部门', trigger: ['blur', 'change']}],
    'sysUser.userAvatar': [
        {required: true, message: '头像地址不能为空', trigger: ['blur', 'change']}
    ],
    'sysUser.userType': [
        {required: true, message: '账号类型不能为空', trigger: ['blur', 'change']}
    ],
    'profile.id': [{required: true, message: 'ID不能为空', trigger: ['blur', 'change']}],
    'profile.userId': [{required: true, message: '用户ID不能为空', trigger: ['blur', 'change']}],
    'profile.realName': [
        {required: true, message: '真实姓名不能为空', trigger: ['blur', 'change']}
    ],
    'profile.gender': [{required: true, message: '性别不能为空', trigger: ['blur', 'change']}],
    'profile.idCardNumber': [
        {required: true, message: '身份证号码不能为空', trigger: ['blur', 'change']},
        {
            pattern:
                /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号码格式有误！',
            trigger: ['blur', 'change']
        }
    ],
    'profile.phoneNumber': [
        {required: true, message: '手机号码不能为空', trigger: ['blur', 'change']},
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不对',
            trigger: ['blur', 'change']
        }
    ],
    'profile.email': [
        {required: true, message: '邮箱不能为空', trigger: ['blur', 'change']},
        {
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不对',
            trigger: ['blur', 'change']
        }
    ],
    'profile.birthday': [
        {required: true, message: '出生年月不能为空', trigger: ['blur', 'change']}
    ],
    'profile.address': [{required: true, message: '地址不能为空', trigger: ['blur', 'change']}],
    'profile.addressDetailed': [
        {required: true, message: '详细地址不能为空', trigger: ['blur', 'change']}
    ],
    'profile.description': [
        {required: true, message: '个人描述不能为空', trigger: ['blur', 'change']}
    ]
}
