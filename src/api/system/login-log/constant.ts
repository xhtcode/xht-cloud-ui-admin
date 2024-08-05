import type { ColumnOption } from "@/components/right-tool-bar/types";


/**
 * 登录日志列表显示配置
 */
export const SysLoginLogColumnOption: ColumnOption[] = [
    { value: 'userAccount', name: '用户账号', visible: true, disabled: true },
    { value: 'userName', name: '用户名称', visible: false, disabled: true },
    { value: 'userType', name: '用户类型', visible: true, disabled: true },
    { value: 'loginType', name: '登录类型', visible: true, disabled: false },
    { value: 'loginTime', name: '登录时间', visible: true, disabled: true },
    { value: 'loginIp', name: '登录的IP地址', visible: true, disabled: false },
    { value: 'loginAddress', name: '登录的归属地', visible: true, disabled: false },
    { value: 'userAgent', name: '登录的浏览器', visible: false, disabled: false },
    { value: 'loginDesc', name: '登录描述', visible: false, disabled: false },
]

/**
 * 状态
 */
export const LogDictStatus: StaticDictType[] = [
    { label: '成功', value: 1, tagType: 'success' },
    { label: '失败', value: 0, tagType: 'primary' }
]
