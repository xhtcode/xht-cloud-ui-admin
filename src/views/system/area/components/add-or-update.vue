<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body
			center
			width="45vw">
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="100px">
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="名称" prop="name">
						<el-input v-model="addUpdateForm.name"
						          clearable maxlength="100" placeholder="名称" show-word-limit/>
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
						<el-input v-model.number="addUpdateForm.areaNo" clearable maxlength="20" placeholder="请输入区划代码"
						          show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="城乡分类" prop="category">
						<static-dict-select v-model="addUpdateForm.category" :dict-list="DictAreaCategory"
						                    placeholder="请选择地区级别"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="描述" prop="msg">
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
		</el-form>
		<template #footer>
			<el-button :disabled="addUpdatePageInit.loadingStatus" type="primary" @click="submitForm">
				{{ addUpdatePageInit.submitTitle }}
			</el-button>
			<el-button @click="close">取 消</el-button>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus'
import {useMessage} from '@/hooks/use-message'
import {getSysAreaInfoById, saveSysAreaInfo, updateSysAreaInfo} from "@/api/system/area";
import {errorFormParams} from "@/utils/moudle/element";
import type {SysAreaInfoOperationReq} from "@/api/system/area/type";
import {
	DictAreaCategory,
	DictAreaLevel,
	SysAreaInfoOperationForm,
	SysAreaInfoOperationPageInit,
	SysAreaInfoOperationRules
} from "@/api/system/area/constant";

defineOptions({name: 'SysAreaInfoViewAddUpdate'})

const state = reactive<BasicOperationPageInit<SysAreaInfoOperationReq>>({
	addUpdatePageInit: {
		...SysAreaInfoOperationPageInit
	},
	addUpdateForm: {...SysAreaInfoOperationForm}
})

const rules = reactive<FormRules>(SysAreaInfoOperationRules)
const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<SysAreaInfoOperationReq>>(state)

/**
 * 打开显示
 */
const show = (id: string | null) => {
	addUpdatePageInit.value.visibleStatus = true
	getInfoById(id)
}

/**
 * 获取单表信息
 */
const getInfoById = async (id: string | null) => {
	if (!id) return
	addUpdatePageInit.value.loadingStatus = true
	addUpdatePageInit.value.operationStatus = 'update'
	await getSysAreaInfoById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改地区信息'
				addUpdatePageInit.value.submitTitle = '修改'
			})
			.finally(() => {
				addUpdatePageInit.value.loadingStatus = false
			})
}

/**
 * 提交表单
 */
const submitForm = () => {
	addUpdatePageInit.value.visibleStatus = true
	addUpdateFormRef.value?.validate(async (valid) => {
		if (valid) {
			if (addUpdatePageInit.value.operationStatus === 'save') {
				//增加
				await saveSysAreaInfo(addUpdateForm.value)
						.then((_) => {
							useMessage().success('新增地区信息成功')
							emit('success')
							close()
						})
						.catch((err) => {
							errorFormParams(err, addUpdateFormRef, addUpdateForm)
						})
						.finally(() => {
							addUpdatePageInit.value.loadingStatus = false
						})
			} else {
				//修改
				await updateSysAreaInfo(addUpdateForm.value)
						.then((_) => {
							useMessage().success('修改地区信息成功')
							emit('success')
							close()
						})
						.catch((err) => {
							errorFormParams(err, addUpdateFormRef, addUpdateForm)
						})
						.finally(() => {
							addUpdatePageInit.value.loadingStatus = false
						})
			}
		} else {
			addUpdatePageInit.value.loadingStatus = false
			useMessage().error('表单校验未通过，请重新检查提交内容')
		}
	})
}

/**
 * 关闭
 */
const close = () => {
	addUpdateForm.value = {...SysAreaInfoOperationForm}
	addUpdatePageInit.value = {
		...SysAreaInfoOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

defineExpose({
	show
})
</script>

<style scoped></style>
