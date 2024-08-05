<template>
	<el-checkbox-group
			v-model="modelValue"
			:border="border"
			:disabled="disabled"
			:name="name"
			:size="size"
			@change="handleChange">
		<el-checkbox-button v-for="item in dictInfo" :key="item.id" :label="item.dictCode" :value="item.dictCode">
			{{ item.dictValue }}
		</el-checkbox-button>
	</el-checkbox-group>
</template>

<script lang="ts" setup>
import {useVModels} from '@vueuse/core'
import {CheckboxValueType} from 'element-plus'
import {useDictHooks} from "@/hooks/use-dict";
import type {SysDictItemResponse} from "@/api/system/dict/type";
import type {DictCheckPropsType, EmitsType} from "@/components/dict/types";

defineOptions({ name: 'DictCheckButtonComponent'})

const props = withDefaults(
		defineProps<DictCheckPropsType>(),
		{
			disabled: false, // 是否禁用
			border: false, //是否显示边框
		}
)
const emits = defineEmits<EmitsType>()
const {modelValue} = useVModels(props, emits)
const {dictInfo} = useDictHooks(props.dictCode);

const handleChange = (value: CheckboxValueType[]) => {
	emits(
			'change',
			dictInfo.value?.filter(
					(item: SysDictItemResponse) => value.indexOf(item.dictCode) !== -1
			)
	)
}
</script>

<style lang="scss" scoped></style>
