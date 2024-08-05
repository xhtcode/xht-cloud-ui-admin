<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body
			center
			width="50vw">
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="120px">
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="字典数据编码" prop="dictCode">
						<el-input v-model="addUpdateForm.dictCode" maxlength="100"
						          placeholder="请输入字典数据编码" show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="字典数据值" prop="dictValue">
						<el-input v-model="addUpdateForm.dictValue" maxlength="100"
						          placeholder="请输入字典数据值" show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="字典数据排序" prop="dictSort">
						<el-input-number
								v-model="addUpdateForm.dictSort"
								:max="999"
								:min="1"
								class="w100"
								controls-position="right"
								placeholder="请输入字典数据排序"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="字典数据状态" prop="dictStatus">
						<static-dict-select v-model="addUpdateForm.dictStatus" :dict-list="StaticDictStatus"
						                    placeholder="请选择字典状态状态"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="字典数据备注" prop="dictDesc">
						<el-input
								v-model="addUpdateForm.dictDesc"
								:rows="5"
								maxlength="255"
								placeholder="请输入字典数据备注"
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
import {useRoute} from 'vue-router'
import {
	StaticDictStatus,
	SysDictItemOperationForm,
	SysDictItemOperationPageInit,
	SysDictItemOperationRules
} from "@/api/system/dict/constant";
import {getSysDictItemById, saveSysDictItem, updateSysDictItem} from "@/api/system/dict";
import type {SysDictItemOperationReq} from "@/api/system/dict/type";

defineOptions({name: 'SysDictItemViewAddUpdate'})
const route = useRoute()
const state = reactive<BasicOperationPageInit<SysDictItemOperationReq>>({
	addUpdatePageInit: {
		...SysDictItemOperationPageInit
	},
	addUpdateForm: {...SysDictItemOperationForm}
})

const rules = reactive<FormRules>(SysDictItemOperationRules)
const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<SysDictItemOperationReq>>(state)

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
	await getSysDictItemById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改字典数据数据'
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
			addUpdateForm.value.dictId = route.params.id as string
			if (addUpdatePageInit.value.operationStatus === 'save') {
				//增加
				await saveSysDictItem(addUpdateForm.value)
						.then((_) => {
							useMessage().success('新增字典数据数据成功')
							emit('success')
							close()
						})
						.finally(() => {
							addUpdatePageInit.value.loadingStatus = false
						})
			} else {
				//修改
				await updateSysDictItem(addUpdateForm.value)
						.then((_) => {
							useMessage().success('修改字典数据数据成功')
							emit('success')
							close()
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
	addUpdateForm.value = {...SysDictItemOperationForm}
	addUpdatePageInit.value = {
		...SysDictItemOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

const setDictParentId = (dictId: string) => {
	addUpdateForm.value.dictId = dictId
}

defineExpose({
	show,
	setDictParentId
})
</script>

<style scoped></style>
