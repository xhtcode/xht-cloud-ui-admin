export interface ContextMenuSchemaType {
    icon: string //菜单图标
    label: string //菜单名称
    command: OperationType | string //命令
    disabled?: boolean //禁用
    divided?: boolean //下划线
}
