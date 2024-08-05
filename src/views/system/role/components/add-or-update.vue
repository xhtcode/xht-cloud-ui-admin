<template>
	<el-dialog
			v-model="addUpdatePageInit.visibleStatus"
			:before-close="close"
			:close-on-click-modal="false"
			:title="addUpdatePageInit.title"
			append-to-body
			width="45vw">
		<el-form
				ref="addUpdateFormRef"
				v-loading="addUpdatePageInit.loadingStatus"
				:model="addUpdateForm"
				:rules="rules"
				element-loading-text="拼命加载中"
				label-width="100px">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="角色名称" prop="roleName">
						<el-input
								v-model="addUpdateForm.roleName"
								:maxlength="50"
								clearable
								placeholder="请输入角色名称"
								show-word-limit/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="角色编码" prop="roleCode">
						<el-input
								v-model="addUpdateForm.roleCode"
								:maxlength="50"
								clearable
								placeholder="请输入角色编码"
								show-word-limit/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="排序" prop="roleSort">
						<el-input-number
								v-model="addUpdateForm.roleSort"
								:max="999"
								:min="1"
								class="w100"
								clearable
								controls-position="right"
								placeholder="请输入排序"/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="角色状态" prop="status">
						<static-dict-select v-model="addUpdateForm.status" :dict-list="DictRoleStatus"
						                    placeholder="请选择角色状态"/>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="数据权限" prop="dataScope">
						<el-select v-model="addUpdateForm.dataScope" class="w100" placeholder="请选择数据权限">
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row v-if="addUpdateForm.dataScope === 2">
				<el-col :span="12" class="dept-data-scope">
					<el-form-item label="部门选择" prop="deptIds">
						<el-checkbox
								v-for="item in deptList"
								:key="item.id"
								:label="item.deptName"
								:name="item.id"
								checked
								disabled/>
					</el-form-item>
				</el-col>
				<el-col :span="12" class="dept-data-scope">
					<dept-tree
							v-model="addUpdateForm.deptIds"
							check-strictly
							expand-all
							show-checkbox
							@changeNode="handleChangeNode"/>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-form-item label="角色描述" prop="roleDesc">
						<el-input
								v-model="addUpdateForm.roleDesc"
								:maxlength="200"
								:rows="3"
								clearable
								placeholder="请输入角色描述"
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
import type {CheckedInfo} from 'element-plus/es/components/tree-v2/src/types'
import type {SysDeptResponse} from "@/api/system/dept/type";
import {getSysRoleById, saveSysRole, updateSysRole} from "@/api/system/role";
import {errorFormParams} from "@/utils/moudle/element";
import type {SysRoleOperationReq} from "@/api/system/role/type";
import {
	DictRoleStatus,
	SysRoleOperationForm,
	SysRoleOperationPageInit,
	SysRoleOperationRules
} from "@/api/system/role/constant";

defineOptions({name: 'SysRoleViewAddUpdate'})
const state = reactive<BasicOperationPageInit<SysRoleOperationReq>>({
	addUpdatePageInit: {
		...SysRoleOperationPageInit
	},
	addUpdateForm: {...SysRoleOperationForm}
})

const rules = reactive<FormRules>(SysRoleOperationRules)
const emit = defineEmits(['success'])
const addUpdateFormRef = ref<FormInstance>()
const {addUpdatePageInit, addUpdateForm} = toRefs<BasicOperationPageInit<SysRoleOperationReq>>(state)
const deptList = ref<SysDeptResponse[]>([])
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
	await getSysRoleById(id)
			.then((response) => {
				const {data} = JSON.parse(JSON.stringify(response))
				addUpdateForm.value = {...data}
				addUpdatePageInit.value.title = '修改系统角色表'
				addUpdatePageInit.value.submitTitle = '修改'
				deptList.value = data.depts
				addUpdateForm.value.deptIds = data.depts.map((item: any) => item.id)
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
			if (addUpdateForm.value.dataScope !== 2) {
				addUpdateForm.value.deptIds = []
			}
			if (addUpdatePageInit.value.operationStatus === 'save') {
				//增加
				await saveSysRole(addUpdateForm.value)
						.then((_) => {
							useMessage().success('新增系统角色表成功')
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
				await updateSysRole(addUpdateForm.value)
						.then((_) => {
							useMessage().success('修改系统角色表成功')
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
const handleChangeNode = (_data: SysDeptResponse, checkedInfo: CheckedInfo) => {
	addUpdateForm.value.deptIds = checkedInfo.checkedKeys.concat(
			checkedInfo.halfCheckedKeys
	) as string[]
	deptList.value = checkedInfo.checkedNodes.concat(checkedInfo.halfCheckedNodes) as SysDeptResponse[]
}
/**
 * 关闭
 */
const close = () => {
	addUpdateForm.value = {...SysRoleOperationForm}
	addUpdatePageInit.value = {
		...SysRoleOperationPageInit
	}
	addUpdateFormRef.value?.resetFields()
	deptList.value = []
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
