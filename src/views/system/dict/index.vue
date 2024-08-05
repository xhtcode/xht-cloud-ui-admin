<template>
	<div class="main-container-none">
		<el-form ref="queryFormRef" :disabled="state.loadingStatus" :model="state.queryParams"
			class="user-select-display" label-width="100px">
			<xht-card class="mb-10">
				<el-row v-if="state.showSearch">
					<el-col :span="6">
						<el-form-item label="字典类型" prop="dictType">
							<el-input v-model="state.queryParams.dictType" clearable placeholder="请输入字典类型编码" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="类型名称" prop="dictName">
							<el-input v-model="state.queryParams.dictName" clearable placeholder="请输入字典类型名称" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="类型状态" prop="dictStatus">
							<static-dict-select v-model="state.queryParams.dictStatus" :dict-list="StaticDictStatus"
								placeholder="请选择类型状态" />
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
				@rowDblclick="handleView" @sort-change="handleQuery" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column :index="createTableIndex" label="序号" type="index" width="55" />
				<el-table-column label="类型编码" prop="dictType" min-width="160" v-if="columnOption.dictType" />
				<el-table-column label="类型名称" prop="dictName" min-width="160" v-if="columnOption.dictName" />
				<el-table-column label="类型状态" prop="dictStatus" min-width="120" v-if="columnOption.dictStatus">
					<template #default="{ row }">
						<static-dict-tag :init-value="[row.dictStatus]" view :dict-list="StaticDictStatus"
							placeholder="请选择类型状态" />
					</template>
				</el-table-column>
				<el-table-column label="类型排序" prop="dictSort" min-width="120" sortable v-if="columnOption.dictSort" />
				<el-table-column label="类型备注" prop="dictDesc" min-width="220" v-if="columnOption.dictDesc" />
				<el-table-column label="创建时间" prop="createTime" min-width="160" sortable
					v-if="columnOption.createTime" />
				<el-table-column fixed="right" label="操作" width="220px">
					<template #default="{ row }">
						<div class="flex-center">
							<el-button icon="view" link type="primary" @click="handleView(row)">
								查看
							</el-button>
							<el-button icon="edit" link type="success" @click="handleUpdate(row)">
								修改
							</el-button>
							<el-button icon="delete" link type="danger" @click="handleDelete(row)">
								删除
							</el-button>
						</div>
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
import { deleteSysDictById, getSysDictPage } from "@/api/system/dict";
import type { ElTable, FormInstance } from "element-plus";
import type { SysDictQueryReq, SysDictResponse } from "@/api/system/dict/type";
import { useRouter } from "vue-router";
import AddOrUpdate from '@/views/system/dict/components/dict-add-or-update.vue'
import { useMessage, useMessageBox } from "@/hooks/use-message";
import { StaticDictStatus, SysDictColumnOption } from "@/api/system/dict/constant";
import { useColumnOptionHooks } from "@/hooks/use-column-option";

defineOptions({ name: 'SysDictViewIndex' })

const router = useRouter()
const state = reactive<BasicTableQueryOptions<SysDictQueryReq, SysDictResponse>>({
	loadingStatus: false,
	queryParams: {
		ascName: 'dictSort'
	},
	tableList: []
})
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysDictColumnOption)
const queryFormRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const { tableStyle, createTableIndex, handleSelectionChange, handleQuery } =
	useTableQueryHooks<SysDictQueryReq, SysDictResponse>(state, getSysDictPage)
const addUpdateRef = ref<any>()
/**
 * 添加按钮操作
 */
const handleAdd = () => {
	addUpdateRef.value?.show(null)
}

const handleUpdate = (row: SysDictResponse | null) => {
	addUpdateRef.value?.show(row?.id || (state.checkData!)[0])
}
const handleDelete = async (row: SysDictResponse | null) => {
	state.loadingStatus = true
	let reqIds: string[] = row?.id ? [row.id] : state.checkId || []
	await useMessageBox()
		.confirm('此操作将删除字典类型及其拥有的字典数据, 是否继续？')
		.then(async () => {
			await deleteSysDictById(reqIds).then(async () => {
				useMessage().success('删除成功!')
				handleQuery()
			})
		})
		.finally(() => {
			state.loadingStatus = false
		})
}
const handleView = async (row: SysDictResponse) => {
	await router.push({
		path: `/system/dict/item/${row.id}`,
		query: { tagName: `字典(${row.dictName})` }
	}).catch(err => {
		console.error(err)
		useMessage().error(`跳转失败，系统错误${err}`)
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
