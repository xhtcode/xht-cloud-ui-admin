// https://cn.vitejs.dev/guide/env-and-mode

declare module "*.vue" {
    import {DefineComponent} from "vue";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// TypeScript 类型提示都为 string： https://github.com/vitejs/vite/issues/6930
interface ImportMetaEnv {
    VITE_APP_TITLE: string; // 应用标题
    VITE_USER_NODE_ENV: string; // 环境标识
    VITE_APP_PORT: number; // 应用端口
    VITE_APP_BASE_API_PREFIX: string; // API 基础路径(代理前缀)
    VITE_APP_BASE_API_URL: string; // API 地址
    VITE_MOCK_DEV_SERVER: boolean; // 是否开启 Mock 服务
    VITE_APP_XHT_CLOUD_GENERATOR_PREFIX: string // 代码生成器
    VITE_APP_XHT_CLOUD_SYSTEM_PREFIX: string // xht-cloud-system
    VITE_APP_XHT_CLOUD_MINIO_PREFIX: string // xht-cloud-file-minio
    VITE_APP_XHT_CLOUD_AUTH_PREFIX: string // xht-cloud-authorization-server
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

/**
 * 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示
 */
declare const __APP_INFO__: {
    pkg: {
        name: string;
        version: string;
        engines: {
            node: string;
        };
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
    };
    buildTimestamp: number;
};
