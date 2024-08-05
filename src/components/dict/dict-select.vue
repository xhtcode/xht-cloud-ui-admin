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
				v-for="item in dictInfo"
				:key="item.id"
				:disabled="item.dictStatus === '0'"
				:label="item.dictValue"
				:value="item.dictCode"/>
	</el-select>
</template>

<script lang="ts" setup>
import {useVModels} from '@vueuse/core'
import {useDictHooks} from "@/hooks/use-dict";
import type {SysDictItemResponse} from "@/api/system/dict/type";
import type {DictSelectPropsType, EmitsType} from "@/components/dict/types";

defineOptions({ name: 'DictSelectComponent'})

const props = withDefaults(
		defineProps<DictSelectPropsType>(),
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
const emits = defineEmits<EmitsType>()
const {modelValue, multiple, multipleLimit, maxCollapseTags, filterable} = useVModels(
		props,
		emits
)
const {dictInfo} = useDictHooks(props.dictCode);

const handleChange = (value: string | string[]) => {
	if (Array.isArray(value)) {
		emits(
				'change',
				dictInfo.value?.filter(
						(item: SysDictItemResponse) => value.indexOf(item.dictCode) !== -1
				)
		)
	} else {
		emits(
				'change',
				dictInfo.value?.filter((item: SysDictItemResponse) => item.dictCode === value)
		)
	}
}
</script>

<style lang="scss" scoped></style>
