/**
 * 部门查询类型
 */
export interface SysOperationLogQueryReq extends CrudQueryFrom {
    serverName?: string // 服务名称
    busName?: string // 业务名称
    status?: string // 操作状态
}


/**
 * 部门返回值
 */
export interface SysOperationLogResponse extends CrudOptions {
    id: string //主键
    serverName: string // 服务名称
    busName: string // 业务名称
    busDesc: string // 业务描述
    operateMethod: string // 请求方式
    operateType: string // 操作类别
    operateName: string // 操作人员
    requestUrl: string // 请求URL
    operateIp: string // 主机地址
    operateParam: string // 请求参数
    traceId: string // 日志TRACE_ID
    status: string // 操作状态
    errorMsg: string // 错误消息
}
