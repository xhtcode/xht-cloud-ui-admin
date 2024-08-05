<template>
	<template v-for="(val, index) in menuLists">
		<el-sub-menu
				v-if="!val.meta?.hiddenStatus && val.children && val.children.length > 0"
				:key="val.path"
				:index="val.path">
			<template #title>
				<svg-icon :name="val.meta?.icon" color="var(--xht-svg-color)"/>
				<span>{{ val.meta?.title }}</span>
			</template>
			<MenuItem :menuList="val.children"/>
		</el-sub-menu>
		<template v-else>
			<el-menu-item
					v-if="!val.meta?.hiddenStatus"
					:key="index"
					:index="val.path"
					@click="handleClickMenu(val)">
				<svg-icon :name="val.meta?.icon" color="var(--xht-svg-color)"/>
				<template #title>{{ val.meta?.title }}</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script lang="ts" setup>
import MenuItem from '@/layout/components/menu-item/index.vue'
import {RouteRecordRaw, useRouter} from 'vue-router'
import RegularUtil from '@/utils/moudle/RegularUtils'
import {useMessage} from '@/hooks/use-message'

defineOptions({name: 'MenuItemComponent'})
const router = useRouter()
// 定义父组件传过来的值
const props = defineProps({
	// 菜单列表
	menuList: {
		type: Array,
		default: () => []
	}
})
// 获取父级菜单数据
const menuLists = computed<any>(() => {
	return props.menuList
})
/**
 * 菜单点击
 * @param subItem
 */
const handleClickMenu = async (subItem: RouteRecordRaw) => {
	if (subItem.meta?.linkStatus) {
		if (RegularUtil.isExternal(subItem.path)) {
			return window.open(subItem.path, '_blank')
		}
		const href = router.resolve({
			//使用resolve
			path: subItem.path
		})
		return window.open(href.href, '_blank')
	}
	await router.push(subItem.path).catch((err) => {
		console.error(err)
		useMessage().error('路由错误，请联系管理员!' + subItem.path)
	})
}
</script>
