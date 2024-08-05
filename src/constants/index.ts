/**
 * 常用请求头枚举
 */
export enum CommonHeaderEnum {
    AUTHORIZATION = 'Authorization',
    CONTENT_TYPE = 'Content-Type',
    TRACE_ID = 'Trace-Id', //分布式链路ID
    USER_ACCOUNT = 'User-Account', //用户名
    USER_ID = 'User-Id', //用户ID
}

/**
 * 语言常量类型
 */
export const LANG_CONSTANT: CommonKeyValue<string, LANG_TYPE>[] = [
    {label: "中文", value: "zh-cn"},
    {label: "English", value: "en"}
]

/**
 * UI大小常量类型
 */
export const UI_SIZE_TYPE_CONSTANT: CommonKeyValue<string, UI_SIZE_TYPE>[] = [
    {label: "大型", value: "large"},
    {label: "默认", value: 'default'},
    {label: "小型", value: "small"},
]

/**
 * 预定义颜色
 */
export const PREDEFINE_COLORS: string[] = [
    '#1e90ff',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#ff8c00',
    '#c71585',
    '#ff4500',
]
export const OPERATE_TYPE: CommonKeyValue<string, number>[] = [
    {label: "查询", value: 1},
    {label: "分页", value: 2},
    {label: "创建", value: 3},
    {label: "修改", value: 4},
    {label: "删除", value: 5},
    {label: "导出", value: 6},
    {label: "导入", value: 7},
    {label: "其他", value: 8},
]

