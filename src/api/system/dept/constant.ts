import type {FormRules} from "element-plus";
import type {SysDeptOperationReq} from "@/api/system/dept/type";
import type {ColumnOption} from "@/components/right-tool-bar/types";

/**
 * 增改页面 表单类型 默认值
 */
export const SysDeptOperationForm: SysDeptOperationReq = {
    id: '', // id
    parentId: '', // 父id
    directorId: '', // 指定主管ID(用户id)
    deptName: '', // 部门名称
    deptCode: '', // 部门编码
    deptLeader: '', // 部门主管（主管）
    deptTel: '', // 联系电话
    deptSort: 1, // 排序
    deptStatus: 0, // 部门状态
    description: '暂无' // 部门描述
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysDeptOperationPageInit: OperationPageInit = {
    title: '添加部门',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}


/**
 * 列表显示配置
 */
export const SysDeptColumnOption: ColumnOption[] = [
    {value: 'deptName', name: '部门名称', visible: true, disabled: true},
    {value: 'deptCode', name: '部门编码', visible: true, disabled: true},
    {value: 'deptTel', name: '联系电话', visible: true, disabled: true},
    {value: 'deptLeader', name: '部门主管', visible: true, disabled: true},
    {value: 'deptSort', name: '部门排序', visible: false, disabled: false},
    {value: 'deptStatus', name: '部门状态', visible: false, disabled: false},
    {value: 'description', name: '部门描述', visible: false, disabled: false},
    {value: 'createTime', name: '创建时间', visible: false, disabled: false},
]


/**
 * 增改表单正则
 */
export const SysDeptOperationRules: FormRules = {
    parentId: [{required: true, message: '父id不能为空', trigger: ['blur', 'change']}],
    directorId: [
        {required: true, message: '指定主管ID(用户id)不能为空', trigger: ['blur', 'change']}
    ],
    deptName: [{required: true, message: '部门名称不能为空', trigger: ['blur', 'change']}],
    deptCode: [{required: true, message: '部门编码不能为空', trigger: ['blur', 'change']}],
    deptLeader: [{required: true, message: '部门主管不能为空', trigger: ['blur', 'change']}],
    deptTel: [{required: true, message: '联系电话不能为空', trigger: ['blur', 'change']}],
    deptSort: [{required: true, message: '排序不能为空', trigger: ['blur', 'change']}],
    deptStatus: [{required: true, message: '部门状态不能为空', trigger: ['blur', 'change']}]
}


export const DictDeptStatus: StaticDictType[] = [
    {label: '正常', value: 0, tagType: 'success'},
    {label: '锁定 ', value: 1, tagType: 'primary'},
    {label: '停用', value: 2, tagType: 'warning'},
    {label: '黑名单', value: 3, tagType: 'info'},
]
