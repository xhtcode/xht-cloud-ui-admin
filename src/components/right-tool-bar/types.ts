/**
 * 右边工作区props类型
 */
export interface RightToolbarPropsType {
    searchStatus?: boolean, // 是否显示搜索框
    showSearch?: boolean, // 是否显示搜索框提示
    refreshStatus?: boolean, // 是否显示刷新
    importStatus?: boolean, // 是否导入
    exportStatus?: boolean, // 是否导出
    columnStatus?: boolean, // 显隐列
    columnData: ColumnOption[], // 显隐数据
    gutter?: number, // 列表项之间的间距
}

/**
 * state 类型
 */
export interface StateType {
    columnValue: string[], // 显隐数据
    openStatus: boolean // 是否显示弹出层
    loadingStatus: boolean // 加载
}


/**
 * 显隐数据类型
 */
export interface ColumnOption {
    value: string //字段英文名
    name: string //字段中文名
    visible: boolean //是否显示 true 显示
    disabled?: boolean //是否禁用 true 禁用
}

/**
 * emit 类型
 */
export interface EmitsType {
    (e: 'update:showSearch', showSearch: boolean): void

    (e: 'update:columnData', columnData: ColumnOption[]): void

    (e: 'import'): void

    (e: 'export'): void

    (e: 'refresh'): void
}
