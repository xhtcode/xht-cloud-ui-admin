/**
 * 序列查询类型
 */
export interface SysSequenceQueryReq extends CrudQueryFrom {
    seqCode?: string // 序列编码
    seqName?: string // 序列名称
    seqLoop?: string // 序列是否循环0循环1不循环
    resetFlag?: string // 序列重置周期 0 不重置 D每天 M月 Y年
}

/**
 * 序列操作类型
 */
export interface SysSequenceOperationReq extends OperationReq {
    seqCode: string // 序列编码
    seqName: string // 序列名称
    currentValue: number // 序列当前值
    stepValue: number // 序列步进值
    maxValue: number // 序列最大值
    minValue: number // 序列最小值
    seqLoop: '0' | '1' // 序列是否重置  0不循环更新1循环更新
    resetFlag: '0' | 'D' | 'M' | 'Y' // 序列重置周期 0 不重置 D每天 M月 Y年
    seqFormat: string // 序列格式
    seqDesc: string // 序列描述
}

/**
 * 序列返回值
 */
export interface SysSequenceResponse extends CrudOptions {
    seqCode: string // 序列编码
    seqName: string // 序列名称
    currentValue: number // 序列当前值
    stepValue: number // 序列步进值
    maxValue: number // 序列最大值
    minValue: number // 序列最小值
    seqLoop: '0' | '1' // 序列是否重置  0不循环更新1循环更新
    resetFlag: '0' | 'D' | 'M' | 'Y' // 序列重置周期 0 不重置 D每天 M月 Y年
    seqFormat: string // 序列格式
    seqDesc: string // 序列描述
}

