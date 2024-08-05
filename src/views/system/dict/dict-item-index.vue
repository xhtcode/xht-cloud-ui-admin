<template>
	<div class="main-container-none">
		<el-form ref="queryFormRef" :disabled="state.loadingStatus" :model="state.queryParams"
			class="user-select-display" label-width="120px">
			<xht-card class="mb-10" :tool="state.showSearch">
				<template #header>
					<el-descriptions :column="2" border class="el-descriptions-title-center" title="字典项信息">
						<el-descriptions-item align="center" label="类型编码" label-align="right" width="30px">
							dictType
						</el-descriptions-item>
						<el-descriptions-item align="center" label="类型名称" label-align="right" width="30px">
							dictName
						</el-descriptions-item>
						<el-descriptions-item align="center" label="字典备注" label-align="right" width="30px">
							dictDesc
						</el-descriptions-item>
					</el-descriptions>
				</template>
				<el-row v-if="state.showSearch">
					<el-col :span="8">
						<el-form-item label="数据编码" prop="dictCode">
							<el-input v-model="state.queryParams.dictCode" placeholder="请输入字典数据编码" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="字典状态" prop="status">
							<static-dict-select v-model="state.queryParams.status" :dict-list="StaticDictStatus"
								placeholder="请选择字典状态" />
						</el-form-item>
					</el-col>
					<el-col :span="8" class="text-center">
						<el-button icon="Search" type="primary" @click="handleQuery()">
							查询
						</el-button>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-button icon="Plus" type="primary" @click="handleAdd">
							增加
						</el-button>
						<el-button :disabled="state.singleStatus" icon="edit" type="success"
							@click="handleUpdate(null)">
							修改
						</el-button>
						<el-button :disabled="state.multipleStatus" icon="delete" type="danger"
							@click="handleDelete(null)">
							删除
						</el-button>
					</el-col>
					<el-col :span="12">
						<right-tool-bar v-model:column-data="sourceColumnOption" column-status refresh-status
							search-status v-model:show-search="state.showSearch" @refresh="handleQuery" />
					</el-col>
				</el-row>
			</xht-card>
		</el-form>
		<div class="main-container-auto main-container-view">
			<el-table ref="tableRef" v-loading="state.loadingStatus" :cell-style="tableStyle.cellStyle"
				:data="state.tableList" :header-cell-style="tableStyle.headerCellStyle" border empty-text="无法查找到字典"
				@sort-change="handleQuery" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column :index="createTableIndex" label="序号" type="index" width="55" />
				<el-table-column align="center" label="字典编码" prop="dictCode" v-if="columnOption.dictCode" />
				<el-table-column align="center" label="字典数据" prop="dictValue" v-if="columnOption.dictValue" />
				<el-table-column align="center" label="字典状态" prop="dictStatus" sortable v-if="columnOption.dictStatus">
					<template #default="{ row }">
						<static-dict-tag :init-value="[row.dictStatus]" view :dict-list="StaticDictStatus"
							placeholder="请选择类型状态" />
					</template>
				</el-table-column>
				<el-table-column align="center" label="字典排序" prop="dictSort" v-if="columnOption.dictSort" />
				<el-table-column label="字典描述" prop="dictDesc" v-if="columnOption.dictDesc" />
				<el-table-column label="创建时间" prop="createTime" v-if="columnOption.createTime" sortable />
				<el-table-column label="操作" width="220">
					<template #default="{ row }">
						<el-button icon="edit" link type="success" @click="handleUpdate(row)">
							修改
						</el-button>
						<el-button icon="delete" link type="danger" @click="handleDelete(row)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<xht-pagination v-model:current-page="state.queryParams.current" v-model:page-size="state.queryParams.size"
				:page-count="state.pages!" :total="state.total" @pagination="handleQuery" />
		</div>
		<add-or-update ref="addUpdateRef" @success="handleQuery" />
	</div>
</template>

<script lang="ts" setup>
import { useTableQueryHooks } from "@/hooks/use-crud-hooks";
import AddOrUpdate from '@/views/system/dict/components/item-add-or-update.vue'
import type { SysDictItemQueryReq, SysDictItemResponse, SysDictResponse } from "@/api/system/dict/type";
import { deleteSysDictItemById, getSysDictItemPage } from "@/api/system/dict";
import { useRoute } from "vue-router";
import type { ElTable, FormInstance } from "element-plus";
import { useMessage, useMessageBox } from "@/hooks/use-message";
import { StaticDictStatus, SysDictItemColumnOption } from "@/api/system/dict/constant";
import { useColumnOptionHooks } from "@/hooks/use-column-option";

defineOptions({ name: 'SysDictItemViewIndex' })

interface StateType extends BasicTableQueryOptions<SysDictItemQueryReq, SysDictItemResponse> {
	dictInfo: SysDictResponse[]
}

const route = useRoute()
const queryFormRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const state = reactive<StateType>({
	loadingStatus: false,
	queryParams: {
		ascName: 'dictSort'
	},
	tableList: [],
	dictInfo: []
})
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysDictItemColumnOption)
const handleGetSysDictItemPage = (data: SysDictItemQueryReq) => {
	state.queryParams.dictId = route.params?.id as string
	return getSysDictItemPage(data)
}
const addUpdateRef = ref<any>()
const {
	tableStyle,
	createTableIndex,
	handleSelectionChange,
	handleQuery
} = useTableQueryHooks<SysDictItemQueryReq, SysDictItemResponse>(state, handleGetSysDictItemPage)

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
const handleUpdate = (row: SysDictItemResponse | null) => {
	addUpdateRef.value?.show(row?.id || (state.checkData!)[0])
}

/**
 * 删除按钮操作
 * @param row 当前行信息
 */
const handleDelete = async (row: SysDictItemResponse | null) => {
	state.loadingStatus = true
	let reqIds: string[] = row?.id ? [row.id] : state.checkId || []
	await useMessageBox()
		.confirm('此操作将永久删除, 是否继续?')
		.then(async () => {
			await deleteSysDictItemById(reqIds).then(async () => {
				useMessage().success('删除成功!')
				handleQuery()
			})
		})
		.finally(() => {
			state.loadingStatus = false
		})
}
/**
 * 重置表单
 */
const resetQuery = () => {
	queryFormRef.value?.resetFields()
	tableRef.value?.clearSort()
	state.queryParams.ascName = 'dictSort'
	state.queryParams.descName = ''
	handleQuery()
}
</script>

<style lang="scss" scoped></style>
