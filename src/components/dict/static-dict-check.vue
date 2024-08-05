<template>
	<el-checkbox-group
			v-model="modelValue"
			:border="border"
			:disabled="disabled"
			:max="max"
			:min="min"
			:name="name"
			:size="size"
			validate-event
			@change="handleChange">
		<el-checkbox v-for="(item,index) in dictList" :key="index" :aria-label="item.label" :value="item.value">
			{{ item.label }}
		</el-checkbox>
	</el-checkbox-group>
</template>

<script lang="ts" setup>
import type {StaticDictCheckPropsType, StaticEmitsType} from "@/components/dict/types";
import {useVModels} from "@vueuse/core";
import type {CheckboxValueType} from "element-plus";

defineOptions({ name: 'StaticDictCheckComponent'})
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
