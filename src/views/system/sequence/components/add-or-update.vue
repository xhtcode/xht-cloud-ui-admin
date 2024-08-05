<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body
			>
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="SysSequenceOperationRules"
				element-loading-text="拼命加载中"
				label-width="100px">
			<el-row :gutter="12">
				<el-col :span="12">
					<el-form-item label="序列编码" prop="seqCode">
						<el-input
								v-model="addUpdateForm.seqCode"
								clearable
								maxlength="100"
								placeholder="请输入序列编码"
								show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="序列名称" prop="seqName">
						<el-input
								v-model="addUpdateForm.seqName"
								clearable
								maxlength="100"
								placeholder="请输入序列名称"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="序列格式" prop="seqFormat">
						<el-input
								v-model="addUpdateForm.seqFormat"
								clearable
								maxlength="200"
								placeholder="请输入序列格式"
								show-word-limit/>
						<el-alert
								:closable="false"
								class="mt-5"
								title="格式说明：03220{YYYYMMdd}-{N},其中YYYY、YY、MM、DD为日期格式任意组合,
							03220为开头固定值可自定义，{N}原值显示，{N6}六位显示，这几项可顺序任意组合"
								type="error"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="最小值" prop="minValue">
						<el-input-number
								v-model="addUpdateForm.minValue"
								:min="0"
								class="w100"
								clearable
								placeholder="请输入序列最小值"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="最大值" prop="maxValue">
						<el-input-number
								v-model="addUpdateForm.maxValue"
								:max="999999"
								:min="2"
								class="w100"
								clearable
								placeholder="请输入序列最大值"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="步进值" prop="stepValue">
						<el-input-number
								v-model="addUpdateForm.stepValue"
								:max="99"
								:min="0"
								class="w100"
								clearable
								placeholder="请输入序列步进值"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="当前值" prop="currentValue">
						<el-input-number
								v-model="addUpdateForm.currentValue"
								:min="0"
								class="w100"
								clearable
								placeholder="请输入序列当前值"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="循环更新" prop="seqLoop">
						<static-dict-select v-model="addUpdateForm.seqLoop" :dict-list="DictSeqLoop"
						                    placeholder="请选择是否循环更新"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="重置周期" prop="resetFlag">
						<static-dict-select v-model="addUpdateForm.resetFlag" :dict-list="DictResetFlag"
						                    placeholder="请选择重置周期"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="序列描述" prop="seqDesc">
						<el-input
								v-model="addUpdateForm.seqDesc"
								clearable
								maxlength="250"
								placeholder="请输入序列描述"
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
import type {FormInstance} from 'element-plus'
import {useMessageBox} from '@/hooks/use-message'
import {getSysSequenceById, saveSysSequence, updateSysSequence} from "@/api/system/sequence";
import {errorFormParams} from "@/utils/moudle/element";
import {
	DictResetFlag,
	DictSeqLoop,
	SysSequenceOperationForm,
	SysSequenceOperationPageInit,
	SysSequenceOperationRules
} from "@/api/system/sequence/constant";
import type {SysSequenceOperationReq} from "@/api/system/sequence/type";

defineOptions({name: 'SysSequenceViewAddOrUpdate'})
const state = reactive<BasicOperationPageInit<SysSequenceOperationReq>>({
	addUpdatePageInit: {
		...SysSequenceOperationPageInit
	},
	addUpdateForm: {
		...SysSequenceOperationForm
	}
})

const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const tipStatus = ref<boolean>(true)
const {addUpdatePageInit, addUpdateForm} = toRefs(state)

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
	await getSysSequenceById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改序列'
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
				await saveSysSequence(addUpdateForm.value)
						.then((_) => {
							useMessageBox().success('新增序列成功')
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
				await updateSysSequence(addUpdateForm.value)
						.then((_) => {
							useMessageBox().success('修改序列成功')
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
			useMessageBox().error('表单校验未通过，请重新检查提交内容')
		}
	})
}

/**
 * 关闭
 */
const close = () => {
	tipStatus.value = false
	addUpdateForm.value = {...SysSequenceOperationForm}
	addUpdatePageInit.value = {
		...SysSequenceOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

defineExpose({
	show
})
</script>

<style scoped></style>
