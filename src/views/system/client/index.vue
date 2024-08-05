<template>
	<div class="main-container-none">
		<el-form
				ref="queryFormRef"
				:disabled="state.loadingStatus"
				:model="queryParams"
				class="user-select-display"
				label-width="120px">
			<xht-card class="mb-10">
				<el-row v-if="state.showSearch">
					<el-col :span="8">
						<el-form-item label="客户端ID" prop="clientId">
							<el-input v-model="queryParams.clientId" clearable placeholder="请输入客户端ID"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="客户端名称" prop="clientName">
							<el-input v-model="queryParams.clientName" clearable placeholder="请输入暂无"/>
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
					<el-col :span="12">
						<el-button icon="Plus" type="primary" @click="handleAdd">增加</el-button>
						<el-button
								:disabled="state.singleStatus"
								icon="edit"

								type="success"
								@click="handleUpdate()">
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
					empty-text="无法查找到OAuth2 客户端信息"
					@sort-change="handleQuery"
					@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"/>
				<el-table-column :index="createTableIndex" label="序号" type="index" width="55"/>
				<el-table-column label="客户端ID" prop="clientId" min-width="160" v-if="columnOption.clientId"/>
				<el-table-column label="客户端名称" prop="clientName" min-width="160" v-if="columnOption.clientName"/>
				<el-table-column label="客户端密钥" prop="clientSecret" min-width="160" v-if="columnOption.clientSecret"
				                 show-overflow-tooltip/>
				<el-table-column label="授权模式" prop="authorizationGrantTypes" min-width="200"
				                 v-if="columnOption.authorizationGrantTypes">
					<template #default="{row}">
						<dict-tag
								:init-value="row.authorizationGrantTypes" view tag-class="mr-5"
								dict-code="oauth2_grant_type"/>
					</template>
				</el-table-column>
				<el-table-column label="过期时间" prop="clientSecretExpiresAt" min-width="120"
				                 v-if="columnOption.clientSecretExpiresAt"/>
				<el-table-column label="是否自动放行" prop="autoApprove" min-width="120" v-if="columnOption.autoApprove">
					<template #default="{row}">
						<static-dict-tag :init-value="[row.autoApprove]" view :dict-list="DictAutoApprove" />
					</template>
				</el-table-column>
				<el-table-column label="重定向地址" prop="redirectUris" min-width="160" v-if="columnOption.redirectUris"/>
				<el-table-column label="允许客户端请求的范围" prop="scopes" min-width="200" v-if="columnOption.scopes"/>
				<el-table-column label="token有效期" prop="accessTokenValidity" min-width="120"
				                 v-if="columnOption.accessTokenValidity"/>
				<el-table-column label="刷新令牌有效期" prop="refreshTokenValidity" min-width="120"
				                 v-if="columnOption.refreshTokenValidity"/>
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
			<xht-pagination v-model:current-page="state.queryParams.current" v-model:page-size="state.queryParams.size"
			                :page-count="state.pages!" :total="state.total" @pagination="handleQuery"/>
		</div>
		<add-or-update ref="addUpdateRef" @success="handleQuery"/>
	</div>
</template>

<script lang="ts" setup>
import AddOrUpdate from '@/views/system/client/components/add-or-update.vue'
import type {FormInstance} from 'element-plus'
import {deleteOauth2RegisteredClientById, getOauth2RegisteredClientPage} from '@/api/system/client'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import {toReactive} from '@vueuse/core'
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import type {RegisteredClientQueryReq, RegisteredClientResponse} from "@/api/system/client/type";
import {DictAutoApprove, RegisteredClientColumnOption} from "@/api/system/client/constant";
import {useColumnOptionHooks} from "@/hooks/use-column-option";

defineOptions({name: 'RegisteredClientViewIndex'})
const state = reactive<BasicTableQueryOptions<RegisteredClientQueryReq, RegisteredClientResponse>>({
	loadingStatus: false,
	queryParams: {
		descName: 'id'
	},
	tableList: []
})
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(RegisteredClientColumnOption)
const {
	tableStyle,
	createTableIndex,
	handleSelectionChange,
	handleQuery
} = useTableQueryHooks<RegisteredClientQueryReq, RegisteredClientResponse>(state, getOauth2RegisteredClientPage)
const {queryParams} = toReactive(state)

const queryFormRef = ref<FormInstance>()
const addUpdateRef = ref<any>()
const tableRef = ref<any>()


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
	addUpdateRef.value.show(null)
}

/**
 * 修改按钮操作
 * @param row 当前行信息、按钮本身信息
 */
const handleUpdate = (row?: RegisteredClientResponse) => {
	addUpdateRef.value.show(row?.id || (state.checkId as string[])[0])
}

/**
 * 删除按钮操作
 * @param row 当前行信息
 */
const handleDelete = async (row: RegisteredClientResponse | null) => {
	state.loadingStatus = true
	let reqIds: string[] = row?.id ? [row.id] : state.checkId || []
	await useMessageBox()
			.confirm(`此操作将永久删除, 是否继续?`)
			.then(async () => {
				await deleteOauth2RegisteredClientById(reqIds)
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
</script>

<style lang="scss" scoped></style>
