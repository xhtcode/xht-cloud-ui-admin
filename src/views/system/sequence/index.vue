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
					<el-col :span="8">
						<el-form-item label="序列编码" prop="seqCode">
							<el-input v-model="queryParams.seqCode" clearable placeholder="请输入序列编码"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="序列名称" prop="seqName">
							<el-input v-model="queryParams.seqName" clearable placeholder="请输入序列名称"/>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="重置更新" prop="seqLoop">
							<static-dict-select v-model="queryParams.seqLoop" :dict-list="DictSeqLoop"
							                    placeholder="请选择是否循环更新"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="state.showSearch">
					<el-col :span="8">
						<el-form-item label="重置周期" prop="resetFlag">
							<static-dict-select v-model="queryParams.resetFlag" :dict-list="DictResetFlag"
							                    placeholder="请选择重置周期"/>
						</el-form-item>
					</el-col>
					<el-col :span="8" :offset="8" class="text-center">
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
					empty-text="无法查找到序列管理"
					@sort-change="handleQuery"
					@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"/>
				<el-table-column :index="createTableIndex" label="序号" type="index" width="55"/>
				<el-table-column label="序列编码" prop="seqCode" sortable min-width="200" v-if="columnOption.seqCode"/>
				<el-table-column label="序列名称" prop="seqName" sortable min-width="200" v-if="columnOption.seqName"/>
				<el-table-column label="当前值" prop="currentValue" sortable min-width="100" v-if="columnOption.currentValue"/>
				<el-table-column label="步进值" prop="stepValue" sortable min-width="100" v-if="columnOption.stepValue"/>
				<el-table-column label="最小值" prop="minValue" sortable min-width="100" v-if="columnOption.minValue"/>
				<el-table-column label="最大值" prop="maxValue" sortable min-width="100" v-if="columnOption.maxValue"/>
				<el-table-column label="循环" prop="seqLoop" sortable v-if="columnOption.seqLoop">
					<template #default="{row}">
						<static-dict-tag :init-value="[row.seqLoop]" :dict-list="DictSeqLoop" view/>
					</template>
				</el-table-column>
				<el-table-column label="重置周期" prop="resetFlag" sortable min-width="200" v-if="columnOption.resetFlag">
					<template #default="{row}">
						<static-dict-tag :init-value="[row.resetFlag]" :dict-list="DictResetFlag" view/>
					</template>
				</el-table-column>
				<el-table-column label="序列格式" prop="seqFormat" sortable min-width="200" v-if="columnOption.seqFormat"/>
				<el-table-column label="描述" prop="seqDesc" sortable min-width="200" v-if="columnOption.seqDesc"/>
				<el-table-column fixed="right"
				                 label="操作"
				                 width="220px">
					<template #default="{ row }">
						<el-button
								icon="CircleCheckFilled"
								link
								type="primary"
								@click="handleGenerate(row)">
							测试
						</el-button>
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

<script lang="ts" setup>
import AddOrUpdate from '@/views/system/sequence/components/add-or-update.vue'
import type {FormInstance} from 'element-plus'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import {toReactive} from '@vueuse/core'
import type {AxiosResponse} from 'axios'
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import {deleteSysSequenceById, generateSysSequence, getSysSequencePage} from "@/api/system/sequence";
import type {SysSequenceQueryReq, SysSequenceResponse} from "@/api/system/sequence/type";
import {DictResetFlag, DictSeqLoop, SysSequenceColumnOption} from "@/api/system/sequence/constant";
import {useColumnOptionHooks} from "@/hooks/use-column-option";

defineOptions({name: 'SysSequenceViewIndex'})
const state = reactive<BasicTableQueryOptions<SysSequenceQueryReq, SysSequenceResponse>>({
	loadingStatus: false,
	queryParams: {
		descName: 'id'
	},
	tableList: []
})
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysSequenceColumnOption)
const {
	tableStyle,
	createTableIndex,
	handleSelectionChange,
	handleQuery
} = useTableQueryHooks<SysSequenceQueryReq, SysSequenceResponse>(state, getSysSequencePage)
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
 * 序列生成
 */
const handleGenerate = (row: SysSequenceResponse) => {
	generateSysSequence(row.seqCode, 1003, 10).then((res: AxiosResponse<string[]>) => {
		const data: string[] = res.data
		let str = ''
		for (let i = 0; i < data.length; i++) {
			str += `<div class="user-select-none flex text-right"><strong style="width: 22px; display: block">${
					i + 1
			}:</strong><span class="ml-5">${data[i]}</span></div>`
		}
		ElMessageBox.alert(str, '序列测试', {
			dangerouslyUseHTMLString: true
		})
	})
}
/**
 * 修改按钮操作
 * @param row 当前行信息、按钮本身信息
 */
const handleUpdate = (row?: SysSequenceResponse) => {
	addUpdateRef.value.show(row?.id || (state.checkId as string[])[0])
}

/**
 * 删除按钮操作
 * @param row 当前行信息
 */
const handleDelete = async (row: SysSequenceResponse | null) => {
	state.loadingStatus = true
	let reqIds: string[] = row?.id ? [row.id] : state.checkId || []
	await useMessageBox()
			.confirm(`此操作将永久删除, 是否继续?`)
			.then(async () => {
				await deleteSysSequenceById(reqIds)
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
