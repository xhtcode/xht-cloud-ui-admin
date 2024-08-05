<template>
	<div class="main-container-none">
		<el-form
				ref="queryFormRef"
				:disabled="state.loadingStatus"
				:model="queryParams"
				class="user-select-display"
				label-width="120px"
		>
			<xht-card class="mb-10">
				<el-row v-if="state.showSearch">
					<el-col :span="6">
						<el-form-item label="菜单名称" prop="menuName">
							<el-input v-model="queryParams.menuName" placeholder="请输入菜单名称"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="路由地址" prop="menuPath">
							<el-input v-model="queryParams.menuPath" placeholder="请输入路由地址"/>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="菜单状态" prop="menuStatus">
							<static-dict-select v-model="queryParams.menuStatus" :dict-list="DictMenuStatus"
							                    placeholder="请选择菜单状态"/>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="text-center">
						<el-button
								class="el-button e-button--primary el-button--mini"
								icon="Search"

								type="primary"
								@click="handleQuery()">
							查询
						</el-button>
						<el-button icon="Refresh" @click="resetForm">重置</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-button icon="Plus" type="primary" @click="handleAdd">增加</el-button>
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
		<div class="main-container-auto main-container-view">
			<el-table v-if="state.refreshTable" v-loading="state.loadingStatus" :data="state.tableList"
			          :default-expand-all="state.expandAllStatus"
			          :header-cell-style="tableStyle.headerCellStyle"
			          :cell-style="tableStyle.cellStyle"
			          :tree-props="{ children: 'children' }" row-key="id">
				<el-table-column :show-overflow-tooltip="true" label="菜单名称" prop="menuName" min-width="200"
				                 label-class-name="text-center" class-name="text-left"
				/>
				<el-table-column label="菜单类型" width="120" prop="menuType"/>
				<el-table-column align="center" label="菜单图标" prop="menuIcon" min-width="80">
					<template #default="{ row }">
						<svg-icon :name="row.menuIcon" :size="20" color="var(--xht-svg-color)"></svg-icon>
					</template>
				</el-table-column>
				<el-table-column label="权限标识" prop="menuAuthority" min-width="160" v-if="columnOption.menuAuthority"/>
				<el-table-column label="组件名称" min-width="200" prop="menuViewName" v-if="columnOption.menuViewPath"/>
				<el-table-column label="组件路径" min-width="200" prop="menuViewPath" v-if="columnOption.menuViewPath"/>
				<el-table-column label="菜单状态" prop="menuStatus" v-if="columnOption.menuStatus">
					<template #default="{row}">
						<static-dict-tag view :dict-list="DictMenuStatus" :init-value="[row.menuStatus]"/>
					</template>
				</el-table-column>
				<el-table-column label="排序" prop="menuSort" v-if="columnOption.menuSort"/>
				<el-table-column fixed="right"
				                 label="操作"
				                 width="220px">
					<template #default="{ row }">
						<el-button icon="edit" link type="success"
						           @click="handleUpdate(row)">
							修改
						</el-button>
						<el-button icon="delete" link type="danger"
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
import {deleteSysMenuById, getSysMenuTreeList} from '@/api/system/menu'
import {toReactive} from '@vueuse/core'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import type {ElTable, FormInstance} from 'element-plus'
import type {SysMenuQueryReq, SysMenuResponse} from "@/api/system/menu/type";
import {useTableQueryHooks} from "@/hooks/use-crud-hooks";
import AddOrUpdate from '@/views/system/menu/components/add-or-update.vue'
import {DictMenuStatus, SysMenuColumnOption} from "@/api/system/menu/constant";
import {useColumnOptionHooks} from "@/hooks/use-column-option";

defineOptions({name: 'SysMenuViewIndex'})
const addUpdateRef = ref<any>()
const queryFormRef = ref<FormInstance>()
const state = reactive<BasicTableQueryOptions<SysMenuQueryReq, SysMenuResponse>>({
	loadingStatus: false,
	pageStatus: false,
	refreshTable: true,
	queryParams: {
		ascName: 'menuSort'
	},
	tableList: []
})
const {
	columnOption,
	sourceColumnOption
} = useColumnOptionHooks(SysMenuColumnOption)
const {
	tableStyle,
	handleQuery
} = useTableQueryHooks<SysMenuQueryReq, SysMenuResponse>(state, getSysMenuTreeList)
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
const handleUpdate = (row: SysMenuResponse) => {
	nextTick(() => {
		addUpdateRef.value?.show(row.id || (state.checkId!)[0])
	})
}

/**
 * 删除按钮操作
 * @param row 当前行信息、按钮本身信息
 */
const handleDelete = async (row: SysMenuResponse) => {
	state.loadingStatus = true
	const ids = row.id
	await useMessageBox()
			.confirm('此操作将永久删除, 是否继续?')
			.then(() => {
				deleteSysMenuById([ids]).then(async () => {
					useMessage().success('删除成功!')
					handleQuery()
				})
			})
			.finally(() => {
				state.loadingStatus = false
			})
}
/**
 * 菜单折叠与关闭
 */
const handleExpandAll = () => {
	state.refreshTable = false
	state.expandAllStatus = !state.expandAllStatus
	nextTick(() => {
		state.refreshTable = true
	})
}
/**
 * 表单重置
 */
const resetForm = () => {
	queryFormRef.value?.resetFields()
	handleQuery()
}
</script>
