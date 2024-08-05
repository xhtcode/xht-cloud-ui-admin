import type {FormRules} from "element-plus";
import type {SysSequenceOperationReq} from "@/api/system/sequence/type";
import type {ColumnOption} from "@/components/right-tool-bar/types";

/**
 * 增改页面 表单类型 默认值
 */
export const SysSequenceOperationForm: SysSequenceOperationReq = {
    seqCode: '', // 序列编码
    seqName: '', // 序列名称
    currentValue: 1, // 序列当前值
    stepValue: 1, // 序列步进值
    maxValue: 999999, // 序列最大值
    minValue: 1, // 序列最小值
    seqLoop: '0', // 序列是否重置  0不循环更新1循环更新
    resetFlag: '0', // 序列重置周期 0 不重置 D每天 M月 Y年
    seqFormat: '', // 序列格式
    seqDesc: '' // 序列描述
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysSequenceOperationPageInit: OperationPageInit = {
    title: '添加序列',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}


/**
 * 列表显示配置
 */
export const SysSequenceColumnOption: ColumnOption[] = [
    {value: 'seqCode', name: '序列编码', visible: true, disabled: true},
    {value: 'seqName', name: '序列名称', visible: true, disabled: true},
    {value: 'currentValue', name: '当前值', visible: true, disabled: true},
    {value: 'stepValue', name: '步进值', visible: true, disabled: true},
    {value: 'minValue', name: '最小值', visible: false, disabled: false},
    {value: 'maxValue', name: '最大值', visible: false, disabled: false},
    {value: 'seqLoop', name: '循环', visible: false, disabled: false},
    {value: 'resetFlag', name: '重置周期', visible: false, disabled: false},
    {value: 'seqFormat', name: '序列格式', visible: false, disabled: false},
    {value: 'seqDesc', name: '描述', visible: false, disabled: false},
]


/**
 * 增改表单正则
 */
export const SysSequenceOperationRules: FormRules = {
    seqCode: [{required: true, message: '序列编码不能为空', trigger: ['blur', 'change']}],
    seqName: [{required: true, message: '序列名称不能为空', trigger: ['blur', 'change']}],
    currentValue: [{required: true, message: '序列当前值不能为空', trigger: ['blur', 'change']}],
    stepValue: [{required: true, message: '序列步进值不能为空', trigger: ['blur', 'change']}],
    maxValue: [{required: true, message: '序列最大值不能为空', trigger: ['blur', 'change']}],
    minValue: [{required: true, message: '序列最小值不能为空', trigger: ['blur', 'change']}],
    seqLoop: [
        {required: true, message: '序列是否循环0循环1不循环不能为空', trigger: ['blur', 'change']}
    ],
    resetFlag: [
        {
            required: true,
            message: '序列重置周期 0 不重置 D每天 M月 Y年不能为空',
            trigger: ['blur', 'change']
        }
    ],
    seqFormat: [{required: true, message: '序列格式不能为空', trigger: ['blur', 'change']}],
    seqDesc: [{required: true, message: '序列描述不能为空', trigger: ['blur', 'change']}]
}

/**
 * 循环更新
 */
export const DictSeqLoop: StaticDictType[] = [
    {label: '取消', value: '0', tagType: 'primary'},
    {label: '确认', value: '1', tagType: 'success'},
]


/**
 * 重置周期
 */
export const DictResetFlag: StaticDictType[] = [
    {label: '不需要', value: '0', tagType: 'warning'},
    {label: '每天', value: 'D', tagType: 'primary'},
    {label: '每月', value: 'M', tagType: 'success'},
    {label: '每年', value: 'Y', tagType: 'danger'},
]
