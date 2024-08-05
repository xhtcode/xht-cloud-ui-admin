<template>
	<el-radio-group
			v-model="modelValue"
			:border="border"
			:disabled="disabled"
			:name="name"
			:size="size"
			@change="handleChange">
		<el-radio-button v-for="(item,index) in dictList" :key="index" :value="item.value" :label="item.label"/>
	</el-radio-group>
</template>

<script lang="ts" setup>
import type {StaticDictRadioPropsType, StaticEmitsType} from "@/components/dict/types";
import {useVModels} from "@vueuse/core";

defineOptions({name: 'StaticDictRadioButtonComponent'})
const props = withDefaults(
		defineProps<StaticDictRadioPropsType>(),
		{
			disabled: false, // 是否禁用
			border: false, //是否显示边框
		}
)
const emits = defineEmits<StaticEmitsType>()
const {modelValue} = useVModels(props, emits)
const dictList = computed<StaticDictType[]>(() => props.dictList || [])
const handleChange = (value?: any) => {
	emits(
			'change',
			value
	)
}
</script>

<style lang="scss" scoped></style>
