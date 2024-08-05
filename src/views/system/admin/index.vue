<template>
	<div class="main-container-none">
		<el-form
				ref="queryFormRef"
				:disabled="state.loadingStatus"
				:model="queryParams"
				class="user-select-display"
				label-width="100px"
		>
			<xht-card class="mb-10">
				<el-row v-if="state.showSearch">
					<el-col :span="6">
						<el-form-item label="用户账号" prop="userName">
							<el-input v-model="queryParams.userName" placeholder="请输入用户账号"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="手机号码" prop="contactPhone">
							<el-input v-model="queryParams.contactPhone" placeholder="请输入手机号码"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
					</el-col>
					<el-col :span="6" class="text-center">
						<el-button icon="Search" type="primary" @click="handleQuery()">
							查询
						</el-button>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-button icon="Plus" type="primary" @click="handleAdd">增加</el-button>
						<el-button
								:disabled="state.singleStatus"
								icon="edit"
								type="success"
								@click="handleUpdate(null)">
							修改
						</el-button>
						<el-button
								:disabled="state.multipleStatus"
								icon="delete"
								type="danger"
								@click="handleDelete(null)">
							删除
						</el-button>
					</el-col>
					<el-col :span="12">
						<right-tool-bar v-model:column-data="sourceColumnOption" column-status refresh-status search-status
						                v-model:show-search="state.showSearch" @refresh="handleQuery"/>
					</el-col>
				</el-row>
			</xht-card>
		</el-form>
		<div class="main-container-view main-container-auto">
			<el-table
					ref="tableRef"
					v-loading="state.loadingStatus"
					:cell-style="tableStyle.cellStyle"
					:data="state.tableList"
					:header-cell-style="tableStyle.headerCellStyle"
					border
					empty-text="无法查找到管理员"
					@sort-change="handleQuery"
					@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"/>
				<el-table-column :index="createTableIndex" label="序号" type="index" width="55"/>
				<el-table-column label="用户账号" prop="userName" min-width="120" sortable v-if="columnOption.userName"/>
				<el-table-column label="头像地址" prop="userAvatar" sortable min-width="120" v-if="columnOption.userAvatar"/>
				<el-table-column label="手机号码" prop="contactPhone" sortable min-width="120"
				                 v-if="columnOption.contactPhone"/>
				<el-table-column label="创建时间" prop="createTime" sortable min-width="200" v-if="columnOption.createTime"/>
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
			<xht-pagination
					v-model:current-page="queryParams.current"
					v-model:page-size="queryParams.size"
					:page-count="state.pages"
					:total="state.total"
					@pagination="handleQuery"/>
		</div>
		<add-or-update ref="addUpdateRef" @success="handleQuery"/>
	</div>
</template>

<script setup lang="ts">
import type {SysAdminQueryReq, SysAdminResponse} from "@/api/system/admin/type";
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import {deleteSysAdminById, getSysAdminPage} from "@/api/system/admin";
import {useColumnOptionHooks} from "@/hooks/use-column-option";
import {SysAdminColumnOption} from "@/api/system/admin/constant";
import {toReactive} from "@vueuse/core";
import type {ElTable, FormInstance} from "element-plus";
import type AddOrUpdateRefType from "@/views/system/admin/components/add-or-update.vue";
import AddOrUpdate from "@/views/system/admin/components/add-or-update.vue";
import {useMessage, useMessageBox} from "@/hooks/use-message";

defineOptions({name: 'SysAdminViewIndex'})
const state = reactive<BasicTableQueryOptions<SysAdminQueryReq, SysAdminResponse>>({
	loadingStatus: false,
	queryParams: {
		descName: 'id'
	},
	tableList: []
})
const {
	tableStyle,
	createTableIndex,
	handleSelectionChange,
	handleQuery
} = useTableQueryHooks<SysAdminQueryReq, SysAdminResponse>(state, getSysAdminPage)
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysAdminColumnOption)
const {queryParams} = toReactive(state)

const queryFormRef = ref<FormInstance>()
const addUpdateRef = ref<InstanceType<typeof AddOrUpdateRefType>>()
const tableRef = ref<InstanceType<typeof ElTable>>()


/**
 * 重置表单
 */
const resetQuery = () => {
	queryFormRef.value?.resetFields()
	tableRef.value?.clearSort()
	queryParams.ascName = ''
	queryParams.descName = ''
	handleQuery()
}


/**
 * 添加按钮操作
 */
const handleAdd = () => {
	addUpdateRef.value?.show(null)
}

/**
 * 修改按钮操作
 * @param row 当前行信息、按钮本身信息
 */
const handleUpdate = (row: SysAdminResponse | null) => {
	addUpdateRef.value?.show(row?.id || (state.checkId as number[])[0])
}

/**
 * 删除按钮操作
 * @param row 当前行信息
 */
const handleDelete = async (row: SysAdminResponse | null) => {
	state.loadingStatus = true
	let reqIds: number[] = row?.id ? [row.id] : state.checkId || []
	await useMessageBox()
			.confirm('此操作将永久删除, 是否继续?')
			.then(async () => {
				await deleteSysAdminById(reqIds).then(async () => {
					useMessage().success(`删除管理员${row?.userName}成功!`)
					handleQuery()
				})
			})
			.finally(() => {
				state.loadingStatus = false
			})
}
</script>

<style lang="scss" scoped></style>
