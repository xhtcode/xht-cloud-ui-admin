import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(({mode}: ConfigEnv): UserConfig => {
    const env: Record<string, string> = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            VueDevTools(),
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ["vue"],
                eslintrc: {
                    enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
                    filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
                },
                resolvers: [
                    ElementPlusResolver(),// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                    IconsResolver({}),   // 自动导入图标组件
                ],
                vueTemplate: true, // 是否在 vue 模板中自动导入
                dts: path.resolve(pathSrc, "typings", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
            }),
            Components({
                resolvers: [
                    ElementPlusResolver(),// 自动导入 Element Plus 组件
                    IconsResolver({ // 自动注册图标组件
                        prefix: false,// 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
                        enabledCollections: ["ep"]  // 指定collection，即指定为element-plus图标集ep https://icon-sets.iconify.design/?category=General
                    }),
                ],
                dirs: ['src/components/**'], // 指定自定义组件位置(默认:src/components)
                dts: path.resolve(pathSrc, "typings", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],//  指定需要缓存的图标文件夹
                symbolId: 'icon-[dir]-[name]', // 指定symbolId格式
            }),
            Icons({
                compiler: "vue3",
                autoInstall: true,  // 自动安装图标库
            }),
        ],
        resolve: {
            alias: { //路径别名
                "@": pathSrc
            }
        },
        // vite.config.ts
        css: {
            preprocessorOptions: {   // CSS 预处理器
                scss: {
                    javascriptEnabled: true,  //定义全局SCSS变量
                    additionalData: `@use "@/styles/variables.scss" as *;@use "@/styles/common/base.scss" as *;`
                }
            }
        },
        /**
         * 本地反向代理解决浏览器跨域限制
         */
        server: {
            // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
            host: '0.0.0.0',
            port: Number(env.VITE_APP_PORT),
            open: true,
            cors: true,
            proxy: {
                [env.VITE_APP_BASE_API_PREFIX]: {
                    target: env.VITE_APP_BASE_API_URL, // 代理地址
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API_PREFIX), '')
                }
            }
        },
        optimizeDeps: {  // 预加载项目必需的组件
            include: ['element-plus/es/locale/lang/zh-cn', 'element-plus/es/locale/lang/en'],
        }
    }
})
