<template>
	<el-menu :collapse="!menuStatus" :collapse-transition="false" :default-active="activeMenuPath" :ellipsis="false"
	         :unique-opened="true"
	         mode="vertical">
		<menu-item :menuList="menuList"/>
	</el-menu>
</template>

<script lang="ts" setup>
import {useThemeHooks} from '@/hooks/use-theme-hooks'
import {useRouterListStore} from "@/store/modules/routesList";
import {storeToRefs} from "pinia";
import MenuItem from "@/layout/components/menu-item/index.vue";
import {useRoute} from "vue-router";

defineOptions({ name: 'MenuMainComponent'})
const {menuStatus} = useThemeHooks()
const route = useRoute()
const stores = useRouterListStore()
const {routerOldList} = storeToRefs(stores)
const menuList = computed(() => filterRoutesFun(routerOldList.value))
const activeMenuPath = computed<string>(() =>
		route.meta?.activeMenu ? route.meta?.activeMenu : route.path
)
// 路由过滤递归函数
const filterRoutesFun = (arr: any[]): any[] => {
	return arr
			.filter((item: any) => !item.meta?.hiddenStatus)
			.map((item: any) => {
				item = Object.assign({}, item)
				if (item.children) item.children = filterRoutesFun(item.children)
				return item
			})
}
</script>

<style lang="scss" scoped></style>
