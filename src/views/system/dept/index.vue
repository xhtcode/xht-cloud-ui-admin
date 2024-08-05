<template>
	<div class="main-container-none">
		<el-form
				ref="queryFormRef"
				:disabled="state.loadingStatus"
				:model="queryParams"
				class="user-select-display"
				label-width="100px">
			<xht-card class="mb-10">
				<el-row v-if="state.showSearch">
					<el-col :span="6">
						<el-form-item label="部门名称" prop="deptName">
							<el-input v-model="queryParams.deptName" placeholder="请输入部门名称"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="部门编码" prop="deptCode">
							<el-input v-model="queryParams.deptCode" placeholder="请输入部门编码"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="部门状态" prop="deptStatus">
							<static-dict-select v-model="queryParams.deptStatus" placeholder="请选择部门状态"
							                    :dict-list="DictDeptStatus"/>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="text-center">
						<el-button icon="Search" type="primary" @click="handleQuery()">
							查询
						</el-button>
						<el-button icon="Refresh" @click="resetForm">重置</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-button
								icon="Plus"
								type="success"
								@click="handleAdd">
							增加
						</el-button>
						<el-button icon="Sort" type="info" @click="handleExpandAll">
							折叠/展开
						</el-button>
					</el-col>
					<el-col :span="12">
						<right-tool-bar v-model:column-data="sourceColumnOption" column-status refresh-status search-status
						                v-model:show-search="state.showSearch" @refresh="handleQuery"/>
					</el-col>
				</el-row>
			</xht-card>
		</el-form>
		<div v-loading="state.loadingStatus" class="main-container-view main-container-auto">
			<el-table v-if="state.refreshTable" v-loading="state.loadingStatus" :data="state.tableList"
			          :default-expand-all="state.expandAllStatus" border
			          :header-cell-style="tableStyle.headerCellStyle"
			          :cell-style="tableStyle.cellStyle"
			          :tree-props="{ children: 'children'}" row-key="id">
				<el-table-column label="部门名称" prop="deptName" min-width="220" label-class-name="text-center"
				                 class-name="text-left"/>
				<el-table-column label="部门编码" prop="deptCode" min-width="220"/>
				<el-table-column label="部门主管" prop="deptLeader" min-width="120"/>
				<el-table-column label="联系电话" prop="deptTel" min-width="120"/>
				<el-table-column label="部门排序" prop="deptSort" width="120"/>
				<el-table-column label="部门状态" prop="deptStatus" min-width="120">
					<template #default="{row}">
						<static-dict-tag :dict-list="DictDeptStatus" :init-value="[row.deptStatus]" view/>
					</template>
				</el-table-column>
				<el-table-column label="部门描述" prop="description" min-width="220"
				                 v-if="columnOption.description"/>
				<el-table-column label="创建时间" prop="createTime" min-width="160" v-if="columnOption.createTime"/>
				<el-table-column fixed="right"
				                 label="操作"
				                 width="220px">
					<template #default="{ row }">
						<el-button
								icon="edit"
								link
								type="success"
								@click="handleUpdate(row)">
							修改
						</el-button>
						<el-button
								icon="delete"
								link
								type="danger"
								@click="handleDelete(row)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<add-or-update ref="addUpdateRef" @success="handleQuery"/>
	</div>
</template>

<script lang="ts" setup>
import AddOrUpdate from '@/views/system/dept/components/add-or-update.vue'
import AddOrUpdateRefType from '@/views/system/dept/components/add-or-update.vue'
import {deleteSysDeptById, getSysDeptTree} from '@/api/system/dept'
import {toReactive} from '@vueuse/core'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import type {ElTable, FormInstance} from 'element-plus'
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import type {SysDeptQueryReq, SysDeptResponse} from "@/api/system/dept/type";
import {DictDeptStatus, SysDeptColumnOption} from "@/api/system/dept/constant";
import {useColumnOptionHooks} from "@/hooks/use-column-option";

defineOptions({name: 'SysDeptViewIndex'})

type AddOrUpdateInstance = InstanceType<typeof AddOrUpdateRefType>
const queryFormRef = ref<FormInstance>()
const addUpdateRef = ref<AddOrUpdateInstance>()
const state = reactive<BasicTableQueryOptions<SysDeptQueryReq, SysDeptResponse>>({
	loadingStatus: false,
	pageStatus: false,
	queryParams: {},
	tableList: []
})
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysDeptColumnOption)
const {
	tableStyle,
	handleQuery
} = useTableQueryHooks<SysDeptQueryReq, SysDeptResponse>(state, getSysDeptTree)
const {queryParams} = toReactive(state)


/**
 * 打开增加弹出框
 */
const handleAdd = () => {
	nextTick(() => {
		addUpdateRef.value?.show(null)
	})
}

/**
 * 打开修改弹出框
 * @param row
 */
const handleUpdate = (row: SysDeptResponse) => {
	nextTick(() => {
		addUpdateRef.value?.show(row.id || (state.checkId as string[])[0])
	})
}

/**
 * 删除按钮操作
 * @param row 当前行信息、按钮本身信息
 */
const handleDelete = async (row: SysDeptResponse) => {
	state.loadingStatus = true
	let reqIds: string[] = row.id ? [row.id] : state.checkId || []
	await useMessageBox()
			.confirm('此操作将永久删除, 是否继续?')
			.then(async () => {
				await deleteSysDeptById(reqIds).then(async () => {
					useMessage().success('删除成功!')
					handleQuery()
				})
			})
			.finally(() => {
				state.loadingStatus = false
			})
}

/**
 * 菜单折叠
 */
const handleExpandAll = () => {
	state.refreshTable = false
	state.expandAllStatus = !state.expandAllStatus
	nextTick(() => {
		state.refreshTable = true
	})
}

/**
 * 懒加载表格数据
 */
const loadTableList = async (
		row?: SysDeptResponse,
		_treeNode?: unknown,
		resolve?: (date: SysDeptResponse[]) => void,
		reject?: () => void
) => {
	state.loadingStatus = true
	await getSysDeptTree({parentId: row?.id || '-1'})
			.then((res) => {
				state.expandAllStatus = false
				resolve!(res.data)
			})
			.catch(() => {
				reject!()
			})
			.finally(() => {
				state.loadingStatus = false
			})
}
/**
 * 表单重置
 */
const resetForm = () => {
	queryFormRef.value?.resetFields()
	handleQuery()
}

onMounted(() => {
	handleQuery()
})
</script>
