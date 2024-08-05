import type {SysDictItemResponse} from "@/api/system/dict/type";

/**
 * 字典多选类型
 */
export interface DictCheckPropsType {
    modelValue: number[] | string[] | undefined
    dictCode: string // 字典编码
    name?: string // 绑定的name属性
    disabled?: boolean // 是否禁用
    size?: UI_SIZE_TYPE // 尺寸大小
    border?: boolean //是否显示边框
    min?: number // 可被勾选的checkbox的最小数量
    max?: number // 可被勾选的checkbox的最大数量
}

/**
 * 字典单选类型
 */
export interface DictRadioPropsType {
    modelValue: number | string
    dictCode: string // 字典编码
    name?: string // 绑定的name属性
    disabled?: boolean // 是否禁用
    border?: boolean //是否显示边框
    size?: UI_SIZE_TYPE
}

/**
 * 字典下拉类型
 */
export interface DictSelectPropsType {
    modelValue: number | number[] | string | string[] | undefined
    dictCode: string // 字典编码
    multiple?: boolean // 是否多选
    placeholder?: string // 提示内容
    disabled?: boolean // 是否禁用
    clearable?: boolean // 是否清空
    filterable?: boolean //是否可筛选
    multipleLimit?: number // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
    maxCollapseTags?: number // 	需要显示的 Tag 的最大数
}

/**
 * 字典 tag 类型
 */
export interface DictTagPropsType {
    tagClass?: string,
    view?: boolean //是否查看
    initValue?: Array<any>
    dictCode: string // 字典编码
    hit?: boolean // 是否有边框描边
    round?: boolean // Tag 是否为圆形
    closable?: boolean // 是否显示关闭
    disableTransitions?: boolean //	是否禁用渐变动画
    effect?: 'light' | 'dark' | 'plain' // 	Tag 的主题
    size?: UI_SIZE_TYPE // 	Tag 的尺寸
}


/**
 * 静态 字典多选类型
 */
export interface StaticDictCheckPropsType extends DictCheckPropsType {
    dictList: StaticDictType[] // 字典数据
    modelValue: number[] | string[] | undefined
    dictCode: string // 字典编码
    name?: string // 绑定的name属性
    disabled?: boolean // 是否禁用
    size?: UI_SIZE_TYPE // 尺寸大小
    border?: boolean //是否显示边框
    min?: number // 可被勾选的checkbox的最小数量
    max?: number // 可被勾选的checkbox的最大数量
}

/**
 * 静态 字典单选类型
 */
export interface StaticDictRadioPropsType {
    dictList: StaticDictType[] // 字典数据
    modelValue: number | string
    name?: string // 绑定的name属性
    disabled?: boolean // 是否禁用
    border?: boolean //是否显示边框
    size?: UI_SIZE_TYPE
}

/**
 * 静态 字典下拉类型
 */
export interface StaticDictSelectPropsType {
    dictList: StaticDictType[] // 字典数据
    modelValue: number | number[] | string | string[] | undefined
    multiple?: boolean // 是否多选
    placeholder?: string // 提示内容
    disabled?: boolean // 是否禁用
    clearable?: boolean // 是否清空
    filterable?: boolean //是否可筛选
    multipleLimit?: number // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
    maxCollapseTags?: number // 	需要显示的 Tag 的最大数
}

/**
 * 静态 字典 tag 类型
 */
export interface StaticDictTagPropsType {
    view?: boolean //是否查看
    dictList: StaticDictType[] // 字典数据
    initValue?: any[]
    hit?: boolean // 是否有边框描边
    round?: boolean // Tag 是否为圆形
    closable?: boolean // 是否显示关闭
    disableTransitions?: boolean //	是否禁用渐变动画
    effect?: 'light' | 'dark' | 'plain' // 	Tag 的主题
    size?: UI_SIZE_TYPE // 	Tag 的尺寸
}


export interface EmitsType {
    (e: 'update:modelValue', modelValue: any): void

    (e: 'change', type?: SysDictItemResponse[]): void
}

export interface StaticEmitsType {
    (e: 'update:modelValue', modelValue: any): void

    (e: 'change', type?: StaticDictType[]): void
}
