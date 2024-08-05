<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body
			width="60vw">
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="120px">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="客户端ID" prop="clientId">
						<el-input
								v-model="addUpdateForm.clientId"
								:maxlength="100"
								clearable
								placeholder="请输入客户端ID"
								show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="客户端密钥" prop="clientSecret">
						<el-input
								v-model="addUpdateForm.clientSecret"
								:maxlength="100"
								clearable
								placeholder="请输入客户端密钥"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="是否自动放行" prop="autoApprove">
						<static-dict-select v-model="addUpdateForm.autoApprove" :dict-list="DictAutoApprove" placeholder="请选择客户端是否自动放行"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="客户端名称" prop="clientName">
						<el-input
								v-model="addUpdateForm.clientName"
								:maxlength="100"
								clearable
								placeholder="请输入客户端名称"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="授权模式" prop="authorizationGrantTypes">
						<dict-check
								v-model="addUpdateForm.authorizationGrantTypes"
								dict-code="oauth2_grant_type"></dict-check>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="请求范围" prop="scopes">
						<dict-check v-model="addUpdateForm.scopes" dict-code="oauth2_client_scope"></dict-check>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="客户端过期时间" prop="clientSecretExpiresAt">
						<el-date-picker
								v-model="addUpdateForm.clientSecretExpiresAt"
								:disabled-date="disabledNowAfterDate"
								:editable="true"
								class="w100"
								clearable
								placeholder="请输入客户端过期时间"
								type="datetime"
								value-format="YYYY-MM-DD HH:mm:ss"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="重定向地址" prop="redirectUris">
						<el-input
								v-model="addUpdateForm.redirectUris"
								:rows="3"
								clearable
								maxlength="500"
								placeholder="请输入重定向地址"
								show-word-limit resize="none"
								type="textarea"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="令牌有效期" prop="accessTokenValidity">
						<el-input-number
								v-model="addUpdateForm.accessTokenValidity"
								:max="12 * 30 * 60 * 100"
								:min="5 * 60 * 100"
								clearable
								controls-position="right"
								placeholder="请输入令牌有效期"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="刷新令牌有效期" prop="refreshTokenValidity">
						<el-input-number
								v-model="addUpdateForm.refreshTokenValidity"
								:max="12 * 30 * 60 * 100"
								:min="5 * 60 * 100"
								clearable
								controls-position="right"
								placeholder="请输入刷新令牌有效期"/>
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
import {useMessageBox} from '@/hooks/use-message'
import {disabledNowAfterDate, errorFormParams} from "@/utils/moudle/element";
import {
	getOauth2RegisteredClientById,
	saveOauth2RegisteredClient,
	updateOauth2RegisteredClient
} from "@/api/system/client";
import type {RegisteredClientOperationReq} from "@/api/system/client/type";
import {
	DictAutoApprove,
	RegisteredClientOperationForm,
	RegisteredClientOperationPageInit,
	RegisteredClientOperationRules
} from "@/api/system/client/constant";

defineOptions({name: 'RegisteredClientViewAddOrUpdate'})
const state = reactive<BasicOperationPageInit<RegisteredClientOperationReq>>({
	addUpdatePageInit: {
		...RegisteredClientOperationPageInit
	},
	addUpdateForm: {...RegisteredClientOperationForm}
})

const rules = reactive<FormRules>(RegisteredClientOperationRules)
const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<RegisteredClientOperationReq>>(state)

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
	await getOauth2RegisteredClientById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改OAuth2 客户端信息'
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
				await saveOauth2RegisteredClient(addUpdateForm.value)
						.then((_) => {
							useMessageBox().success('新增OAuth2 客户端信息成功')
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
				await updateOauth2RegisteredClient(addUpdateForm.value)
						.then((_) => {
							useMessageBox().success('修改OAuth2 客户端信息成功')
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
	addUpdateForm.value = {...RegisteredClientOperationForm}
	addUpdatePageInit.value = {
		...RegisteredClientOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

defineExpose({
	show
})
</script>

<style lang="scss" scoped></style>
