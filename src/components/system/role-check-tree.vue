<template>
	<div class="custom-tree-container-container">
		<div class="custom-tree-container-container-filter">
			<div class="w100">
				<el-input v-model="filterText" class="w100" placeholder="请输入角色名称"/>
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
								<span class="menu-name">{{ data.roleName }}</span>
							</el-col>
							<el-col :span="12" class="menu-icon menu-count">
								{{ data.roleCode }}
							</el-col>
						</el-row>
					</template>
				</el-tree>
			</el-scrollbar>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type {ElTree} from 'element-plus'
import type {CheckedInfo} from 'element-plus/es/components/tree-v2/src/types'
import type {SysRoleResponse} from "@/api/system/role/type";
import {getSysRoleList} from "@/api/system/role";

defineOptions({ name: 'RoleCheckTreeComponent'})

const defaultProps = {
	children: 'children',
	label: 'roleName'
}
const emits = defineEmits(['changeNowNode', 'changeNode'])
const filterText = ref<string>('')
const loading = ref<boolean>(false)
const treeRef = ref<InstanceType<typeof ElTree>>()
const treeData = ref<SysRoleResponse[]>()
const queryParams = ref({})

/**
 * @param data 该节点所对应的对象
 * @param checkedInfo 树目前的选中状态对象，包含 checkedNodes 选中的节点数据、checkedKeys 选中的节点数据的id 、halfCheckedNodes 返回当前半选中的节点组成的数组、halfCheckedKeys返回目前半选中的节点的 key 所组成的数组
 */
const handleCheckChange = (data: SysRoleResponse, checkedInfo: CheckedInfo) => {
	emits('changeNowNode', data)
	emits('changeNode', checkedInfo)
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
const setCheckNode = (item: string[]) => {
	nextTick(() => {
		treeRef.value?.setCheckedKeys(item)
	})
}

/**
 * 获取表单信息
 */
const handleQuery = async () => {
	loading.value = true
	await getSysRoleList(queryParams.value).then((res) => {
		treeData.value = res.data
		loading.value = false
	})
}
onMounted(() => {
	handleQuery()
})
defineExpose({
	setCheckNode
})
</script>
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
