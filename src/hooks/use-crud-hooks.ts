import type {CellStyle} from "element-plus";
import type {Reactive} from "@vue/reactivity";
import {pageParams} from "@/utils/moudle/element";
import type {AxiosPromise, AxiosResponse, PageResponse} from "axios";
import {useMessage} from "@/hooks/use-message";

/**
 * 表格样式。
 */
export interface TableStyle {
    cellStyle: CellStyle<any>;
    headerCellStyle: CellStyle<any>;
}

export const useTableQueryHooks = <Request extends CrudQueryFrom, Response extends CrudOptions>
(options: Reactive<BasicTableQueryOptions<Request, Response>>, pageListApi?: (data: Request) => AxiosPromise<Response[] | PageResponse<Response>>) => {
    const defaultOptions: BasicTableQueryOptions<Request, Response> = {
        loadingStatus: false,
        showSearch: true,
        pageStatus: true,
        onMountedQueryStatus: true,
        singleStatus: true, // 单个禁用
        multipleStatus: true, // 多个禁用
        queryParams: {
            current: 1,
            size: 10
        } as any,
        tableList: [],
        total: 0,
        pages: 10,
    }
    const state = mergeDefaultOptions(defaultOptions, options);
    /**
     * 定义表格通用样式
     * @returns  css
     */
    const tableStyle: TableStyle = {
        cellStyle: {'text-align': 'center'},
        headerCellStyle: {
            textAlign: 'center',
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)',
            userSelect: 'none'
        },
    };

    /**
     * 自定义表格索引生成
     */
    const createTableIndex = (index: number) => {
        return ((state.queryParams.current || 1) - 1) * (state.queryParams.size || 0) + index + 1
    }
    /**
     * 多选框选中数据
     * @param selection 选中信息
     */
    const handleSelectionChange = (selection: any[]) => {
        state.checkId = selection.map((item: any) => item.id)
        state.checkData = selection
        state.singleStatus = selection.length !== 1
        state.multipleStatus = !selection.length
    }

    /**
     * 查询
     */
    const handleQuery = (query?: Request) => {
        state.loadingStatus = true
        state.refreshTable = false
        pageParams(state.queryParams, query)
        if (query) {
            mergeDefaultOptions(query, state.queryParams)
        }
        state.tableList = []
        pageListApi!(state.queryParams).then((response: AxiosResponse<any>) => {
            if (state.pageStatus) {
                state.tableList = response.data?.list
                state.total = response.data?.total
                state.pages = response.data?.pages
            } else {
                state.tableList = response.data
            }
        }).catch((err: any) => {
            // 捕获异常并显示错误提示
            console.error(err)
            useMessage().error('系统异常，联系管理员!');
        }).finally(() => {
            state.loadingStatus = false
            state.refreshTable = true
        })
    }

    onMounted(() => {
        if (state.onMountedQueryStatus) {
            handleQuery()
        }
    })

    return {
        tableStyle,
        createTableIndex,
        handleSelectionChange,
        handleQuery,
    }
}
/**
 * 合并默认属性配置和自定义属性配置
 * @param options 默认属性配置对象
 * @param props 自定义属性配置对象
 * @returns 合并后的属性配置对象
 */
const mergeDefaultOptions = (options: any, props: any): BasicTableQueryOptions<any, any> => {
    for (const key in options) {
        if (!Object.getOwnPropertyDescriptor(props, key)) {
            props[key] = options[key];
        }
    }
    return props;
};




