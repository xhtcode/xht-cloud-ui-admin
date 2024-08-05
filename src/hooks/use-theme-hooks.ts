import {useThemeStore} from "@/store/modules/theme"
import {CSSProperties} from "vue"
import variables from "@/styles/variables.module.scss";

/**
 * 主题相关的Hooks
 */
export const useThemeHooks = () => {
    const themeStore = useThemeStore()

    /**
     * 菜单状态
     */
    const menuStatus = computed<boolean>(() => themeStore.menuStatus)
    const footerStatus = computed<boolean>(() => themeStore.footer)

    /**
     * asider 样式
     */
    const asideStyle = computed<CSSProperties>(() => {
        return {
            width: themeStore.menuStatus ? variables.menuWidth200 : variables.menuWidth64
        }
    })

    /**
     * 切换菜单状态
     */
    const changeMenuStatus = () => {
        themeStore.menuStatus = !themeStore.menuStatus
    }


    return {
        menuStatus,
        footerStatus,
        asideStyle,
        changeMenuStatus
    }
}
