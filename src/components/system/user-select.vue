<template>
	<el-dialog
			v-model="pageInit.showSearch"
			:before-close="close"
			:close-on-click-modal="false"
			:title="props.title"
			:width="deptShowWidth"
			align-center
			append-to-body
			class="dept-user">
		<template #header>
			<div @click="deptShow = !deptShow">
				<el-text size="large">{{ props.title }}</el-text>
				<el-text class="ml-5" size="small" type="info">
					已选中({{ pageInit.checkData?.length || 0 }}/{{ maxSize }})
				</el-text>
			</div>
		</template>
		<div class="user-select-container">
			<div v-if="deptShow" class="user-select-dept user-select-item">
				<dept-tree
						ref="deptTreeRef"
						v-model="deptId"
						class="h100"
						filter
						@click-node="handleDeptClick"/>
			</div>
			<div class="user-select-main user-select-item">
				<el-table
						ref="tableRef"
						:cell-style="{'text-align': 'center'}"
						:header-cell-style="{
            textAlign: 'center',
            background: 'var(--el-table-row-hover-bg-color)',
            color: 'var(--el-text-color-primary)',
            userSelect: 'none'
        }"
						v-loading="pageInit.loadingStatus"
						:data="tableList"
						border
						empty-text="无法查找到用户"
						height="100%"
						@select="handleSelectionChange"
						@select-all="handleSelectionChange"
						@sort-change="handleQuery">
					<el-table-column>
						<template #header>
							<div class="el-table-user-select">
								<el-form
										ref="queryFormRef"
										:inline="true"
										:model="queryParams"
										class="user-select-display">
									<el-row>
										<el-col :span="12">
											<el-form-item label="用户账号" prop="userAccount">
												<el-input v-model="queryParams.userAccount" placeholder="请输入用户账号"/>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="用户名称" prop="userName">
												<el-input v-model="queryParams.userName" placeholder="请输入用户名称"/>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="12">
											<el-form-item label="账号类型" prop="userType">
												<el-input v-model="queryParams.userType" placeholder="请选择账号类型"/>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item>
												<el-button icon="Search" size="small" type="primary" @click="handleQuery()">
													查询
												</el-button>
												<el-button icon="Refresh" size="small" @click="resetQuery">重置</el-button>
												<el-button
														v-if="(pageInit.checkData || []).length > 0"
														icon="Refresh"
														size="small"
														type="warning"
														@click="restCheck">
													全部清楚
												</el-button>
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</div>
						</template>
						<el-table-column type="selection" width="55"/>
						<el-table-column label="用户账号" prop="userAccount"/>
						<el-table-column label="用户昵称" prop="userName"/>
					</el-table-column>
				</el-table>
			</div>
			<div class="user-select-view user-select-item">
				<el-empty v-if="(pageInit.checkData?.length || 0) < 1" description="请选择用户"/>
				<div v-for="(tag,index) in pageInit.checkData" :key="tag.id">
					<el-tag
							:type="tagsTypes[index %4]"
							class="mt-5 w100"
							closable
							size="large"
							@close="handleTagClose(tag)">
						{{ tag.userName }}({{ tag.userAccount }})
					</el-tag>
				</div>
			</div>
		</div>
		<xht-pagination
				v-model:current-page="queryParams.current"
				v-model:page-size="queryParams.size"
				:page-count="pageInit.pages"
				:total="pageInit.total"
				@pagination="handleQuery"/>
		<template #footer>
			<el-button :disabled="pageInit.loadingStatus" type="primary" @click="submitForm">确定</el-button>
			<el-button @click="close">取 消</el-button>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import {toReactive} from '@vueuse/core'
import type {ElTable, FormInstance} from 'element-plus'
import {useMessage} from '@/hooks/use-message'
import type DeptTree from '@/components/Select/DeptTree.vue'
import type {SysUserQueryReq, SysUserResponse} from "@/api/system/user/type";
import {getSysUserPage} from "@/api/system/user";
import {pageParams} from "@/utils/moudle/element";
import type {SysDeptResponse} from "@/api/system/dept/type";

defineOptions({name: 'UserSelectComponent'})

const props = defineProps({
	title: {
		type: String,
		default: '人员配置',
		require: false
	},
	maxSize: {
		type: Number,
		default: 1,
		require: false
	}
})
const tagsTypes = ref<(UI_TAG_TYPE)[]>([
	undefined,
	'success',
	'warning',
	'info',
	'danger'
])
const emits = defineEmits(['success'])
const maxSize = computed<number>(() => (props.maxSize > 100 ? 99 : props.maxSize))
const deptShow = ref<boolean>(false)
const deptId = ref<string>('')
const deptShowWidth = computed<string>(() => (deptShow.value ? '70vw' : '60vw'))

interface PageInitType {
	checkData?: SysUserResponse[] //选中数据
	checkId?: string[] // 选中数据的id
	single?: boolean // 单个禁用
	multiple?: boolean // 多个禁用
	loadingStatus: boolean // 遮罩层
	showSearch: boolean // 显示搜索条件
	total?: number // 页面表格列表总数
	pages?: number //页数
}

const state = reactive<{
	pageInit: PageInitType
	queryParams: SysUserQueryReq
	tableList: SysUserResponse[]
}>({
	pageInit: {
		loadingStatus: false, // 遮罩层
		checkId: [], // 选中数组
		checkData: [], // 选中数组
		single: true, // 非单个禁用
		multiple: true, // 非多个禁用
		total: 0, // 页面表格列表总数
		showSearch: false, // 显示搜索条件
	},
	queryParams: {
		current: 1, //页码
		size: 5, //数量
		ascName: 'id' //排序字段
	}, //查询参数
	tableList: [] //表格数据
})
const {queryParams} = toReactive(state)
const {tableList, pageInit} = toRefs(state)
const queryFormRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const deptTreeRef = ref<InstanceType<typeof DeptTree>>()
/**
 * 重置表单
 */
const resetQuery = () => {
	queryFormRef.value?.resetFields()
	tableRef.value?.clearSort()
	queryParams.ascName = ''
	queryParams.descName = ''
	queryParams.deptId = ''
	deptTreeRef.value?.changeHighlightCurrent()
	handleQuery()
}
const restCheck = () => {
	for (let valueElement of pageInit.value.checkData || []) {
		tableRef.value!.toggleRowSelection(valueElement, false)
	}
	pageInit.value.checkData = []
}

/**
 * tag 关闭操作
 */
const handleTagClose = (selection: SysUserResponse) => {
	if (!selection) return
	tableRef.value!.toggleRowSelection(selection, false)
	pageInit.value.checkData = pageInit.value.checkData?.filter((item: SysUserResponse) => item.id !== selection.id)
}

/**
 * 多选框选中数据
 * @param selection 选中信息
 */
const handleSelectionChange = (selection: SysUserResponse[]) => {
	pageInit.value.loadingStatus = true
	const count = pageInit.value.checkData?.length || 0
	if (count > maxSize.value || count + selection.length > maxSize.value) {
		useMessage().wraning(`禁止选择用户数量超过${maxSize.value}个`)
		const emp = [...selection]
		emp.forEach((option) => {
			tableRef.value!.toggleRowSelection(option, false)
		})
		checkTable()
	} else {
		pageInit.value.checkData = selection.map(map => map)
		pageInit.value.checkId = selection.map((item: SysUserResponse) => item.id)
		pageInit.value.single = selection.length !== 1
		pageInit.value.multiple = !selection.length
	}
	pageInit.value.loadingStatus = false
}

/**
 * 搜索按钮操作
 */
const handleQuery = async (data?: any) => {
	pageInit.value.loadingStatus = true
	pageParams(queryParams, data)
	await getSysUserPage(queryParams)
			.then((res) => {
				tableList.value = res.data.list
				pageInit.value.total = res.data.total
				pageInit.value.pages = res.data.pages
				checkTable()
			})
			.finally(() => {
				pageInit.value.loadingStatus = false
			})
}

const checkTable = () => {
	nextTick(() => {
		if (pageInit.value.checkData) {
			const rows: string[] = pageInit.value.checkData.map((item) => item.id)
			for (let valueElement of tableList.value) {
				if (rows.indexOf(valueElement.id) !== -1) {
					tableRef.value!.toggleRowSelection(valueElement, true)
				}
			}
		}
	})
}

/**
 * 部门点击
 */
const handleDeptClick = (data?: SysDeptResponse) => {
	if (data) {
		queryParams.deptId = data!.id
		handleQuery()
	}
}

const show = async (data?: string[]) => {
	pageInit.value.showSearch = true
	if (data && data.length >= 1) {
		queryParams.userIds = data
		await handleQuery()
		queryParams.userIds = undefined
		pageInit.value.checkData = tableList.value.map((item: SysUserResponse, index: number) => {
			item.tagsType = tagsTypes.value[index / (tagsTypes.value.length - 1)]
			return item
		})
		for (let option of tableList.value) {
			tableRef.value!.toggleRowSelection(option, true)
		}
	} else {
		await handleQuery()
	}
}

/**
 * 关闭
 */
const close = () => {
	pageInit.value = {
		loadingStatus: false, // 遮罩层
		showSearch: false, // 显示搜索条件
		checkId: [], // 选中数组
		checkData: [], // 选中数组
		single: true, // 非单个禁用
		multiple: true, // 非多个禁用
		total: 0 // 页面表格列表总数
	}
	queryFormRef.value?.resetFields()
	tableRef.value?.clearSort()
	tableList.value = []
	queryParams.ascName = ''
	queryParams.descName = ''
	queryParams.deptId = ''
}

/**
 * 提交表单
 */
const submitForm = () => {
	pageInit.value.loadingStatus = true
	if (pageInit.value.checkData && pageInit.value.checkData.length) {
		let emp: SysUserResponse[] = []
		pageInit.value.checkData.forEach((item: any) => emp.push(item))
		emits('success', emp)
		close()
	} else {
		useMessage().wraning('未选择数据！')
		pageInit.value.loadingStatus = false
	}
}

defineExpose({
	show
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
<style lang="scss">
.dept-user {
	.el-dialog__body {
		padding: 15px !important;
		overflow: auto;
	}
}
</style>
