<template>
	<el-checkbox-group
			v-model="modelValue"
			:border="border"
			:disabled="disabled"
			:name="name"
			:size="size"
			@change="handleChange">
		<el-checkbox-button v-for="(item,index) in dictList" :key="index" :label="item.label" :value="item.value">
			{{ item.label }}
		</el-checkbox-button>
	</el-checkbox-group>
</template>

<script lang="ts" setup>
import type {StaticDictCheckPropsType, StaticEmitsType} from "@/components/dict/types";
import {useVModels} from "@vueuse/core";
import type {CheckboxValueType} from "element-plus";

defineOptions({ name: 'StaticDictCheckButtonComponent'})
const props = withDefaults(
		defineProps<StaticDictCheckPropsType>(),
		{
			disabled: false, // 是否禁用
			border: false, //是否显示边框
		}
)
const emits = defineEmits<StaticEmitsType>()
const {modelValue} = useVModels(props, emits)
const dictList = computed<StaticDictType[]>(() => props.dictList || [])
const handleChange = (value: CheckboxValueType[]) => {
	emits(
			'change',
			dictList.value?.filter(
					(item: StaticDictType) => value.indexOf(item.value) !== -1
			)
	)
}
</script>

<style lang="scss" scoped></style>
