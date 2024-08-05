<template>
	<el-row :gutter="20">
		<el-col :span="12">
			<el-form-item label="地址" prop="profile.address">
				<area-cas-cader v-model="addUpdateForm.profile.address" clearable placeholder="请输入用户地址"/>
			</el-form-item>
		</el-col>
		<el-col :span="12">
			<el-form-item label="身份证号码" prop="profile.idCardNumber">
				<el-input
						v-model="addUpdateForm.profile.idCardNumber"
						clearable
						maxlength="18"
						minlength="16"
						placeholder="请输入身份证号码"
						show-word-limit/>
			</el-form-item>
		</el-col>
	</el-row>
	<el-row :gutter="20">
		<el-col :span="12">
			<el-form-item label="真实姓名" prop="profile.realName">
				<el-input v-model="addUpdateForm.profile.realName" clearable placeholder="请输入真实姓名"/>
			</el-form-item>
		</el-col>
		<el-col :span="12">
			<el-form-item label="性别" prop="profile.gender">
				<dict-select v-model="addUpdateForm.profile.gender" dict-code="sys_user_sex"/>
			</el-form-item>
		</el-col>
	</el-row>
	<el-row :gutter="20">
		<el-col :span="12">
			<el-form-item label="手机号码" prop="profile.phoneNumber">
				<el-input
						v-model="addUpdateForm.profile.phoneNumber"
						:maxlength="11"
						clearable
						placeholder="手机号码"
						show-word-limit/>
			</el-form-item>
		</el-col>
		<el-col :span="12">
			<el-form-item label="邮箱" prop="profile.email">
				<el-input v-model="addUpdateForm.profile.email" clearable placeholder="邮箱"/>
			</el-form-item>
		</el-col>
	</el-row>
	<el-row :gutter="20">
		<el-col :span="12">
			<el-form-item label="出生年月" prop="profile.birthday">
				<el-date-picker
						v-model="addUpdateForm.profile.birthday"
						:disabled-date="disabledBeforeDate"
						class="w100"
						clearable
						format="YYYY-MM-DD HH:mm:ss"
						placeholder="出生年月"
						type="datetime"
						value-format="YYYY-MM-DD HH:mm:ss"/>
			</el-form-item>
		</el-col>
		<el-col :span="12">
			<el-form-item label="详细地址" prop="profile.addressDetailed">
				<el-input
						v-model="addUpdateForm.profile.addressDetailed"
						:maxlength="150"
						clearable
						placeholder="详细地址"
						show-word-limit/>
			</el-form-item>
		</el-col>
	</el-row>
	<el-row :gutter="20">
		<el-col :span="24">
			<el-form-item label="个人描述" prop="profile.description">
				<el-input
						v-model="addUpdateForm.profile.description"
						:rows="5"
						clearable
						placeholder="个人描述" resize="none"
						type="textarea"/>
			</el-form-item>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core'
import {disabledBeforeDate} from "@/utils/moudle/element";
import {SysUserResponse} from "@/api/system/user/type";

defineOptions({name: 'UserBaseInfoView'})

interface AddUpdateForm {
	modelValue: SysUserResponse //用户扩展信息
}

const props = withDefaults(defineProps<AddUpdateForm>(), {})
const emits = defineEmits(['update:modelValue'])

const addUpdateForm = useVModel(props, 'modelValue', emits)
</script>

<style scoped></style>
