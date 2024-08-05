/**
 * 字典类型查询类型
 */
export interface SysDictQueryReq extends CrudQueryFrom {
    dictType?: string // 字典类型编码
    dictName?: string // 字典类型名称
    dictStatus?: string // 字典类型状态
}

/**
 * 字典类型操作类型
 */
export interface SysDictOperationReq extends OperationReq {
    dictType?: string // 字典类型编码
    dictName?: string // 字典类型名称
    dictStatus?: string // 字典类型状态
    dictSort: number // 字典类型排序
    dictDesc: string // 字典类型备注
}

/**
 * 字典类型返回值
 */
export interface SysDictResponse extends CrudOptions {
    dictType: string // 字典类型编码
    dictName: string // 字典类型名称
    dictStatus: string // 字典类型状态
    dictSort?: number // 字典类型排序
    dictDesc?: string // 字典类型备注
    children?: SysDictItemResponse[] // 字典数据集合
}

/**
 * 字典数据查询类型
 */
export interface SysDictItemQueryReq extends CrudQueryFrom {
    dictId?: string // 字典id
    dictType?: string // 字典类型
    dictCode?: string // 字典数据编码
    dictValue?: string // 字典数据值
    dictStatus?: string // 字典数据状态
}

/**
 * 字典数据操作类型
 */
export interface SysDictItemOperationReq extends OperationReq {
    id: string
    dictId: string // 字典id
    dictType: string // 字典类型
    dictCode: string // 字典数据编码
    dictValue: string // 字典数据值
    tagType?: string // tag展示的类型
    dictSort: number // 字典数据排序
    dictStatus: string // 字典数据状态
    dictDesc: string // 字典数据备注
}

/**
 * 字典数据返回值
 */
export interface SysDictItemResponse extends CrudOptions {
    dictId: string // 字典id
    dictType: string // 字典类型
    dictCode: string // 字典数据编码
    dictValue: string // 字典数据值
    tagType?: any // tag展示的类型
    dictSort?: number // 字典数据排序
    dictStatus?: string // 字典数据状态
    dictDesc?: string // 字典数据备注
}

