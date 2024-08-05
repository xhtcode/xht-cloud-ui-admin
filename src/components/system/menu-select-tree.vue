<template>
	<el-tree-select
			ref="menuSelectTreeRef"
			v-model="modelValue"
			:clearable="clearable"
			:data="data"
			:empty-text="`暂无菜单数据`"
			:filterable="filterable"
			:max-collapse-tags="2"
			:multiple="multiple"
			:placeholder="props.placeholder"
			:props="defaultProps"
			:show-checkbox="multiple"
			accordion
			check-on-click-node
			check-strictly
			class="user-select-display menu-select-tree"
			collapse-tags
			collapse-tags-tooltip
			node-key="id"
			@change="handleChange()"
			@contextmenu="contextmenu">
		<template #default="{ data }">
			<el-row>
				<el-col :span="12" style="text-align: left">
					<span class="menu-name">{{ data.menuName }}</span>
					<span class="menu-count">
						{{ data.children ? '(' + data.children.length + ')' : '' }}
					</span>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<svg-icon :name="data.menuIcon"/>
				</el-col>
			</el-row>
		</template>
	</el-tree-select>
</template>

<script lang="ts" setup>
import type {MenuSelectTree, MenuType} from '@/components/system/types'
import {useVModel} from '@vueuse/core'
import {getSysMenuTreeList} from "@/api/system/menu";

defineOptions({name: 'MenuSelectTreeComponent'})

interface PropsType {
	modelValue: any | null //数据绑定
	menuType?: MenuType[] //菜单类型  C菜单 F按钮 M目录
	filterable?: boolean //是否支持搜索
	multiple?: boolean //是否支持多选·并且显示check-box
	rootMenu?: boolean //是否需要顶级菜单
	clearable?: boolean //清空
	placeholder?: string //placeholder提示
}

const props = withDefaults(defineProps<PropsType>(), {
	menuType: () => [],
	filterable: false,
	multiple: false,
	rootMenu: true,
	clearable: false,
	placeholder: '请选择菜单'
})
const emits = defineEmits(['update:modelValue', 'change'])

const modelValue = useVModel(props, 'modelValue', emits)
const defaultProps = ref({
	children: 'children',
	label: 'menuName',
	disabled: function (data: MenuSelectTree) {
		return props.menuType?.indexOf(data.menuType) !== -1
	}
})
const selectTree = ref<any>()
const menuSelectTreeRef = ref<any>()
const data = ref<any[]>([])

/**
 * 选择时进行数据双向绑定
 */
const handleChange = () => {
	if (!modelValue.value) return
	if (!props.multiple) {
		let menuNode = menuSelectTreeRef.value.getNode(modelValue.value).data
		emits('change', {
			id: menuNode.id,
			menuId: menuNode.id,
			parentId: menuNode.parentId,
			menuName: menuNode.menuName,
			menuIcon: menuNode.menuIcon,
			menuType: menuNode.menuType,
			menuSort: menuNode.menuSort,
			menuPath: menuNode.menuPath
		} as MenuSelectTree)
	} else {
		let menuNodes: MenuSelectTree[] = JSON.parse(
				JSON.stringify(menuSelectTreeRef.value.getCheckedNodes())
		)
		const result: MenuSelectTree[] = []
		menuNodes.forEach((item: MenuSelectTree) => {
			result.push({
				id: item.id,
				menuId: item.id,
				parentId: item.parentId,
				menuName: item.menuName,
				menuIcon: item.menuIcon,
				menuType: item.menuType,
				menuSort: item.menuSort,
				menuPath: item.menuPath
			})
		})
		emits('change', result)
	}
}
/**
 * 查询菜单数据
 */
const handleQuery = async () => {
	await getSysMenuTreeList({notMenuType: ['B']}).then((res) => {
		if (props.rootMenu) {
			const menu = {
				id: '-1',
				menuName: '主类目',
				menuType: 'M',
				menuSort: 0,
				menuPath: '/',
				menuIcon: 'home',
				children: res.data
			}
			data.value.push(menu)
		} else {
			data.value = res.data
		}
	})
}
const clear = () => {
	nextTick(() => {
		selectTree.value = ''
		emits('update:modelValue', selectTree.value)
	})
}

const contextmenu = (event: Event) => {
	event.preventDefault()
}

onMounted(() => {
	handleQuery()
})
defineExpose({
	clear
})
</script>
<style lang="scss" scoped>
.menu-select-tree {
	width: 100%;
}

.menu-name {
	font-weight: bold;
}

.menu-count {
	padding-left: 5px;
	color: var(--el-color-info);
}
</style>
