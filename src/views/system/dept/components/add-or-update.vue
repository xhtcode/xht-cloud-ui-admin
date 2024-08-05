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
				label-width="100px">
			<el-row>
				<el-col :span="24">
					<el-form-item label="上级部门" prop="parentId">
						<dept-select v-model="addUpdateForm.parentId" clearable placeholder="请选择上级部门"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="部门主管" prop="deptLeader">
						<el-input
								v-model="addUpdateForm.deptLeader"
								maxlength="100"
								placeholder="请输入部门主管" readonly show-word-limit
								@click="handleUserSelectClick"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门编码" prop="deptCode">
						<el-input
								v-model="addUpdateForm.deptCode"
								clearable
								maxlength="5"
								placeholder="请输入部门编码"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="部门名称" prop="deptName">
						<el-input v-model="addUpdateForm.deptName" clearable maxlength="100" placeholder="请输入部门名称"
						          show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="联系电话" prop="deptTel">
						<el-input
								v-model="addUpdateForm.deptTel"
								clearable
								maxlength="11"
								placeholder="请输入联系电话"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="排序" prop="deptSort">
						<el-input-number
								v-model="addUpdateForm.deptSort"
								:max="999"
								:min="1"
								class="w100"
								clearable
								controls-position="right"
								placeholder="请输入排序"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门状态" prop="deptStatus">
						<static-dict-select v-model="addUpdateForm.deptStatus" placeholder="请选择部门状态"
						                    :dict-list="DictDeptStatus"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="部门描述" prop="description">
						<el-input
								:rows="5"
								v-model="addUpdateForm.description"
								clearable
								maxlength="200"
								placeholder="请输入部门描述" resize="none"
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
		<user-select ref="userSelectRef" @success="handleUserSelect"/>
	</el-dialog>
</template>
<script lang="ts" setup>
import type {FormInstance, FormRules} from 'element-plus'
import {useMessage} from '@/hooks/use-message'
import {getSysDeptById, saveSysDept, updateSysDept} from "@/api/system/dept";
import {errorFormParams} from "@/utils/moudle/element";
import type {SysDeptOperationReq} from "@/api/system/dept/type";
import {
	DictDeptStatus,
	SysDeptOperationForm,
	SysDeptOperationPageInit,
	SysDeptOperationRules
} from "@/api/system/dept/constant";
import type {SysUserResponse} from "@/api/system/user/type";

defineOptions({name: 'SysDeptViewAddUpdate'})

const userSelectRef = ref<any | null>(null)
const state = reactive<BasicOperationPageInit<SysDeptOperationReq>>({
	addUpdatePageInit: {
		...SysDeptOperationPageInit
	},
	addUpdateForm: {...SysDeptOperationForm}
})
const rules = reactive<FormRules>(SysDeptOperationRules)
const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<SysDeptOperationReq>>(state)

/**
 * 打开 用户选择
 */
const handleUserSelectClick = () => {
	userSelectRef.value?.show(
			addUpdatePageInit.value.operationStatus === 'save' ? [] : [addUpdateForm.value.directorId]
	)
}
/**
 * 用户选择数据
 * @param item
 */
const handleUserSelect = (item: SysUserResponse[]) => {
	addUpdateForm.value.directorId = item[0].id
	addUpdateForm.value.deptLeader = item[0].userAccount
}

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
	await getSysDeptById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改部门'
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
				await saveSysDept(addUpdateForm.value)
						.then((_) => {
							useMessage().success('新增部门成功')
							emit('success', true, addUpdateForm.value.deptName)
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
				await updateSysDept(addUpdateForm.value)
						.then((_) => {
							useMessage().success('修改部门成功')
							emit('success', true, addUpdateForm.value.deptName)
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
	addUpdateForm.value = {...SysDeptOperationForm}
	addUpdatePageInit.value = {
		...SysDeptOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
}

defineExpose({
	show
})
</script>

<style lang="scss" scoped></style>
