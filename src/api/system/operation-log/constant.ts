import type {ColumnOption} from "@/components/right-tool-bar/types";


/**
 * 列表显示配置
 */
export const SysOperationLogColumnOption: ColumnOption[] = [
    {value: 'serverName', name: '服务名称', visible: true, disabled: true},
    {value: 'busName', name: '业务名称', visible: true, disabled: true},
    {value: 'busDesc', name: '业务描述', visible: false, disabled: false},
    {value: 'operateType', name: '操作类别', visible: false, disabled: false},
    {value: 'operateName', name: '操作人员', visible: true, disabled: false},
    {value: 'requestUrl', name: '请求URL', visible: true, disabled: true},
    {value: 'operateIp', name: '主机地址', visible: false, disabled: false},
    {value: 'operateParam', name: '请求参数', visible: false, disabled: false},
    {value: 'traceId', name: '链路ID', visible: false, disabled: false},
    {value: 'status', name: '状态', visible: true, disabled: true},
    {value: 'errorMsg', name: '错误消息', visible: false, disabled: false},
    {value: 'createTime', name: '创建时间', visible: false, disabled: true},
]
/**
 * 状态
 */
export const LogDictStatus: StaticDictType[] = [
    {label: '成功', value: 1, tagType: 'success'},
    {label: '失败', value: 0, tagType: 'primary'}
]
