<template>
	<div class="custom-tree-container-container">
		<div v-if="filter" class="custom-tree-container-container-filter">
			<el-input v-model="filterText" class="custom-tree-container-container-input" placeholder="请输入部门名称"
				style="flex: 4" />
		</div>
		<div class="custom-tree-container-container-tree">
			<el-scrollbar class="w100">
				<el-tree ref="treeRef" v-loading="loading" :check-strictly="checkStrictly"
					:current-node-key="modelValue" :data="treeData"
					:default-checked-keys="showCheckbox ? modelValue : []" :default-expand-all="expandAll"
					:filter-node-method="filterNode" :props="defaultProps" :show-checkbox="showCheckbox"
					highlight-current node-key="id" @check="handleCheckChange" @node-expand="handleNodeExpand"
					@node-collapse="handleNodeCollapse" @node-click="handleNodeClick" />
			</el-scrollbar>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { ElTree } from 'element-plus'
import type { CheckedInfo } from 'element-plus/es/components/tree-v2/src/types'
import { useVModel } from '@vueuse/core'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { getSysDeptTree } from "@/api/system/dept";
import type { SysDeptQueryReq, SysDeptResponse } from "@/api/system/dept/type";

defineOptions({ name: 'DeptSelectComponent' })

interface DeptSelectTreeProps {
	modelValue: any
	filter?: boolean
	expandAll?: boolean
	checkStrictly?: boolean
	showCheckbox?: boolean
}

const props = withDefaults(defineProps<DeptSelectTreeProps>(), {
	filter: false,
	expandAll: false,
	showCheckbox: false,
	checkStrictly: false
})

const defaultProps: any = {
	children: 'children',
	label: 'deptName',
	isLeaf: (node: SysDeptResponse) => {
		return !node.hashChild
	}
}

const emits = defineEmits<{
	(e: 'update:modelValue', modelValue: any): void
	(e: 'clickNode', data: SysDeptResponse): void
	(e: 'changeNode', data: SysDeptResponse, checkedInfo: CheckedInfo): void
}>()
const modelValue = useVModel(props, 'modelValue', emits)
const loading = ref<boolean>(false)
const filterText = ref<string>('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultExpandAll = ref<boolean>(false)
const treeData = ref<SysDeptResponse[]>()
const queryParams = ref<SysDeptQueryReq>({})
const loadTreeData = async (
	rootNode: Node,
	resolve: (data: SysDeptResponse[]) => void
) => {
	await getSysDeptTree({ parentId: rootNode.data.id })
		.then((res) => {
			resolve(res.data)
		})
		.catch(() => {
			resolve([])
		})
}
const changeHighlightCurrent = () => {
	treeRef.value?.setCurrentKey(undefined)
	treeRef.value?.setCheckedKeys([])
}

/**
 * 点击事件
 * @param data
 */
const handleNodeClick = (data: SysDeptResponse) => {
	emits('clickNode', data)
}

/**
 * @param data 该节点所对应的对象
 * @param checkedInfo 树目前的选中状态对象，包含 checkedNodes 选中的节点数据、checkedKeys 选中的节点数据的id 、halfCheckedNodes 返回当前半选中的节点组成的数组、halfCheckedKeys返回目前半选中的节点的 key 所组成的数组
 */
const handleCheckChange = (data: SysDeptResponse, checkedInfo: CheckedInfo) => {
	emits('changeNode', data, checkedInfo)
}
/**
 * 定义查询事件
 * @param value
 * @param data
 */
const filterNode = (value: string, data: any) => {
	if (!value) return true
	return data.deptName.includes(value) || []
}

watch(filterText, (val) => {
	treeRef.value!.filter(val)
})

const handleNodeExpand = (nodeData: SysDeptResponse) => {
	if (nodeData.parentId === '-1') {
		defaultExpandAll.value = true
	}
}
const handleNodeCollapse = (nodeData: SysDeptResponse) => {
	if (nodeData.parentId === '-1') {
		defaultExpandAll.value = false
	}
}
/**
 * 获取表单信息
 */
const handleQuery = async () => {
	loading.value = true
	await getSysDeptTree(queryParams.value).then((res) => {
		treeData.value = res.data
		loading.value = false
	})
}
onMounted(() => {
	handleQuery()
})
defineExpose({
	changeHighlightCurrent
})
</script>
