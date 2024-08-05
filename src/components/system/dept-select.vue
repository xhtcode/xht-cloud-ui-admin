<template>
	<el-tree-select
			ref="DeptSelectTreeRef"
			v-model="modelValue"
			:accordion="accordion"
			:clearable="clearable"
			:data="data"
			:empty-text="`暂无部门数据`"
			:filterable="filterable"
			:max-collapse-tags="maxCollapseTags"
			:multiple="multiple"
			:placeholder="props.placeholder"
			:props="defaultProps"
			:show-checkbox="multiple"
			check-on-click-node
			check-strictly
			class="menu-select-tree"
			collapse-tags
			collapse-tags-tooltip
			node-key="id"
			@change="handleChange()"
			@contextmenu="contextmenu">
		<template #default="{ data }">
			<el-row>
				<el-col :span="12" style="text-align: left">
					<span class="menu-name">
						{{ data.deptName }}{{ data.deptLeader ? '（' + data.deptLeader + '）' : '' }}
					</span>
					<span class="menu-count">
						{{ data.children ? '(' + data.children.length + ')' : '' }}
					</span>
				</el-col>
				<el-col :span="12" style="text-align: right">
					({{ data.deptTel ? data.deptTel : '暂无联系电话' }})
				</el-col>
			</el-row>
		</template>
	</el-tree-select>
</template>

<script lang="ts" setup>
import {nextTick, ref} from 'vue'
import type {DeptSelectProps, DeptSelectTree} from '@/components/system/types'
import {useVModel} from '@vueuse/core'
import {getSysDeptTree} from "@/api/system/dept";

defineOptions({ name: 'DeptSelectTreeComponent'})

const props = withDefaults(defineProps<DeptSelectProps>(), {
	filterable: false,
	multiple: false,
	rootMenu: true,
	clearable: false,
	placeholder: '请选择部门',
	maxCollapseTags: 1
})
const emits = defineEmits(['update:modelValue', 'change'])

const modelValue = useVModel(props, 'modelValue', emits)
const defaultProps = ref({
	children: 'children',
	label: 'deptName'
})
const selectTree = ref<any>()
const DeptSelectTreeRef = ref<any>()
const data = ref<any[]>([])

/**
 * 选择时进行数据双向绑定
 */
const handleChange = () => {
	if (!modelValue.value) return
	if (!props.multiple) {
		let dataNode = DeptSelectTreeRef.value.getNode(modelValue.value).data
		emits('change', {
			id: dataNode.id,
			parentId: dataNode.parentId,
			deptName: dataNode.deptName,
			deptStatus: dataNode.deptStatus,
			deptLeader: dataNode.deptLeader,
			deptTel: dataNode.deptTel,
		} as DeptSelectTree)
	} else {
		let dataNodes: DeptSelectTree[] = JSON.parse(
				JSON.stringify(DeptSelectTreeRef.value.getCheckedNodes())
		)
		const result: DeptSelectTree[] = []
		dataNodes.forEach((item: DeptSelectTree) => {
			result.push({
				id: item.id,
				parentId: item.parentId,
				deptName: item.deptName,
				deptStatus: item.deptStatus,
				deptLeader: item.deptLeader,
				deptTel: item.deptTel,
			})
		})
		emits('change', result)
	}
}
/**
 * 查询部门 Dept数据
 */
const handleQuery = async () => {
	await getSysDeptTree({}).then((res) => {
		if (props.rootMenu) {
			const parentNode = {
				id: '-1',
				deptName: '顶级部门',
				deptStatus: '1',
				children: res.data
			}
			data.value.push(parentNode)
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
