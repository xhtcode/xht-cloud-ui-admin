import type {FormRules} from "element-plus";
import type {SysAreaInfoOperationReq} from "@/api/system/area/type";

/**
 * 增改页面 表单类型 默认值
 */
export const SysAreaInfoOperationForm: SysAreaInfoOperationReq = {
    id: '-1', // 主键
    parentId: '-1', // 父级区划代码
    name: '中国', // 名称
    level: '1', // 级别1-5,省市县镇村1级：省、直辖市、自治区2级：地级市3级：市辖区、县（旗）、县级市、自治县（自治旗）、特区、林区4级：镇、乡、民族乡、县辖区、街道5级：村、居委会
    areaNo: '', // 区划代码
    category: '111', // 城乡分类 111表示主城区；112表示城乡接合区；121表示镇中心区；122表示镇乡接合区；123表示特殊区域；210表示乡中心区；220表示村庄
    msg: '' // 描述
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysAreaInfoOperationPageInit: OperationPageInit = {
    title: '添加地区',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}

/**
 * 增改表单正则
 */
export const SysAreaInfoOperationRules: FormRules = {
    parentId: [{required: true, message: '上级地区不能为空', trigger: ['blur', 'change']}],
    areaNo: [{required: true, message: '区划代码不能为空', trigger: ['blur', 'change']}],
    name: [{required: true, message: '地区名称不能为空', trigger: ['blur', 'change']}]
}

/**
 * 地区级别
 */
export const DictAreaLevel: StaticDictType[] = [
    {label: '省、直辖市、自治区', value: '1'},
    {label: '地级市', value: '2'},
    {label: '市辖区、县（旗）、县级市、自治县（自治旗）、特区、林区', value: '3'},
    {label: '镇、乡、民族乡、县辖区、街道', value: '4'},
    {label: '村、居委会', value: '5'}
]

/**
 * 城乡分类
 */
export const DictAreaCategory: StaticDictType[] = [
    {label: '主城区', value: '111'},
    {label: '城乡接合区', value: '112'},
    {label: '镇中心区', value: '121'},
    {label: '镇乡接合区', value: '122'},
    {label: '特殊区域', value: '123'},
    {label: '乡中心区', value: '210'},
    {label: '村庄', value: '220'}
]
