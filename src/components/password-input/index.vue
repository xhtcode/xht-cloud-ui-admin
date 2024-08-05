<template>
	<el-form-item :label="label" :label-width="labelWidth" :rules="rules">
		<el-input v-model="modelValue" :clearable="clearable" :placeholder="placeholder" :show-password="showPassword"
		          type="password"/>
		<div class="strength-meter-bar">
			<div :data-score="passwordStrength" class="strength-meter-bar--fill"></div>
		</div>
	</el-form-item>
</template>

<script lang="ts" setup>
import {zxcvbn} from '@zxcvbn-ts/core';
import {useVModel} from "@vueuse/core";
import {FormItemRule} from "element-plus";

defineOptions({ name: 'PassWordInputComponent'})

interface PropsType {
	modelValue: any
	label?: string
	labelWidth?: string
	placeholder?: string
	disabled?: boolean
	showPassword?: boolean
	clearable?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
	modelValue: '',
	placeholder: '请输入密码', // 输入框占位文本
	disabled: false, // 禁用
	showPassword: true, // 显示密码
	clearable: true, // 清空
})
const rules: FormItemRule[] = [{}]
const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
const passwordStrength = computed(() => {
	return zxcvbn(modelValue.value).score;
});
</script>

<style lang="scss" scoped>
.strength-meter-bar {
	position: relative;
	height: 6px;
	margin: 10px auto 6px;
	border-radius: 6px;
	background-color: rgb(0 0 0 / 25%);

	// 增加的伪元素样式代码
	&::before,
	&::after {
		content: '';
		display: block;
		position: absolute;
		z-index: 10;
		width: 20%;
		height: inherit;
		border-width: 0 5px;
		border-style: solid;
		border-color: #fff;
		background-color: transparent;
	}

	&::before {
		left: 20%;
	}

	&::after {
		right: 20%;
	}

	// 增加的伪元素样式代码

	&--fill {
		position: absolute;
		width: 0;
		height: inherit;
		transition: width 0.5s ease-in-out,
		background 0.25s;
		border-radius: inherit;
		background-color: transparent;

		&[data-score='0'] {
			width: 20%;
			background-color: darken(#e74242, 10%);
		}

		&[data-score='1'] {
			width: 40%;
			background-color: #e74242;
		}

		&[data-score='2'] {
			width: 60%;
			background-color: #efbd47;
		}

		&[data-score='3'] {
			width: 80%;
			background-color: #55d187;
		}

		&[data-score='4'] {
			width: 100%;
			background-color: #55d187;
		}
	}
}
</style>
