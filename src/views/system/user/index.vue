<template>
	<div class="main-container-none flex-direction-row">
		<xht-card body-height="100vh" class="flex-1">
			<dept-tree
					ref="deptTreeRef"
					v-model="state.queryParams.deptId"
					class="h100 p-10"
					filter
					@click-node="handleDeptClick"/>
		</xht-card>
		<div style="width: 1%"></div>
		<div class="flex-4 main-container-auto main-container-view">
			<el-form
					ref="queryFormRef"
					:disabled="state.loadingStatus"
					:model="state.queryParams"
					class="user-select-display"
					label-width="120px"
			>
				<xht-card class="mb-10">
					<el-row v-if="state.showSearch">
						<el-col :span="8">
							<el-form-item label="用户账号" prop="userAccount">
								<el-input v-model="state.queryParams.userAccount" placeholder="请输入用户账号"/>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="用户名称" prop="userName">
								<el-input v-model="state.queryParams.userName" placeholder="请输入用户名称"/>
							</el-form-item>
						</el-col>
						<el-col :span="8" class="flex-center">
							<el-form-item>
								<el-button icon="Search" type="primary" @click="handleQuery()">
									查询
								</el-button>
								<el-button icon="Refresh" @click="resetQuery">重置</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="激活状态" prop="userStatus">
								<el-select
										v-model="state.queryParams.userStatus"
										class="w100"
										placeholder="请选择激活状态">
									<el-option label="激活" value="1"/>
									<el-option label="未激活" value="0"/>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="用户类型" prop="userType">
								<el-select v-model="state.queryParams.userType" placeholder="请选择用户类型">
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8" class="text-center">
							<el-form-item>
								<el-button icon="Search" type="primary" @click="handleQuery()">
									查询
								</el-button>
								<el-button icon="Refresh" @click="resetQuery">重置</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="16">
							<el-button icon="Plus" type="primary" @click="handleAdd">
								增加
							</el-button>
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
									:disabled="state.singleStatus"
									icon="tools"
									type="warning"
									@click="handleResetPassword(null)">
								密码重置
							</el-button>
							<el-button
									:disabled="state.multipleStatus"
									icon="delete"
									type="danger"
									@click="handleDelete(null)">
								删除
							</el-button>
						</el-col>
						<el-col :span="8">
							<right-tool-bar v-model:column-data="sourceColumnOption" column-status refresh-status search-status
							                v-model:show-search="state.showSearch" @refresh="handleQuery"/>
						</el-col>
					</el-row>
				</xht-card>
			</el-form>
			<el-table
					ref="tableRef"
					v-loading="state.loadingStatus"
					:cell-style="tableStyle.cellStyle"
					:data="state.tableList"
					:header-cell-style="tableStyle.headerCellStyle"
					border
					empty-text="无法查找到用户"
					@sort-change="handleQuery"
					@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"/>
				<el-table-column :index="createTableIndex" label="序号" type="index" width="55"/>
				<el-table-column label="用户账号" prop="userAccount" sortable v-if="columnOption.userAccount"/>
				<el-table-column label="用户名称" prop="userName" sortable v-if="columnOption.userName"/>
				<el-table-column label="账号类型" prop="userType" sortable width="120" v-if="columnOption.userType"/>
				<el-table-column label="用户状态" prop="userStatus" sortable width="120" v-if="columnOption.userStatus"/>
				<el-table-column label="管理员" prop="adminStatus" sortable width="120" v-if="columnOption.adminStatus"/>
				<el-table-column label="注册时间" prop="registeredTime" sortable width="155"
				                 v-if="columnOption.registeredTime"/>
				<el-table-column
						fixed="right"
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
					v-model:current-page="state.queryParams.current"
					v-model:page-size="state.queryParams.size"
					:page-count="state.pages"
					:total="state.total"
					@pagination="handleQuery"/>
		</div>
		<add-or-update ref="addUpdateRef" @success="saveUpdateSuccess"/>
		<role-authorization ref="roleAuthorizationRef" @success="handleQuery"/>
	</div>
</template>

<script lang="ts" setup>
import type AddOrUpdateRefType from '@/views/system/user/components/add-or-update.vue'
import AddOrUpdate from '@/views/system/user/components/add-or-update.vue'
import type RoleAuthorizationRefType from '@/views/system/user/components/role-authorization.vue'
import RoleAuthorization from '@/views/system/user/components/role-authorization.vue'
import {deleteSysUserById, getSysUserPage, resetUserPassword} from '@/api/system/user'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import type {FormInstance} from 'element-plus'
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import type {SysUserQueryReq, SysUserResponse} from "@/api/system/user/type";
import type {SysDeptResponse} from "@/api/system/dept/type";
import {SysUserColumnOption} from "@/api/system/user/constant";
import {useColumnOptionHooks} from "@/hooks/use-column-option";

defineOptions({name: 'SysUserViewIndex'})

const queryFormRef = ref<FormInstance>()
const addUpdateRef = ref<InstanceType<typeof AddOrUpdateRefType>>()
const roleAuthorizationRef = ref<InstanceType<typeof RoleAuthorizationRefType>>()
const deptTreeRef = ref<any>()
const tableRef = ref<InstanceType<any>>()
const state = reactive<BasicTableQueryOptions<SysUserQueryReq, SysUserResponse>>({
	loadingStatus: false,
	queryParams: {
		descName: 'id'
	},
	tableList: []
})
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysUserColumnOption)
const {
	tableStyle,
	createTableIndex,
	handleSelectionChange,
	handleQuery
} = useTableQueryHooks<SysUserQueryReq, SysUserResponse>(state, getSysUserPage)

/**
 * 部门点击
 */
const handleDeptClick = (data: SysDeptResponse) => {
	state.queryParams.deptId = data.id
	handleQuery()
}
/**
 * 重置表单
 */
const resetQuery = () => {
	queryFormRef.value?.resetFields()
	tableRef.value?.clearSort()
	state.queryParams.ascName = ''
	state.queryParams.descName = ''
	state.queryParams.deptId = ''
	deptTreeRef.value?.changeHighlightCurrent()
	handleQuery()
}
const saveUpdateSuccess = async (name?: string) => {
	queryFormRef.value?.resetFields()
	tableRef.value?.clearSort()
	state.queryParams.ascName = ''
	state.queryParams.descName = ''
	state.queryParams.deptId = ''
	state.queryParams.userAccount = name
	deptTreeRef.value?.changeHighlightCurrent()
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
const handleUpdate = (row: SysUserResponse | null) => {
	addUpdateRef.value?.show(row?.id || (state.ids as string[])[0])
}

/**
 * 删除按钮操作
 * @param row 当前行信息
 */
const handleDelete = async (row: SysUserResponse | null) => {
	state.loadingStatus = true
	let reqIds: string[] = row?.id ? [row.id] : state.ids || []
	await useMessageBox()
			.confirm(`此操作将永久删除, 是否继续?`)
			.then(async () => {
				await deleteSysUserById(reqIds)
						.then(async () => {
							handleQuery()
							useMessage().success('删除成功!')
						})
						.finally(() => {
							state.loadingStatus = false
						})
			})
			.catch(() => {
				state.loadingStatus = false
			})
}
/**
 * 授权
 */
const handleAuthorization = (row: SysUserResponse | null) => {
	roleAuthorizationRef.value?.show(row || (state.checkData || [])[0])
}
/**
 * 重置密码
 */
const handleResetPassword = (row: SysUserResponse | null) => {
	state.loadingStatus = true
	const userId = row?.id || (state.checkId as string[])[0]
	useMessageBox()
			.confirm('此操作将重置当前账号的登录密码, 是否继续?')
			.then(async () => {
				await resetUserPassword(userId)
						.then(async (res) => {
							await saveUpdateSuccess(res.data)
							useMessage().success('密码重置成功!')
						})
						.finally(() => {
							state.loadingStatus = false
						})
			})
			.catch(() => {
				state.loadingStatus = false
			})
}
</script>
<style lang="scss" scoped></style>
