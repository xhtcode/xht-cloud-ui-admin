/**
 * 增删改查 基础字段设置
 */
declare global {

    type OperationType = 'save' | 'update' | 'remove' | 'query'

    /**
     * 列表页面 表单查询参数
     */
    interface CrudQueryFrom {
        size?: number //数量
        current?: number //页码
        ascName?: string //正序排序字段名称
        descName?: string //倒序排序字段名称
        [key: string]: any
    }

    interface OperationReq {
        id?: any
    }

    /**
     * 列表页面 列表类型
     */
    interface CrudOptions {
        id: any // 创建时间
        createTime?: string // 创建时间
        updateTime?: string // 更新时间
        createBy?: string // 创建用户
        updateBy?: string // 修改用户
    }


    /**
     * 列表页面 页面配置参数
     */
    interface QueryPageInit<T> {
        loading: boolean // 遮罩层
        showSearch?: boolean // 显示搜索条件
        checkId?: string[] // 选中数组
        checkData?: T[] //选中数据
        single?: boolean // 非单个禁用
        multiple?: boolean // 非多个禁用
        isExpandAll?: boolean // 是否展开，默认全部折叠
        refreshTable?: boolean // 重新渲染表格状态
        total?: number // 分页总数
        pages?: number // 分页的页码
        [key: string]: any
    }

    /**
     * 增改页面 页面配置参数
     */
    interface OperationPageInit {
        title: string // 弹框标题
        submitTitle: string // 提交标题
        visibleStatus: boolean // 是否显示增加修改弹出层
        loadingStatus: boolean // 加载
        operationStatus: OperationType // 操作类型
        fullScreenStatus?: boolean // 是否全屏
    }

    /**
     * 公共的页面配置参数，不足时自行扩展
     */
    interface BasicOperationPageInit<T extends OperationReq> {
        addUpdatePageInit: OperationPageInit,
        addUpdateForm: T
    }

    interface BasicTableQueryOptions<Request extends CrudQueryFrom, Response extends CrudOptions> {
        queryParams: Request,
        tableList: Response[],
        loadingStatus: boolean // 加载状态
        showSearch?: boolean, // 是否显示搜索框提示
        refreshTable?: boolean // 刷新表格
        expandAllStatus?: boolean // 表格折叠状态
        onMountedQueryStatus?: boolean // 是否查询
        pageStatus?: boolean // 是否分页
        singleStatus?: boolean // 单个禁用
        multipleStatus?: boolean // 多个禁用
        total?: number // 页面表格列表总数
        pages?: number //页数
        checkData?: Response[] //选中数据
        checkId?: any[] // 选中数据的id
        [key: string]: any
    }

}
export {}
