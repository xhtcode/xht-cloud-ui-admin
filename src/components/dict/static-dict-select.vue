<template>
	<el-select
			v-model="modelValue"
			:clearable="clearable"
			:disabled="disabled"
			:filterable="filterable"
			:max-collapse-tags="maxCollapseTags"
			:multiple="multiple"
			:multiple-limit="multipleLimit"
			:placeholder="placeholder"
			class="w100"
			collapse-tags
			@change="handleChange">
		<el-option
				v-for="(item,index) in dictList"
				:key="index"
				:disabled="item.disabled"
				:label="item.label"
				:value="item.value"/>
	</el-select>
</template>

<script lang="ts" setup>
import type {StaticDictSelectPropsType, StaticEmitsType} from "@/components/dict/types";
import {useVModels} from "@vueuse/core";

defineOptions({ name: 'StaticDictSelectComponent'})
const props = withDefaults(
		defineProps<StaticDictSelectPropsType>(),
		{
			multiple: false, // 是否多选
			placeholder: '请选择字典内容',// 提示内容
			disabled: false,// 是否禁用
			clearable: false, // 是否清空
			filterable: false, //是否可筛选
			multipleLimit: 0, // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
			maxCollapseTags: 10 // 	需要显示的 Tag 的最大数
		}
)
const emits = defineEmits<StaticEmitsType>()
const {modelValue, multiple, multipleLimit, maxCollapseTags, filterable} = useVModels(
		props,
		emits
)
const dictList = computed<StaticDictType[]>(() => props.dictList || [])
const handleChange = (value: string | string[]) => {
	if (Array.isArray(value)) {
		emits(
				'change',
				dictList.value?.filter(
						(item: StaticDictType) => value.indexOf(item.value) !== -1
				)
		)
	} else {
		emits(
				'change',
				dictList.value?.filter((item: StaticDictType) => item.value === value)
		)
	}
}
</script>

<style lang="scss" scoped></style>
