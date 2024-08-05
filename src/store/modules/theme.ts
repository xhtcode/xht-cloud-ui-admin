import {defineStore} from "pinia"
import pInIaPersistConfig from "@/store/piniaPersist";
import {isDark, toggleDark} from '@/utils/dark'
import Color from "color";

/**
 * 主题相关pinia
 */
export const useThemeStore =
    defineStore('theme',
        (): ThemeStoreType => {

            /**
             * fps状态
             */
            const fpsStatus = ref<boolean>(true)

            /**
             * 暗黑模式
             */
            const darkStatus = ref<boolean>(false)

            /**
             * 菜单状态
             */
            const menuStatus = ref<boolean>(true)

            /**
             * 面包屑显示状态
             */
            const breadcrumb = ref<boolean>(true)

            /**
             * 面包屑图标显示状态
             */
            const breadcrumbIcon = ref<boolean>(true)

            /**
             * tags图标显示状态
             */
            const tagsViewIcon = ref<boolean>(true)

            /**
             * footer 显示
             */
            const footer = ref<boolean>(false)

            /**
             * 水印内容
             */
            const watermarkContent = ref<string>('')

            /**
             * 语言类型
             */
            const langType = ref<LANG_TYPE>('zh-cn')

            /**
             * UI组件大小类型
             */
            const sizeType = ref<UI_SIZE_TYPE>('default')

            /**
             * 默认主题颜色
             */
            const colorType = ref<string>('#1E90FF')

            /**
             * 切换fps显示
             *
             */
            const changeFpsStatus = () => {
                fpsStatus.value = !fpsStatus.value
            }

            /**
             * 切换暗黑模式
             *
             */
            const changeDarkStatus = () => {
                toggleDark()
                darkStatus.value = isDark.value
            }

            /**
             * 设置水印内容
             * @param content 水印内容
             */
            const changeWatermarkContent = (content: string) => {
                watermarkContent.value = content
            }

            /**
             * 设置语言类型
             *
             * @param type 类型
             */
            const changeLangType = (type: LANG_TYPE) => {
                langType.value = type
            }

            /**
             * 设置组件大小
             *
             * @param type 类型
             */
            const changeSizeType = (type: UI_SIZE_TYPE) => {
                sizeType.value = type
            }

            /**
             * 设置默认主题颜色
             * @param type 类型
             */
            const changeColorType = (type: string) => {
                colorType.value = type
                const rootStyle = document.documentElement.style;
                rootStyle.setProperty(`--el-color-primary`, type);
                rootStyle.setProperty(`--el-color-primary-dark-2`, type);

                for (let i = 1; i < 10; i++) {
                    rootStyle.setProperty(
                        `--el-color-primary-light-${i}`,
                        `${Color(type).alpha(1 - i * 0.1)}`
                    );
                }
            }

            return {
                fpsStatus,
                darkStatus,
                menuStatus,
                breadcrumb,
                breadcrumbIcon,
                tagsViewIcon,
                footer,
                watermarkContent,
                langType,
                sizeType,
                colorType,
                changeFpsStatus,
                changeDarkStatus,
                changeWatermarkContent,
                changeLangType,
                changeSizeType,
                changeColorType
            }
        }, {
            persist: pInIaPersistConfig('theme', [
                'fpsStatus',
                'darkStatus',
                'menuStatus',
                'langType',
                'sizeType',
                'colorType'
            ])
        }
    )
