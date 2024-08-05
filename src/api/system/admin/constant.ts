import type {FormRules} from "element-plus";
import type {SysAdminOperationReq} from "@/api/system/admin/type";
import type {ColumnOption} from "@/components/right-tool-bar/types";

/**
 * 增改页面 表单类型 默认值
 */
export const SysAdminOperationForm: SysAdminOperationReq = {
    id: null, // id
    userName: '',  // 用户账号
    userAvatar: '',  //  头像地址
    contactPhone: '',  //  手机号码
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysAdminOperationPageInit: OperationPageInit = {
    title: '添加管理员',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}

/**
 * 管理员信息
 */
export const SysAdminOperationRules: FormRules = {
    userName: [{required: true, message: '请输入管理员用户账号', trigger: ['blur', 'change']}],
    passWord: [{required: true, message: '请输入管理员密码', trigger: ['blur', 'change']}],
    userAvatar: [{required: true, message: '请选择管理员头像地址', trigger: ['blur', 'change']}],
    contactPhone: [
        {required: true, message: '请输入管理员手机号码', trigger: ['blur', 'change']},
        {
        pattern: /^1[3456789]\d{9}$/,
        message: '手机号码格式不对',
        trigger: ['blur', 'change']
        }
    ]
}


/**
 * 列表显示配置
 */
export const SysAdminColumnOption: ColumnOption[] = [
    {value: 'userName', name: '用户账号', visible: true, disabled: true},
    {value: 'userAvatar', name: '头像地址', visible: true, disabled: false},
    {value: 'contactPhone', name: '手机号码', visible: true, disabled: true},
    {value: 'createTime', name: '创建时间', visible: true, disabled: false},
]
