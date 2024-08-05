import type {SysMenuOperationReq, SysMenuResponse} from "@/api/system/menu/type";
import type {FormRules} from "element-plus";
import type {ColumnOption} from "@/components/right-tool-bar/types";

/**
 * 列表页面 页面配置参数
 */
export const SysMenuQueryPageInit: QueryPageInit<SysMenuResponse> = {
    loading: false, // 遮罩层
    showSearch: true, // 显示搜索条件
    checkId: [], // 选中数组
    single: true, // 非单个禁用
    multiple: true, // 非多个禁用
    isExpandAll: false, // 是否展开，默认全部折叠
    refreshTable: true // 重新渲染表格状态
}

/**
 * 增改页面 页面配置类型 默认值
 */
export const SysMenuOperationPageInit: OperationPageInit = {
    title: '添加菜单',
    submitTitle: '添加',
    visibleStatus: false,
    loadingStatus: false,
    fullScreenStatus: false,
    operationStatus: 'save'
}


/**
 * 增改页面 表单类型 默认值
 */
export const SysMenuOperationForm: SysMenuOperationReq = {
    id: null,
    parentId: '', //上级菜单id
    menuType: 'M', //菜单类型
    menuName: '', //菜单类型
    menuIcon: '', //菜单图标
    menuSort: 1, //菜单排序
    menuHidden: '1', //菜单隐藏
    menuActive: '', //高亮菜单
    menuLink: '0', //是否外链
    menuAffix: '0', //tabs固定
    menuStatus: '1', //菜单状态
    menuAuthority: '', //菜单状态
    menuCache: '1' //菜单状态
}

/**
 * 列表显示配置
 */
export const SysMenuColumnOption: ColumnOption[] = [
    {value: 'menuIcon', name: '菜单图标', visible: true, disabled: true},
    {value: 'menuType', name: '菜单类型', visible: true, disabled: true},
    {value: 'menuName', name: '菜单名称', visible: true, disabled: true},
    {value: 'menuAuthority', name: '权限标识', visible: false, disabled: false},
    {value: 'menuViewName', name: '组件名称', visible: false, disabled: false},
    {value: 'menuViewPath', name: '组件路径', visible: false, disabled: false},
    {value: 'menuStatus', name: '菜单状态', visible: true, disabled: true},
    {value: 'menuSort', name: '菜单排序', visible: true, disabled: true},
]


/**
 * 增改页面 表单类型 表单校验
 */
export const SysMenuOperationRules: FormRules = {
    parentId: [{required: true, message: '请选择上级菜单', trigger: ['blur', 'change']}],
    menuIcon: [{required: true, message: '请输入菜单图标', trigger: ['blur', 'change']}],
    menuType: [
        {
            required: true,
            message: '请选择菜单类型（M目录 C菜单 F按钮）',
            trigger: ['blur', 'change']
        }
    ],
    menuName: [{required: true, message: '请输入菜单名称', trigger: ['blur', 'change']}],
    menuViewName: [{required: true, message: '请输入组件名称', trigger: ['blur', 'change']}],
    menuViewPath: [],
    menuPath: [
        {required: true, message: '请输入路由地址', trigger: ['blur', 'change']},
        {
            pattern: /^(\/|http:|https:|www:)*/,
            message: '路由地址格式不正确',
            trigger: ['blur', 'change']
        }
    ],
    menuRedirect: [],
    menuSort: [{required: true, message: '请输入菜单排序', trigger: ['blur', 'change']}],
    menuStatus: [{required: true, message: '请选择菜单状态', trigger: ['blur', 'change']}],
    menuHidden: [{required: true, message: '请选择菜单隐藏', trigger: ['blur', 'change']}],
    menuLink: [{required: true, message: '请选择路由外链', trigger: ['blur', 'change']}],
    menuAffix: [{required: true, message: '请选择固定affix', trigger: ['blur', 'change']}],
    menuCache: [{required: true, message: '请选择路由缓存', trigger: ['blur', 'change']}]
}

/**
 * 菜单状态
 */
export const DictMenuStatus: StaticDictType[] = [
    {label: '启用', value: '1', tagType: 'success'},
    {label: '禁用', value: '0', tagType: 'primary'}
]
