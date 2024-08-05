<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body
			center
			width="50vw"
	>
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="120px">
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="字典类型" prop="dictType">
						<el-input v-model="addUpdateForm.dictType" maxlength="100"
						          placeholder="请输入字典类型" show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="字典名称" prop="dictName">
						<el-input v-model="addUpdateForm.dictName" maxlength="100"
						          placeholder="请输入字典名称" show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="类型排序" prop="dictSort">
						<el-input-number
								v-model="addUpdateForm.dictSort"
								:max="999"
								:min="1"
								class="w100"
								placeholder="请输入字典类型排序"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" class="text-center">
					<el-form-item label="类型状态" prop="dictStatus">
						<static-dict-select v-model="addUpdateForm.dictStatus" :dict-list="StaticDictStatus"
						                    placeholder="请选择类型状态"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="字典备注" prop="dictDesc">
						<el-input
								v-model="addUpdateForm.dictDesc"
								:rows="5"
								maxlength="255"
								placeholder="请输入字典类型备注"
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
import {getSysDictById, saveSysDict, updateSysDict} from '@/api/system/dict'
import {useMessage} from '@/hooks/use-message'
import type {AxiosResponse} from 'axios'
import {StaticDictStatus, SysDictOperationForm, SysDictOperationRules} from "@/api/system/dict/constant";
import {errorFormParams} from "@/utils/moudle/element";
import type {SysDictOperationReq, SysDictResponse} from "@/api/system/dict/type";
import {SysDeptOperationPageInit} from "@/api/system/dept/constant";

defineOptions({name: 'SysDictViewAddUpdate'})
const state = reactive<BasicOperationPageInit<SysDictOperationReq>>({
	addUpdatePageInit: {
		...SysDeptOperationPageInit
	},
	addUpdateForm: {...SysDictOperationForm}
})

const rules = reactive<FormRules>(SysDictOperationRules)
const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<SysDictOperationReq>>(state)
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
	await getSysDictById(id)
			.then((response: AxiosResponse<SysDictResponse>) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改字典类型'
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
				await saveSysDict(addUpdateForm.value)
						.then((_) => {
							useMessage().success('新增字典类型成功')
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
				await updateSysDict(addUpdateForm.value)
						.then((_) => {
							useMessage().success('修改字典类型成功')
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
	addUpdateForm.value = {...SysDictOperationForm}
	addUpdatePageInit.value = {
		...SysDeptOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

defineExpose({
	show
})
</script>

<style lang="scss" scoped>
.dept-data-scope {
	height: 25vh;
	overflow: auto;
}
</style>
