import type {FormRules} from "element-plus";
import type {SysRoleOperationReq} from "@/api/system/role/type";
import type {ColumnOption} from "@/components/right-tool-bar/types";

/**
 * 增改页面 表单类型 默认值
 */
export const SysRoleOperationForm: SysRoleOperationReq = {
    id: '', // id
    roleName: '', // 角色名称
    roleCode: '', // 角色编码
    roleSort: 1, // 显示顺序
    dataScope: 5,
    status: '1', // 角色状态（0停用1正常）
    roleDesc: '暂无' // 角色描述
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysRoleOperationPageInit: OperationPageInit = {
    title: '添加角色',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}

/**
 * 列表显示配置
 */
export const SysRoleColumnOption: ColumnOption[] = [
    {value: 'roleName', name: '角色名称', visible: true, disabled: true},
    {value: 'roleCode', name: '角色编码', visible: true, disabled: true},
    {value: 'dataScope', name: '数据权限', visible: true, disabled: true},
    {value: 'status', name: '角色状态', visible: true, disabled: true},
    {value: 'roleSort', name: '角色排序', visible: false, disabled: false},
    {value: 'roleDesc', name: '角色描述', visible: false, disabled: false},
    {value: 'createTime', name: '创建时间', visible: false, disabled: false},
]


/**
 * 增改表单正则
 */
export const SysRoleOperationRules: FormRules = {
    roleName: [{required: true, message: '角色名称不能为空', trigger: ['blur', 'change']}],
    roleCode: [{required: true, message: '角色编码不能为空', trigger: ['blur', 'change']}],
    dataScope: [{required: true, message: '数据权限不能为空', trigger: ['blur', 'change']}],
    roleSort: [{required: true, message: '显示顺序不能为空', trigger: ['blur', 'change']}],
    status: [{required: true, message: '角色状态不能为空', trigger: ['blur', 'change']}],
    deptIds: [{required: true, message: '请选择自定义部门数据', trigger: ['blur', 'change']}]
}

/**
 * 角色状态
 */
export const DictRoleStatus: StaticDictType[] = [
    {label: '启用', value: '1', tagType: 'success'},
    {label: '禁用', value: '0', tagType: 'primary'}
]
