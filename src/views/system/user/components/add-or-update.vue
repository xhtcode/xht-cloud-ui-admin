<template>
	<el-drawer
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body
			center
			size="60vw">
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="120px">
			<xht-card title="基本信息">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="用户名称" prop="sysUser.userName">
							<el-input
									v-model="addUpdateForm.sysUser.userName"
									clearable
									placeholder="请输入用户昵称)"/>
						</el-form-item>
						<el-form-item label="用户账号" prop="sysUser.userAccount">
							<el-input
									v-model="addUpdateForm.sysUser.userAccount"
									clearable
									disabled
									placeholder="请输入用户账号"/>
						</el-form-item>
					</el-col>
					<el-col :span="12" class="text-center">
						<el-image src="/src/assets/images/avatar.gif"></el-image>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="QQ互联openid" prop="sysUser.qqOpenid">
							<el-input
									v-model="addUpdateForm.sysUser.qqOpenid"
									disabled
									placeholder="请输入QQ互联openid"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="微信openid" prop="sysUser.wxOpenid">
							<el-input
									v-model="addUpdateForm.sysUser.wxOpenid"
									disabled
									placeholder="请输入微信openid"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="微信unionid" prop="sysUser.wxUnionid">
							<el-input
									v-model="addUpdateForm.sysUser.wxUnionid"
									disabled
									placeholder="请输入微信unionid"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="激活状态" prop="sysUser.isActive">
							<el-select
									v-model="addUpdateForm.sysUser.isActive"
									class="w100"
									disabled
									placeholder="请选择激活状态">
								<el-option label="激活" value="1"/>
								<el-option label="未激活" value="0"/>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="账号锁定" prop="sysUser.isAdmin">
							<el-select
									v-model="addUpdateForm.sysUser.isActive"
									:disabled="addUpdatePageInit.saveOrUpdate"
									class="w100"
									placeholder="请选择账号锁定">
								<el-option label="正常" value="1"/>
								<el-option label="锁定" value="0"/>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="注册时间" prop="sysUser.registeredTime">
							<el-input
									v-model="addUpdateForm.sysUser.registeredTime"
									disabled
									placeholder="请选择注册时间"/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="用户类型" prop="sysUser.userType">
							<el-select
									v-model="addUpdateForm.sysUser.userType"
									class="w100"
									disabled
									placeholder="请选择用户类型">
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</xht-card>
			<xht-card class="mt-10" title="部门信息">
				<el-row>
					<el-col :span="24">
						<el-form-item label="部门信息" prop="sysUser.deptId">
							<dept-select v-model="addUpdateForm.sysUser.deptId"/>
						</el-form-item>
					</el-col>
				</el-row>
			</xht-card>
			<xht-card class="mt-10" title="扩展信息">
				<user-base-info v-model="addUpdateForm"/>
			</xht-card>
		</el-form>
		<template #footer>
			<el-button :disabled="addUpdatePageInit.loadingStatus" type="primary" @click="submitForm">
				{{ addUpdatePageInit.submitTitle }}
			</el-button>
			<el-button @click="close">取 消</el-button>
		</template>
	</el-drawer>
</template>
<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus'
import {useMessage, useMessageBox} from '@/hooks/use-message'
import UserBaseInfo from '@/views/system/user/components/user-base-info.vue'
import type {AxiosResponse} from 'axios'
import {getSysUserById, saveSysUser, updateSysUser} from "@/api/system/user";
import {errorFormParams} from "@/utils/moudle/element";
import {SysUserOperationForm, SysUserOperationPageInit, SysUserOperationRules} from "@/api/system/user/constant";
import {SysDeptOperationReq} from "@/api/system/dept/type";

defineOptions({name: 'SysUserViewAddUpdate'})
const state = reactive<BasicOperationPageInit<SysDeptOperationReq>>({
	addUpdatePageInit: {
		...SysUserOperationPageInit
	},
	addUpdateForm: {...SysUserOperationForm}
})

const rules = reactive<FormRules>(SysUserOperationRules)
const emits = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<SysDeptOperationReq>>(state)
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
	await getSysUserById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改用户表'
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
	addUpdatePageInit.value.loadingStatus = true
	addUpdateFormRef.value?.validate(async (valid) => {
		if (valid) {
			addUpdateForm.value.profile.userId = addUpdateForm.value.sysUser.id
			if (addUpdatePageInit.value.operationStatus === 'save') {
				//增加
				await saveSysUser(addUpdateForm.value)
						.then((res: AxiosResponse<string>) => {
							useMessageBox().success(`新增用户成功，账号: ${res.data}`)
							emits('success', res.data)
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
				await updateSysUser(addUpdateForm.value)
						.then((res: AxiosResponse<string>) => {
							useMessageBox().success(`修改用户成功，账号: ${res.data}成功`)
							emits('success', res.data)
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
	addUpdateForm.value = {...SysUserOperationForm}
	addUpdatePageInit.value = {
		...SysUserOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

defineExpose({
	show
})
</script>

<style scoped></style>
