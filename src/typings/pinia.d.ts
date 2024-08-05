import type {RouteLocationNormalizedLoaded} from "vue-router";
import type {SysDictResponse} from "@/api/system/dict/type";

/**
 * pinia自定义ts类型
 */
declare global {

    /**
     * 主题pina
     */
    interface ThemeStoreType {
        fpsStatus: Ref<boolean> // fps状态
        darkStatus: Ref<boolean> // 暗黑模式
        menuStatus: Ref<boolean> // 菜单状态
        breadcrumb: Ref<boolean> // 面包屑显示状态
        breadcrumbIcon: Ref<boolean> // 面包屑图标显示状态
        tagsViewIcon: Ref<boolean> // tags图标显示状态
        footer: Ref<boolean> // footer 显示
        watermarkContent: Ref<string> // 水印内容
        langType: Ref<LANG_TYPE> // 语言类型
        sizeType: Ref<UI_SIZE_TYPE> // UI组件大小类型
        colorType: Ref<string> // 默认主题颜色
        changeFpsStatus: () => void // 切换fps显示
        changeDarkStatus: () => void // 切换暗黑模式
        changeWatermarkContent: (content: string) => void // 设置水印内容
        changeLangType: (type: LANG_TYPE) => void // 设置语言类型
        changeSizeType: (type: UI_SIZE_TYPE) => void // 设置组件大小
        changeColorType: (type: string) => void // 设置默认主题颜色
    }

    /**
     * 用户信息store
     */
    interface UserInfoStoreType {
        userId: string | null// 用户id
        userName: string | null // 用户名称
        userAccount: string | null // 用户账号
        dataScope: number | null // 数据权限
        roles: string[] // 角色code
        authorities: string[] // 权限code
        token: TokenInfoType // token信息
    }

    interface TagsViewState {
        visitedViews: RouteLocationNormalizedLoaded[]
        cachedViews: Set<string>
        tagsViewCurrenFull: boolean
        tagsViewCurrenFullPath?: string
    }

    interface DictInfoState {
        dictInfo: Map<string, SysDictResponse | null | undefined>
    }

    interface TagsViewType {
        path: string
        title: string
        name: string
        icon: string
        affixStatus: boolean
        cacheStatus?: boolean //是否缓存
        query?: any //查询参数
    }

}

export {}
