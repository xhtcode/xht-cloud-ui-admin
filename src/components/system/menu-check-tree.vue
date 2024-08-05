<script lang="ts" setup>
import type {ElTree} from 'element-plus'
import type {CheckedInfo} from 'element-plus/es/components/tree-v2/src/types'
import type {SysMenuResponse} from "@/api/system/menu/type";
import {getSysMenuTreeList} from "@/api/system/menu";

defineOptions({ name: 'MenuCheckTreeComponent'})

const defaultProps = {
	children: 'children',
	label: 'menuName'
}
const emits = defineEmits(['changeNode'])
const filterText = ref<string>('')
const loading = ref<boolean>(false)
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultExpandAll = ref<boolean>(false)
const treeData = ref<SysMenuResponse[]>()
const queryParams = ref({})
/**
 * 切换所有节点的展开/收起状态。
 */
const toggleRowExpansionAll = () => {
	defaultExpandAll.value = !defaultExpandAll.value
	const nodes = treeRef.value?.store._getAllNodes() || []
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].expanded = defaultExpandAll.value
	}
}

/**
 * @param data 该节点所对应的对象
 * @param checkedInfo 树目前的选中状态对象，包含 checkedNodes 选中的节点数据、checkedKeys 选中的节点数据的id 、halfCheckedNodes 返回当前半选中的节点组成的数组、halfCheckedKeys返回目前半选中的节点的 key 所组成的数组
 */
const handleCheckChange = (data: SysMenuResponse, checkedInfo: CheckedInfo) => {
	emits('changeNode', data, checkedInfo)
}
/**
 * 定义查询事件
 * @param value
 * @param data
 */
const filterNode = (value: string, data: any) => {
	if (!value) return true
	return data.menuName.includes(value) || []
}

watch(filterText, (val) => {
	treeRef.value!.filter(val)
})

const setCheckNode = async (item: string[], query?: boolean) => {
	if (query) {
		await handleQuery()
	}
	await nextTick(() => {
		const resultNode: string[] = []
		filterMenuTree(treeData.value || [], item, resultNode, item.length)
		treeRef.value?.setCheckedKeys(resultNode)
	})
	loading.value = false
}

const filterMenuTree = (
		menuTrees: SysMenuResponse[],
		menuList: string[],
		result: string[],
		count: number
) => {
	for (let menuTree of menuTrees) {
		if (menuTree.children && menuTree.children.length > 0) {
			if (menuList.includes(menuTree.id)) {
				count--
			}
			filterMenuTree(menuTree.children, menuList, result, menuTree.children.length)
		} else {
			let emp = menuList.filter((item) => item === menuTree.id)
			if (emp) {
				result.push(...emp)
				count--
			}
		}
		if (count <= 0) {
			break
		}
	}
}

/**
 * 获取表单信息
 */
const handleQuery = async () => {
	loading.value = true
	await getSysMenuTreeList(queryParams.value).then((res) => {
		treeData.value = res.data
	})
}
defineExpose({
	setCheckNode
})
</script>

<template>
	<div class="custom-tree-container-container">
		<div class="custom-tree-container-container-filter">
			<div class="custom-tree-container-container-input">
				<el-input v-model="filterText" class="w100" placeholder="请输入部门名称"/>
			</div>
			<div class="flex-1 custom-tree-container-container-icon">
				<el-icon @click="toggleRowExpansionAll">
					<ep-ArrowUpBold v-if="defaultExpandAll"/>
					<ep-ArrowDownBold v-else/>
				</el-icon>
			</div>
		</div>
		<div class="custom-tree-container-container-tree">
			<el-scrollbar class="w100">
				<el-tree
						ref="treeRef"
						v-loading="loading"
						:data="treeData"
						:default-expand-all="true"
						:filter-node-method="filterNode"
						:props="defaultProps"
						node-key="id"
						show-checkbox
						@check="handleCheckChange">
					<template #default="{ data }">
						<el-row class="w100">
							<el-col :span="12" style="text-align: left">
								<span class="menu-name">{{ data.menuName }}</span>
								<span class="menu-count">
									{{ data.children ? '(' + data.children.length + ')' : '' }}
								</span>
							</el-col>
							<el-col :span="12" class="menu-icon">
								<svg-icon :name="data.menuIcon"/>
							</el-col>
						</el-row>
					</template>
				</el-tree>
			</el-scrollbar>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.menu-select-tree {
	width: 100%;
}

.menu-count {
	padding-left: 5px;
	color: var(--el-color-info);
}

.el-row {
	border-bottom: 1px solid var(--xht-border-color);
}

.menu-icon {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
