// src/router/index.ts
import {createRouter, createWebHashHistory} from 'vue-router';
import StaticRouter from "@/router/modules/static";

/**
 * 创建路由
 */
const router = createRouter({
    history: createWebHashHistory('/'),
    routes: [
        ...StaticRouter
    ],
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({left: 0, top: 0})
});

/**
 * 重置路由
 */
export const resetRouter = async () => {
    await router.replace({path: "/login"});
}


export default router;
