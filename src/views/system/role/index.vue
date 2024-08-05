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
						<el-form-item label="角色名称" prop="roleName">
							<el-input v-model="queryParams.roleName" placeholder="请输入角色名称"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="角色编码" prop="roleCode">
							<el-input v-model="queryParams.roleCode" placeholder="请输入角色编码"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="角色状态" prop="status">
							<static-dict-select v-model="queryParams.status" :dict-list="DictRoleStatus"
							                    placeholder="请选择角色状态"/>
						</el-form-item>
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
								:disabled="state.singleStatus"
								icon="tools"
								type="primary"
								@click="handleAuthorization(null)">
							授权
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
					empty-text="无法查找到角色"
					@sort-change="handleQuery"
					@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"/>
				<el-table-column :index="createTableIndex" label="序号" type="index" width="55"/>
				<el-table-column label="角色名称" prop="roleName" min-width="200" sortable v-if="columnOption.roleName"/>
				<el-table-column label="角色编码" prop="roleCode" min-width="200" sortable v-if="columnOption.roleCode"/>
				<el-table-column label="数据权限" prop="dataScope" sortable width="120" v-if="columnOption.dataScope"/>
				<el-table-column label="角色状态" prop="status" sortable width="120" v-if="columnOption.status">
					<template #default="{row}">
						<static-dict-tag :init-value="[row.status]" :dict-list="DictRoleStatus" view/>
					</template>
				</el-table-column>
				<el-table-column label="角色排序" prop="roleSort" sortable width="120" v-if="columnOption.roleSort"/>
				<el-table-column label="角色描述" prop="roleDesc" sortable min-width="200" v-if="columnOption.roleDesc"/>
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
								icon="tools"
								link
								type="primary"
								@click="handleAuthorization(row)">
							授权
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
		<menu-authorization ref="menuAuthorizationRef" @success="handleQuery"/>
	</div>
</template>

<script lang="ts" setup>
import type AddOrUpdateRefType from '@/views/system/role/components/add-or-update.vue'
import AddOrUpdate from '@/views/system/role/components/add-or-update.vue'
import type MenuAuthorizationRefType from '@/views/system/role/components/menu-authorization.vue'
import MenuAuthorization from '@/views/system/role/components/menu-authorization.vue'
import {deleteSysRoleById, getSysRolePage} from '@/api/system/role'
import {toReactive} from '@vueuse/core'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import type {ElTable, FormInstance} from 'element-plus'
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import type {SysRoleQueryReq, SysRoleResponse} from "@/api/system/role/type";
import {DictRoleStatus, SysRoleColumnOption} from "@/api/system/role/constant";
import {useColumnOptionHooks} from "@/hooks/use-column-option";

defineOptions({name: 'SysRoleViewIndex'})
const state = reactive<BasicTableQueryOptions<SysRoleQueryReq, SysRoleResponse>>({
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
} = useTableQueryHooks<SysRoleQueryReq, SysRoleResponse>(state, getSysRolePage)
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysRoleColumnOption)
const {queryParams} = toReactive(state)

const queryFormRef = ref<FormInstance>()
const addUpdateRef = ref<InstanceType<typeof AddOrUpdateRefType>>()
const menuAuthorizationRef = ref<InstanceType<typeof MenuAuthorizationRefType>>()
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
const handleUpdate = (row: SysRoleResponse | null) => {
	addUpdateRef.value?.show(row?.id || (state.checkId as string[])[0])
}

/**
 * 删除按钮操作
 * @param row 当前行信息
 */
const handleDelete = async (row: SysRoleResponse | null) => {
	state.loadingStatus = true
	let reqIds: string[] = row?.id ? [row.id] : state.checkId || []
	await useMessageBox()
			.confirm('此操作将永久删除, 是否继续?')
			.then(async () => {
				await deleteSysRoleById(reqIds).then(async () => {
					useMessage().success('删除成功!')
					handleQuery()
				})
			})
			.finally(() => {
				state.loadingStatus = false
			})
}
/**
 * 授权
 */
const handleAuthorization = (row: SysRoleResponse | null) => {
	menuAuthorizationRef.value?.show(row || (state.checkData as SysRoleResponse[])[0])
}
onMounted(() => {
	handleQuery()
})
</script>

<style scoped></style>
