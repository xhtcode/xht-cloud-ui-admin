<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body>
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="120px">
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="用户账号" prop="userName">
						<el-input
								v-model="addUpdateForm.userName"
								:maxlength="10"
								clearable
								placeholder="请输入用户账号"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="头像地址" prop="userAvatar">
						<el-input
								v-model="addUpdateForm.userAvatar"
								:maxlength="50"
								clearable
								placeholder="请输入头像地址"
								show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="手机号码" prop="contactPhone">
						<el-input
								v-model.number="addUpdateForm.contactPhone"
								:maxlength="11"
								clearable
								placeholder="请输入手机号码"
								show-word-limit/>
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

<script setup lang="ts">
import type {SysAdminOperationReq} from "@/api/system/admin/type";
import {SysAdminOperationForm, SysAdminOperationPageInit, SysAdminOperationRules} from "@/api/system/admin/constant";
import type {FormInstance, FormRules} from "element-plus";
import {getSysAdminById, saveSysAdmin, updateSysAdmin} from "@/api/system/admin";
import {useMessage} from "@/hooks/use-message";
import {errorFormParams} from "@/utils/moudle/element";

defineOptions({name: 'SysAdminViewAddUpdate'})
const state = reactive<BasicOperationPageInit<SysAdminOperationReq>>({
	addUpdatePageInit: {
		...SysAdminOperationPageInit
	},
	addUpdateForm: {...SysAdminOperationForm}
})

const rules = reactive<FormRules>(SysAdminOperationRules)
const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<SysAdminOperationReq>>(state)
/**
 * 打开显示
 */
const show = (id: number | null) => {
	addUpdatePageInit.value.visibleStatus = true
	getInfoById(id)
}

/**
 * 获取单表信息
 */
const getInfoById = async (id: number | null) => {
	if (!id) return
	addUpdatePageInit.value.loadingStatus = true
	addUpdatePageInit.value.operationStatus = 'update'
	await getSysAdminById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改系统管理员'
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
				await saveSysAdmin(addUpdateForm.value)
						.then((_) => {
							useMessage().success('新增管理员成功')
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
				await updateSysAdmin(addUpdateForm.value)
						.then((_) => {
							useMessage().success(`修改管理员${addUpdateForm.value.userName}成功`)
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
	addUpdateForm.value = {...SysAdminOperationForm}
	addUpdatePageInit.value = {
		...SysAdminOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

defineExpose({
	show
})
</script>

<style lang="scss" scoped></style>
