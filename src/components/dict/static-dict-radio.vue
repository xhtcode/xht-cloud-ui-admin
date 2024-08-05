<template>
	<el-radio-group
			v-model="modelValue"
			:border="border"
			:disabled="disabled"
			:name="name"
			:size="size"
			@change="handleChange">
		<el-radio v-for="(item,index) in dictList" :key="index" :label="item.label">
			{{ item.value }}
		</el-radio>
	</el-radio-group>
</template>

<script lang="ts" setup>
import type {StaticDictRadioPropsType, StaticEmitsType} from "@/components/dict/types";
import {useVModels} from "@vueuse/core";
import type {CheckboxValueType} from "element-plus";

defineOptions({ name: 'StaticDictRadioComponent'})
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
