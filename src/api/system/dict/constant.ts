import type { FormRules } from "element-plus";
import type { SysDictItemOperationReq, SysDictOperationReq } from "@/api/system/dict/type";
import type { ColumnOption } from "@/components/right-tool-bar/types";

/**
 * 增改页面 表单类型 默认值
 */
export const SysDictOperationForm: SysDictOperationReq = {
    id: '',
    dictType: '', // 字典类型
    dictName: '', // 字典名称
    dictStatus: '', // 字典类型状态
    dictSort: 0, // 字典类型排序
    dictDesc: '' // 字典类型备注
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysDictOperationPageInit: OperationPageInit = {
    title: '添加字典项',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}


/**
 * 字典类型增改表单正则
 */
export const SysDictOperationRules: FormRules = {
    dictType: [{ required: true, message: '请输入字典类型', trigger: ['blur', 'change'] }],
    dictName: [{ required: true, message: '请输入字典类型名称', trigger: ['blur', 'change'] }],
    dictStatus: [{ required: true, message: '请选择字典类型状态', trigger: ['blur', 'change'] }],
    dictSort: [{ required: true, message: '请输入字典类型排序', trigger: ['blur', 'change'] }]
}

/**
 * 增改页面 表单类型 默认值
 */
export const SysDictItemOperationForm: SysDictItemOperationReq = {
    id: '',
    dictId: '', // 字典id
    dictType: '', // 字典类型
    dictCode: '', // 字典数据编码
    dictValue: '', // 字典数据值
    tagType: '', // tag展示的类型
    dictSort: 0, // 字典数据排序
    dictStatus: '1', // 字典数据状态
    dictDesc: '' // 字典数据备注
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysDictItemOperationPageInit: OperationPageInit = {
    title: '添加字典数据',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}

/**
 * 字典数据增改表单正则
 */
export const SysDictItemOperationRules: FormRules = {
    dictId: [{ required: true, message: '请选择字典类型', trigger: ['blur', 'change'] }],
    dictCode: [{ required: true, message: '请输入字典数据编码', trigger: ['blur', 'change'] }],
    dictValue: [{ required: true, message: '请输入字典数据值', trigger: ['blur', 'change'] }],
    tagType: [{ required: true, message: '请选择tag展示的类型', trigger: ['blur', 'change'] }],
    dictSort: [{ required: true, message: '请输入字典数据排序', trigger: ['blur', 'change'] }],
    dictStatus: [{ required: true, message: '请选择字典数据状态）', trigger: ['blur', 'change'] }],
    dictDesc: [{ required: true, message: '请输入字典数据备注', trigger: ['blur', 'change'] }]
}

/**
 * 列表显示配置
 */
export const SysDictColumnOption: ColumnOption[] = [
    { value: 'dictType', name: '类型编码', visible: true, disabled: true },
    { value: 'dictName', name: '类型名称', visible: true, disabled: true },
    { value: 'dictStatus', name: '类型状态', visible: true, disabled: true },
    { value: 'dictSort', name: '类型排序', visible: true, disabled: false },
    { value: 'dictDesc', name: '类型备注', visible: false, disabled: false },
    { value: 'createTime', name: '创建时间', visible: false, disabled: false },
]

/**
 * 列表显示配置
 */
export const SysDictItemColumnOption: ColumnOption[] = [
    { value: 'dictCode', name: '字典编码', visible: true, disabled: true },
    { value: 'dictValue', name: '字典数据', visible: true, disabled: true },
    { value: 'dictStatus', name: '字典状态', visible: true, disabled: true },
    { value: 'dictSort', name: '字典排序', visible: true, disabled: false },
    { value: 'dictDesc', name: '字典描述', visible: false, disabled: false },
    { value: 'createTime', name: '创建时间', visible: false, disabled: false },
]

/**
 * 字典状态
 */
export const StaticDictStatus: StaticDictType[] = [
    { label: '正常', value: '1', tagType: 'success' },
    { label: '禁用', value: '0', tagType: 'primary' }
]
