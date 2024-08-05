<template>
	<div class="main-container-none" style="flex-direction: row">
		<xht-card body-height="100vh" class="flex-1" top>
			<template #header>
				<div>
					<span>地区信息</span>
				</div>
			</template>
			<area-tree ref="areaTreeRef" @click-node="getInfoById"/>
		</xht-card>
		<div style="width: 2%"></div>
		<xht-card class="flex-2" footer top>
			<template #header>
				<div class="font-20 w100 text-center">地区详情</div>
			</template>

			<div class="w100 text-right">
				<el-button
						:disabled="state.loadingStatus"
						icon="Refresh"

						type="info"
						@click="handleReset">
					重置
				</el-button>
				<el-button
						:disabled="!disabledStatus"
						icon="Plus"

						type="primary"
						@click="handleAdd">
					增加
				</el-button>
				<el-button
						:disabled="disabledStatus"
						icon="delete"

						type="success"
						@click="handleUpdate()">
					修改
				</el-button>
				<el-button
						:disabled="disabledStatus"
						icon="delete"

						type="danger"
						@click="handleDelete">
					删除
				</el-button>
			</div>
			<el-form
					class="mt-20"
					ref="addUpdateFormRef"
					v-loading="state.loadingStatus"
					:model="addUpdateForm"
					:rules="rules"
					label-width="100px">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="上级地区" prop="parentId">
							<area-cas-cader
									v-model="addUpdateForm.parentId"
									:parent="true"
									check-strictly
									clearable
									placeholder="请选择上级地区"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="地区名称" prop="name">
							<el-input v-model="addUpdateForm.name" clearable placeholder="请输入地区名称"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="地区级别" prop="level">
							<static-dict-select v-model="addUpdateForm.level" :dict-list="DictAreaLevel" placeholder="请输入地区级别"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="区划代码" prop="areaNo">
							<el-input v-model.number="addUpdateForm.areaNo" clearable placeholder="请输入区划代码"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="城乡分类" prop="category">
							<static-dict-select v-model="addUpdateForm.category" :dict-list="DictAreaCategory" placeholder="请选择地区级别"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="地区描述" prop="msg">
							<el-input
									v-model="addUpdateForm.msg"
									clearable
									maxlength="200"
									placeholder="请输入地区描述"
									rows="5"
									show-word-limit resize="none"
									type="textarea"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="text-center">
						<el-text :size="'large'" type="danger">
							地区信息编辑后请联系运维人员，进行线上地区更新!
						</el-text>
					</el-col>
				</el-row>
			</el-form>
		</xht-card>
	</div>
</template>
<script lang="ts" setup>
import {deleteSysAreaInfoById, getSysAreaInfoById, saveSysAreaInfo, updateSysAreaInfo} from '@/api/system/area'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import type {FormInstance, FormRules} from 'element-plus'
import {
	DictAreaCategory,
	DictAreaLevel,
	SysAreaInfoOperationForm,
	SysAreaInfoOperationRules
} from "@/api/system/area/constant";
import type {SysAreaInfoOperationReq, SysAreaInfoQueryReq, SysAreaInfoResponse} from "@/api/system/area/type";
import {errorFormParams} from "@/utils/moudle/element";

defineOptions({name: 'SysAreaInfoViewIndex'})
const state = reactive<BasicTableQueryOptions<SysAreaInfoQueryReq, SysAreaInfoResponse>>({
	loadingStatus: false,
	queryParams: {
		descName: 'id'
	},
	tableList: []
})
const rules = reactive<FormRules>(SysAreaInfoOperationRules)
const addUpdateForm = ref<SysAreaInfoOperationReq>({
	...SysAreaInfoOperationForm
})
const addUpdateFormRef = ref<FormInstance>()
const areaTreeRef = ref()
const disabledStatus = computed(() => state.loadingStatus || !addUpdateForm.value.id || addUpdateForm.value.id === '-1')
const reset = async () => {
	await nextTick(() => {
		areaTreeRef.value?.reset()
	})
}

/**
 * 重置
 */
const handleReset = async () => {
	state.loadingStatus = true
	addUpdateFormRef.value?.resetFields()
	await reset()
	state.loadingStatus = false
}
/**
 * 添加
 */
const handleAdd = () => {
	state.loadingStatus = true
	addUpdateFormRef.value?.validate(async (valid) => {
		if (valid) {
			//添加
			addUpdateForm.value.id = undefined
			await saveSysAreaInfo(addUpdateForm.value)
					.then(async (_) => {
						await areaTreeRef.value?.reset(addUpdateForm.value.areaNo)
						areaTreeRef.value?.setCurrentKey(addUpdateForm.value.id)
						useMessage().success('新增地区信息成功')
						useMessage().notifyError('地区信息编辑后请联系运维人员，进行线上地区更新!')
					})
					.catch((err) => {
						errorFormParams(err, addUpdateFormRef, addUpdateForm)
					})
					.finally(() => {
						state.loadingStatus = false
					})
		} else {
			state.loadingStatus = false
			useMessage().error('表单校验未通过，请重新检查提交内容')
		}
	})
}

/**
 * 修改
 */
const handleUpdate = () => {
	state.loadingStatus = true
	addUpdateFormRef.value?.validate(async (valid) => {
		if (valid) {
			//修改
			await updateSysAreaInfo(addUpdateForm.value)
					.then(async (_) => {
						await areaTreeRef.value?.reset(addUpdateForm.value.areaNo)
						areaTreeRef.value?.setCurrentKey(addUpdateForm.value.id)
						useMessage().success('修改地区信息成功')
						useMessage().notifyError('地区信息编辑后请联系运维人员，进行线上地区更新!')
					})
					.catch((err) => {
						errorFormParams(err, addUpdateFormRef, addUpdateForm)
					})
					.finally(() => {
						state.loadingStatus = false
					})
		} else {
			state.loadingStatus = false
			useMessage().error('表单校验未通过，请重新检查提交内容')
		}
	})
}

/**
 * 获取单表信息
 */
const getInfoById = async (data?: SysAreaInfoResponse) => {
	if (!data) return
	state.loadingStatus = true
	await getSysAreaInfoById(data.id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
			})
			.finally(() => {
				state.loadingStatus = false
			})
}

/**
 * 删除按钮操作
 */
const handleDelete = async () => {
	state.loadingStatus = true
	await useMessageBox()
			.confirm('此操作将永久删除, 是否继续?')
			.then(() => {
				if (!addUpdateForm.value.id) {
					useMessage().success('未选择数据!')
					return
				}
				deleteSysAreaInfoById([addUpdateForm.value.id!]).then(async () => {
					await handleReset()
					useMessage().success('删除成功!')
				})
			})
			.finally(() => {
				state.loadingStatus = false
			})
}
</script>
